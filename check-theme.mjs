import { readFileSync } from "fs";
import { buildThemeOutput } from "./build-theme.mjs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const versions = JSON.parse(readFileSync("versions.json", "utf8"));
const builtTheme = readFileSync("theme.css", "utf8");
const syncScript = readFileSync("sync-theme-to-vault.mjs", "utf8");
const sourceHeader = readFileSync("src/00-header.css", "utf8");
const styleSettingsSource = readFileSync("src/07-style-settings.css", "utf8");
const pluginsPrimarySource = readFileSync("src/05-plugins-primary.css", "utf8");
const pluginCompatSource = readFileSync("src/08-plugin-compat.css", "utf8");
const pluginCompatAudit = readFileSync("docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md", "utf8");
const knownLimitations = readFileSync("docs-code-ai/KNOWN-LIMITATIONS.md", "utf8");
const readme = readFileSync("README.md", "utf8");
const readmeCn = readFileSync("README_CN.md", "utf8");
const foundationSource = readFileSync("src/01-foundation.css", "utf8");
const codeSource = readFileSync("src/02-code.css", "utf8");
const animationsSource = readFileSync("src/09-animations.css", "utf8");
const previewReadme = readFileSync("preview/README.md", "utf8");
const presetPreview = readFileSync("preview/presets-showcase.md", "utf8");
const readingWidthPreview = readFileSync("preview/reading-width-showcase.md", "utf8");
const readingFontPreview = readFileSync("preview/reading-font-showcase.md", "utf8");
const numberedHeadingsPreview = readFileSync("preview/numbered-headings-showcase.md", "utf8");
const codeBlockPreview = readFileSync("preview/code-block-showcase.md", "utf8");
const nestedTagsPreview = readFileSync("preview/nested-tags-showcase.md", "utf8");
const graphViewPreview = readFileSync("preview/graph-view-showcase.md", "utf8");
const highlightPensPreview = readFileSync("preview/highlight-pens-showcase.md", "utf8");
const accentPaperPreview = readFileSync("preview/accent-paper-showcase.md", "utf8");
const activePathPreview = readFileSync("preview/active-path-showcase.md", "utf8");
const dashboardPreview = readFileSync("preview/dashboard-showcase.md", "utf8");
const taskPriorityPreview = readFileSync("preview/task-priority-showcase.md", "utf8");
const paperPanesPreview = readFileSync("preview/paper-panes-showcase.md", "utf8");
const typewriterPreview = readFileSync("preview/typewriter-focus-showcase.md", "utf8");
const bulletThreadingPreview = readFileSync("preview/bullet-threading-showcase.md", "utf8");
const cleanEmbedsPreview = readFileSync("preview/clean-embeds-showcase.md", "utf8");
const contentHelpersPreview = readFileSync("preview/content-helpers-showcase.md", "utf8");
const navigationPreview = readFileSync("preview/navigation-showcase.md", "utf8");
const imageHelpersPreview = readFileSync("preview/image-figure-gallery-showcase.md", "utf8");
const focusModePreview = readFileSync("preview/focus-mode-showcase.md", "utf8");
const publishPrintPreview = readFileSync("preview/publish-print-showcase.md", "utf8");
const qaRunPreview = readFileSync("preview/QA-RUN.md", "utf8");
const imagePreviewAssets = [
	readFileSync("preview/assets/figure-paper.svg", "utf8"),
	readFileSync("preview/assets/gallery-research.svg", "utf8"),
	readFileSync("preview/assets/gallery-ink.svg", "utf8"),
];

const failures = [];

const extractStyleSettingsBlock = (source) => {
	const match = source.match(/\/\*\s*@settings\n([\s\S]*?)\n\s*\*\//);
	return match?.[1] ?? null;
};

const validateStyleSettings = (source) => {
	const settingsFailures = [];
	const block = extractStyleSettingsBlock(source);

	if (!block) {
		return ["src/07-style-settings.css is missing an @settings block."];
	}

	if (block.includes("\t")) {
		settingsFailures.push("src/07-style-settings.css @settings block contains tab indentation; YAML requires spaces.");
	}

	const lines = block.split("\n");
	const requiredTopLevelKeys = ["name:", "id:", "settings:"];
	for (const key of requiredTopLevelKeys) {
		if (!lines.some((line) => line.trim().startsWith(key))) {
			settingsFailures.push(`src/07-style-settings.css @settings block is missing top-level ${key}`);
		}
	}

	const ids = new Map();
	let currentItem = null;
	const items = [];

	for (let index = 0; index < lines.length; index += 1) {
		const lineNumber = index + 6; // file line number inside src/07-style-settings.css
		const line = lines[index];
		const trimmed = line.trim();

		if (/^ {4}-\s*$/.test(line)) {
			currentItem = { lineNumber, fields: new Set(), id: null, type: null };
			items.push(currentItem);
			continue;
		}

		if (!currentItem) {
			continue;
		}

		const fieldMatch = trimmed.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
		if (!fieldMatch) {
			continue;
		}

		const [, field, value] = fieldMatch;
		currentItem.fields.add(field);

		if (field === "id") {
			currentItem.id = value;
			if (ids.has(value)) {
				settingsFailures.push(`src/07-style-settings.css duplicate Style Settings id '${value}' at lines ${ids.get(value)} and ${lineNumber}.`);
			} else {
				ids.set(value, lineNumber);
			}
		}

		if (field === "type") {
			currentItem.type = value;
		}

		if (field === "default" && /^['"]?#['"]?$/.test(value.trim())) {
			settingsFailures.push(`src/07-style-settings.css invalid color default ${value.trim()} at line ${lineNumber}. Use a valid CSS color.`);
		}
	}

	for (const item of items) {
		if (!item.fields.has("id")) {
			settingsFailures.push(`src/07-style-settings.css settings item at line ${item.lineNumber} is missing id.`);
		}
		if (!item.fields.has("type")) {
			settingsFailures.push(`src/07-style-settings.css settings item '${item.id ?? "<unknown>"}' at line ${item.lineNumber} is missing type.`);
		}
	}

	return settingsFailures;
};

const extractPluginCompatBlock = (source) => {
	const match = source.match(/\/\*\s*@plugins\n([\s\S]*?)\n\s*\*\//);
	return match?.[1] ?? null;
};

const parsePluginCompatIds = (source) => {
	const block = extractPluginCompatBlock(source);
	const sections = { core: new Set(), community: new Set() };

	if (!block) {
		return { sections, failures: ["src/08-plugin-compat.css is missing an @plugins block."] };
	}

	let section = null;
	for (const rawLine of block.split("\n")) {
		const line = rawLine.trim();
		if (line === "core:" || line === "community:") {
			section = line.slice(0, -1);
			continue;
		}

		const id = line.match(/^-\s+(.+)$/)?.[1]?.trim();
		if (id && section) {
			sections[section].add(id);
		}
	}

	return { sections, failures: [] };
};

const validatePluginCompatibility = (source, audit) => {
	const compatFailures = [];
	const { sections, failures: parseFailures } = parsePluginCompatIds(source);
	compatFailures.push(...parseFailures);

	const requiredCoreIds = [
		"backlink",
		"bases",
		"bookmarks",
		"canvas",
		"command-palette",
		"file-explorer",
		"global-search",
		"outline",
		"switcher",
	];

	const requiredCommunityIds = [
		"dataview",
		"calendar",
		"obsidian-full-calendar",
		"obsidian-tasks-plugin",
		"todoist-sync-plugin",
		"obsidian-excalidraw-plugin",
		"obsidian-hover-editor",
		"obsidian-banners",
		"obsidian-checklist-plugin",
		"obsidian-kanban",
		"obsidian-outliner",
		"obsidian-timeline",
		"obsidian-git",
		"obsidian-style-settings",
	];

	for (const id of requiredCoreIds) {
		if (!sections.core.has(id)) {
			compatFailures.push(`src/08-plugin-compat.css @plugins core list is missing '${id}'.`);
		}
	}

	for (const id of requiredCommunityIds) {
		if (!sections.community.has(id)) {
			compatFailures.push(`src/08-plugin-compat.css @plugins community list is missing '${id}'.`);
		}
		if (!audit.includes(id)) {
			compatFailures.push(`docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md is missing required plugin id '${id}'.`);
		}
	}

	for (const forbiddenId of ["db-folder", "obsidian-db-folder"]) {
		if (sections.community.has(forbiddenId)) {
			compatFailures.push(`src/08-plugin-compat.css should not list legacy DB Folder id '${forbiddenId}' until an official id is verified.`);
		}
	}

	const requiredAuditTerms = [
		"Fragile selector registry",
		".view-action:nth-last-of-type(2)",
		".bases-*",
		".canvas-*",
		".metadata-*",
		".db-table-view",
		"Legacy selector-only",
	];

	for (const term of requiredAuditTerms) {
		if (!audit.includes(term)) {
			compatFailures.push(`docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md is missing required audit term '${term}'.`);
		}
	}

	return compatFailures;
};

const validateKnownLimitations = (limitations, audit, readmeSource, readmeCnSource) => {
	const limitationFailures = [];

	const requiredTerms = [
		"Mobile FAB",
		".view-action:nth-last-of-type(2)",
		"DB Folder",
		".db-table-view",
		"Tier B selector-level",
		"Unsupported / not claimed plugin list",
		"sliding-panes-obsidian",
		"obsidian-codemirror-options",
		"obsidian-hider",
		"mysnippets-plugin",
		"cmenu-plugin",
		"readwise-official",
		"tag-wrangler",
		"templater-obsidian",
		"obsidian-system-dark-mode",
		"Release-note summary",
		"PLUGIN-COMPATIBILITY-AUDIT.md",
	];

	for (const term of requiredTerms) {
		if (!limitations.includes(term)) {
			limitationFailures.push(`docs-code-ai/KNOWN-LIMITATIONS.md is missing required limitation term '${term}'.`);
		}
	}

	if (!audit.includes("KNOWN-LIMITATIONS.md")) {
		limitationFailures.push("docs-code-ai/PLUGIN-COMPATIBILITY-AUDIT.md must link to docs-code-ai/KNOWN-LIMITATIONS.md.");
	}

	for (const [name, source] of [
		["README.md", readmeSource],
		["README_CN.md", readmeCnSource],
	]) {
		if (!source.includes("docs-code-ai/KNOWN-LIMITATIONS.md")) {
			limitationFailures.push(`${name} must link to docs-code-ai/KNOWN-LIMITATIONS.md.`);
		}
	}

	return limitationFailures;
};

const validateStylePacks = (foundation, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const stylePackFailures = [];

	const requiredPacks = [
		"preset-classic-paper",
		"preset-things-warm",
		"preset-research-desk",
		"preset-longform-book",
		"preset-night-ink",
		"preset-low-contrast-calm",
	];

	for (const pack of requiredPacks) {
		if (!foundation.includes(`body.${pack}`)) {
			stylePackFailures.push(`src/01-foundation.css is missing style pack class body.${pack}.`);
		}
		if (!foundation.includes(`body.theme-dark.${pack}`)) {
			stylePackFailures.push(`src/01-foundation.css is missing dark-mode override for ${pack}.`);
		}
		if (!styleSettings.includes(`id: ${pack}`)) {
			stylePackFailures.push(`src/07-style-settings.css Style Settings is missing '${pack}'.`);
		}
	}

	const requiredDocTerms = [
		"Classic Paper",
		"Things Warm",
		"Research Desk",
		"Longform Book",
		"Night Ink",
		"Low Contrast Calm",
		"preview/presets-showcase.md",
	];

	for (const term of requiredDocTerms) {
		if (!readmeSource.includes(term)) {
			stylePackFailures.push(`README.md is missing style pack term '${term}'.`);
		}
		if (!readmeCnSource.includes(term)) {
			stylePackFailures.push(`README_CN.md is missing style pack term '${term}'.`);
		}
	}

	for (const term of ["presets-showcase.md", "M6 style packs"]) {
		if (!previewIndex.includes(term)) {
			stylePackFailures.push(`preview/README.md is missing '${term}'.`);
		}
	}

	for (const term of ["Style Pack Showcase", "Accent presets can still override", "Low Contrast Calm style pack"]) {
		if (!previewFixture.includes(term)) {
			stylePackFailures.push(`preview/presets-showcase.md is missing '${term}'.`);
		}
	}

	return stylePackFailures;
};

const validateContentHelpers = (foundation, pluginsPrimary, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const helperFailures = [];

	const helperClasses = [
		"cards",
		"cards-cover",
		"cards-compact",
		"table-wide",
		"table-small",
		"table-clean",
	];

	for (const helper of helperClasses) {
		const source = helper.startsWith("table-") ? foundation : pluginsPrimary;
		if (!source.includes(`.${helper}`)) {
			helperFailures.push(`M6 content helper '.${helper}' is missing from ${helper.startsWith("table-") ? "src/01-foundation.css" : "src/05-plugins-primary.css"}.`);
		}
		for (const [name, doc] of [
			["README.md", readmeSource],
			["README_CN.md", readmeCnSource],
			["preview/content-helpers-showcase.md", previewFixture],
		]) {
			if (!doc.includes(helper)) {
				helperFailures.push(`${name} is missing M6 content helper '${helper}'.`);
			}
		}
	}

	const requiredPreviewTerms = [
		"content-helpers-showcase.md",
		"Dataview table/list helper classes",
	];

	for (const term of requiredPreviewTerms) {
		if (!previewIndex.includes(term)) {
			helperFailures.push(`preview/README.md is missing '${term}'.`);
		}
	}

	for (const term of ["Dataview card grid", "Wide small clean table", "Pairing guide"]) {
		if (!previewFixture.includes(term)) {
			helperFailures.push(`preview/content-helpers-showcase.md is missing '${term}'.`);
		}
	}

	return helperFailures;
};

const validateNavigationEnhancements = (foundation, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const navigationFailures = [];

	const requiredCssTerms = [
		"--ouroboros-nav-rail",
		"--ouroboros-nav-current-bg",
		".nav-folder-children",
		".nav-folder:has(.nav-file.is-active",
		".tree-item:has(.tree-item-self.is-active)",
	];

	for (const term of requiredCssTerms) {
		if (!foundation.includes(term)) {
			navigationFailures.push(`src/01-foundation.css is missing navigation enhancement term '${term}'.`);
		}
	}

	for (const [name, doc] of [
		["README.md", readmeSource],
		["README_CN.md", readmeCnSource],
		["preview/README.md", previewIndex],
	]) {
		if (!doc.includes("navigation-showcase.md")) {
			navigationFailures.push(`${name} is missing navigation term 'navigation-showcase.md'.`);
		}
		if (!doc.includes("current-path") && !doc.includes("当前路径")) {
			navigationFailures.push(`${name} is missing navigation term 'current-path/当前路径'.`);
		}
	}

	for (const term of ["Navigation Showcase", "rainbow folders", "Parent folders containing the active note"]) {
		if (!previewFixture.includes(term)) {
			navigationFailures.push(`preview/navigation-showcase.md is missing '${term}'.`);
		}
	}

	return navigationFailures;
};

const validateImageHelpers = (foundation, readmeSource, readmeCnSource, previewIndex, previewFixture, previewAssets) => {
	const imageFailures = [];

	const helperClasses = [
		"img-grid",
		"img-wide",
		"img-frame",
		"figure-note",
	];

	for (const helper of helperClasses) {
		if (!foundation.includes(`.${helper}`)) {
			imageFailures.push(`src/01-foundation.css is missing image helper '.${helper}'.`);
		}
		for (const [name, doc] of [
			["README.md", readmeSource],
			["README_CN.md", readmeCnSource],
			["preview/image-figure-gallery-showcase.md", previewFixture],
		]) {
			if (!doc.includes(helper)) {
				imageFailures.push(`${name} is missing image helper '${helper}'.`);
			}
		}
	}

	for (const [name, doc] of [
		["README.md", readmeSource],
		["README_CN.md", readmeCnSource],
		["preview/README.md", previewIndex],
	]) {
		if (!doc.includes("image-figure-gallery-showcase.md")) {
			imageFailures.push(`${name} is missing image preview fixture 'image-figure-gallery-showcase.md'.`);
		}
	}

	for (const term of ["Image / Figure / Gallery Showcase", "Wide image pass", "HTML figure fallback"]) {
		if (!previewFixture.includes(term)) {
			imageFailures.push(`preview/image-figure-gallery-showcase.md is missing '${term}'.`);
		}
	}

	for (const [index, asset] of previewAssets.entries()) {
		if (!asset.includes("<svg") || !asset.includes("role=\"img\"")) {
			imageFailures.push(`preview/assets image fixture ${index + 1} must be an accessible SVG preview asset.`);
		}
	}

	return imageFailures;
};

const validateFocusKeyboardMode = (foundation, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const focusFailures = [];

	const requiredCssTerms = [
		"body.keyboard-mode",
		"body.keyboard-mode:not(.focus-mode)::after",
		"body.keyboard-mode .prompt::before",
		"body.focus-mode::before",
		"body.focus-mode.keyboard-mode .prompt::before",
		"body.focus-mode:has(.prompt, .modal-container)",
	];

	for (const term of requiredCssTerms) {
		if (!foundation.includes(term)) {
			focusFailures.push(`src/01-foundation.css is missing Focus/Keyboard term '${term}'.`);
		}
	}

	if (!styleSettings.includes("id: keyboard-mode")) {
		focusFailures.push("src/07-style-settings.css is missing Style Settings toggle id 'keyboard-mode'.");
	}

	for (const [name, doc] of [
		["README.md", readmeSource],
		["README_CN.md", readmeCnSource],
		["preview/README.md", previewIndex],
		["preview/focus-mode-showcase.md", previewFixture],
	]) {
		for (const term of ["Keyboard mode", "command/switcher"]) {
			if (!doc.includes(term)) {
				focusFailures.push(`${name} is missing Focus/Keyboard term '${term}'.`);
			}
		}
	}

	for (const term of ["Keyboard mode pass", "Focus + Keyboard mode", "Enter marker"]) {
		if (!previewFixture.includes(term)) {
			focusFailures.push(`preview/focus-mode-showcase.md is missing '${term}'.`);
		}
	}

	return focusFailures;
};

const validatePublishPrintSupport = (foundation, readmeSource, readmeCnSource, previewIndex, previewChecklist, previewFixture) => {
	const publishFailures = [];

	const requiredCssTerms = [
		".published-container",
		".site-body-center-column",
		"@page",
		"@media print",
		"a[href^='http']::after",
		"table-header-group",
		".no-print",
		"section.footnotes",
	];

	for (const term of requiredCssTerms) {
		if (!foundation.includes(term)) {
			publishFailures.push(`src/01-foundation.css is missing Publish/Print term '${term}'.`);
		}
	}

	for (const [name, doc] of [
		["README.md", readmeSource],
		["README_CN.md", readmeCnSource],
		["preview/README.md", previewIndex],
		["preview/CHECKLIST.md", previewChecklist],
		["preview/publish-print-showcase.md", previewFixture],
	]) {
		for (const term of ["Publish", "Print", "PDF"]) {
			if (!doc.includes(term)) {
				publishFailures.push(`${name} is missing Publish/Print term '${term}'.`);
			}
		}
	}

	for (const term of ["External link", "Evidence table", "Code block", "Footnotes"]) {
		if (!previewFixture.includes(term)) {
			publishFailures.push(`preview/publish-print-showcase.md is missing '${term}'.`);
		}
	}

	return publishFailures;
};

const validateReleaseCandidateQa = (previewIndex, previewChecklist, qaRun) => {
	const qaFailures = [];

	for (const [name, doc] of [
		["preview/README.md", previewIndex],
		["preview/CHECKLIST.md", previewChecklist],
	]) {
		if (!doc.includes("QA-RUN.md")) {
			qaFailures.push(`${name} must reference preview/QA-RUN.md as the M7 release-candidate run record.`);
		}
	}

	const requiredTerms = [
		"Release Candidate QA Run",
		"M7",
		"Dev01",
		".obsidian/themes/Ouroboros",
		"Theme Preview/Ouroboros/preview",
		"npm run build",
		"npm run check",
		"node --check check-theme.mjs",
		"sync-theme-to-vault.mjs",
		"Manual QA matrix",
		"Broad vault deployment",
		"Deferred",
	];

	for (const term of requiredTerms) {
		if (!qaRun.includes(term)) {
			qaFailures.push(`preview/QA-RUN.md is missing release-candidate QA term '${term}'.`);
		}
	}

	return qaFailures;
};

const validateSyncScript = (script) => {
	const syncFailures = [];

	const requiredTerms = [
		"readdirSync",
		"renameSync",
		"hasExactThemeEntry",
		"normalizeLowercaseThemeDir",
		".ouroboros-casefix-",
		"cleanLowercase && !normalizedLowercaseThemeDir",
		"Theme Preview",
		"Ouroboros",
	];

	for (const term of requiredTerms) {
		if (!script.includes(term)) {
			syncFailures.push(`sync-theme-to-vault.mjs is missing sync safety term '${term}'.`);
		}
	}

	return syncFailures;
};

const validateReadingWidth = (header, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const widthFailures = [];

	// Guard the M9-1 fix: --line-width must stay bound to Obsidian's native
	// readable-line-length variable, otherwise the tier/modes/packs become no-ops again.
	if (!header.includes("--file-line-width: var(--line-width)")) {
		widthFailures.push("src/00-header.css must bind --file-line-width to var(--line-width) so reading width actually applies.");
	}
	if (!header.includes("var(--line-width-custom, var(--line-width-tier")) {
		widthFailures.push("src/00-header.css must resolve --line-width as custom → tier → base default.");
	}

	for (const id of ["line-width-tier", "line-width-custom"]) {
		if (!styleSettings.includes(`id: ${id}`)) {
			widthFailures.push(`src/07-style-settings.css Style Settings is missing reading-width control '${id}'.`);
		}
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("reading-width-showcase.md")) {
			widthFailures.push(`${name} is missing reading width reference 'reading-width-showcase.md'.`);
		}
	}

	if (!previewIndex.includes("reading-width-showcase.md")) {
		widthFailures.push("preview/README.md is missing 'reading-width-showcase.md'.");
	}

	for (const term of ["Reading Width Showcase", "--file-line-width", "Reading column width (advanced)"]) {
		if (!previewFixture.includes(term)) {
			widthFailures.push(`preview/reading-width-showcase.md is missing '${term}'.`);
		}
	}

	return widthFailures;
};

const validateNumberedHeadings = (foundation, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const numberingFailures = [];

	if (!foundation.includes("body.numbered-headings .markdown-rendered h2::before")) {
		numberingFailures.push("src/01-foundation.css is missing Reading View numbered-headings counters (h2::before).");
	}
	if (!foundation.includes("body.numbered-headings .markdown-source-view.mod-cm6 .cm-line.HyperMD-header-2::before")) {
		numberingFailures.push("src/01-foundation.css is missing Live Preview numbered-headings counters (HyperMD-header-2::before).");
	}
	if (!foundation.includes("body.numbered-headings .markdown-rendered :is(.callout, blockquote)")) {
		numberingFailures.push("src/01-foundation.css must exclude callout/blockquote headings from numbering so the counter stays accurate.");
	}
	if (!styleSettings.includes("id: numbered-headings")) {
		numberingFailures.push("src/07-style-settings.css Style Settings is missing 'numbered-headings'.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("numbered-headings-showcase.md")) {
			numberingFailures.push(`${name} is missing numbered-headings reference 'numbered-headings-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("numbered-headings-showcase.md")) {
		numberingFailures.push("preview/README.md is missing 'numbered-headings-showcase.md'.");
	}
	for (const term of ["Numbered Headings Showcase", "Callout heading check"]) {
		if (!previewFixture.includes(term)) {
			numberingFailures.push(`preview/numbered-headings-showcase.md is missing '${term}'.`);
		}
	}

	return numberingFailures;
};

const validateCodeBlocks = (codeSource, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const codeFailures = [];

	if (codeSource.includes("content: attr(class)")) {
		codeFailures.push("src/02-code.css still uses content: attr(class) for the language label; use the curated badge instead.");
	}
	if (!codeSource.includes("body.code-language-label .markdown-preview-view pre[class*='language-'] > code::before")) {
		codeFailures.push("src/02-code.css is missing the M9-3 curated language badge (code-language-label).");
	}
	if (!codeSource.includes(".markdown-preview-view .copy-code-button:hover")) {
		codeFailures.push("src/02-code.css is missing a default copy-code-button hover state.");
	}
	if (!codeSource.includes("border-left: 2px solid rgba(var(--color-green-rgb)")) {
		codeFailures.push("src/02-code.css is missing the M9-3 stronger diff accent rail.");
	}
	if (!styleSettings.includes("id: code-language-label")) {
		codeFailures.push("src/07-style-settings.css Style Settings is missing 'code-language-label'.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("code-block-showcase.md")) {
			codeFailures.push(`${name} is missing code block reference 'code-block-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("code-block-showcase.md")) {
		codeFailures.push("preview/README.md is missing 'code-block-showcase.md'.");
	}
	for (const term of ["Code Block Showcase", "Unmapped language"]) {
		if (!previewFixture.includes(term)) {
			codeFailures.push(`preview/code-block-showcase.md is missing '${term}'.`);
		}
	}

	return codeFailures;
};

const validateNestedTags = (foundation, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const tagFailures = [];

	if (!foundation.includes("a.tag[href*='/']")) {
		tagFailures.push("src/01-foundation.css is missing the M9-4 nested-tag cue (a.tag[href*='/']).");
	}
	if (!foundation.includes(".workspace-leaf-content[data-type='tag'] .tree-item-children")) {
		tagFailures.push("src/01-foundation.css is missing the M9-4 tag-pane nesting guide rail.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("nested-tags-showcase.md")) {
			tagFailures.push(`${name} is missing nested-tags reference 'nested-tags-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("nested-tags-showcase.md")) {
		tagFailures.push("preview/README.md is missing 'nested-tags-showcase.md'.");
	}
	for (const term of ["Nested Tags Showcase", "project/ouroboros"]) {
		if (!previewFixture.includes(term)) {
			tagFailures.push(`preview/nested-tags-showcase.md is missing '${term}'.`);
		}
	}

	return tagFailures;
};

const validateGraphView = (foundation, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const graphFailures = [];

	if (!foundation.includes(".graph-view.color-circle")) {
		graphFailures.push("src/01-foundation.css is missing the M9-5 current-note ring hook (.graph-view.color-circle).");
	}
	if (!foundation.includes("color: var(--interactive-accent-hover);")) {
		graphFailures.push("src/01-foundation.css is missing the M9-5 brighter focused graph node (color-fill-focused).");
	}
	if (!foundation.includes("warm paper wash")) {
		graphFailures.push("src/01-foundation.css is missing the M9-5 warm paper graph background.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("graph-view-showcase.md")) {
			graphFailures.push(`${name} is missing graph view reference 'graph-view-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("graph-view-showcase.md")) {
		graphFailures.push("preview/README.md is missing 'graph-view-showcase.md'.");
	}
	for (const term of ["Graph View Showcase", "current-note ring"]) {
		if (!previewFixture.includes(term)) {
			graphFailures.push(`preview/graph-view-showcase.md is missing '${term}'.`);
		}
	}

	return graphFailures;
};

const validateMotionAudit = (animations) => {
	const motionFailures = [];

	// M9-6: the empty-state must not run a forever-repainting animation.
	if (/\.search-empty-state\s*,\s*\.is-loading[^{]*\{[^}]*infinite/m.test(animations)) {
		motionFailures.push("src/09-animations.css runs an infinite pulse on the always-visible .search-empty-state; scope infinite animations to transient loading states only.");
	}
	// Reduce-motion must neutralize smooth scrolling and infinite iterations.
	if (!animations.includes("scroll-behavior: auto !important;")) {
		motionFailures.push("src/09-animations.css reduce-motion handling is missing scroll-behavior: auto.");
	}
	for (const guard of ["@media (prefers-reduced-motion: reduce)", "body.reduce-motion *"]) {
		if (!animations.includes(guard)) {
			motionFailures.push(`src/09-animations.css is missing reduce-motion guard '${guard}'.`);
		}
	}

	return motionFailures;
};

const validateHighlightPens = (foundation, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const penFailures = [];

	if (!foundation.includes("mark:is(.red, .orange, .yellow, .green, .cyan, .blue, .purple, .pink)")) {
		penFailures.push("src/01-foundation.css is missing the N1 multi-color highlight pen palette.");
	}
	if (!foundation.includes("--ouro-hl-rgb")) {
		penFailures.push("src/01-foundation.css is missing the N1 --ouro-hl-rgb highlight carrier.");
	}
	if (!foundation.includes(".theme-dark .markdown-rendered mark:is(.red")) {
		penFailures.push("src/01-foundation.css is missing the N1 dark-mode highlight pen tint.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("highlight-pens-showcase.md")) {
			penFailures.push(`${name} is missing highlight pen reference 'highlight-pens-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("highlight-pens-showcase.md")) {
		penFailures.push("preview/README.md is missing 'highlight-pens-showcase.md'.");
	}
	for (const term of ["Highlight Pens Showcase", "class=\"green\""]) {
		if (!previewFixture.includes(term)) {
			penFailures.push(`preview/highlight-pens-showcase.md is missing '${term}'.`);
		}
	}

	return penFailures;
};

const validateAccentPaper = (header, foundation, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const apFailures = [];

	for (const token of ["--accent-ink-blue:", "--accent-clay:", "--accent-slate:"]) {
		if (!header.includes(token)) {
			apFailures.push(`src/00-header.css is missing the N2 accent token '${token}'.`);
		}
	}
	for (const cls of ["body.accent-ink-blue", "body.accent-clay", "body.accent-slate", "body.paper-warm", "body.theme-dark.paper-warm", "body.paper-cool", "body.theme-dark.paper-cool"]) {
		if (!foundation.includes(cls)) {
			apFailures.push(`src/01-foundation.css is missing the N2 class '${cls}'.`);
		}
	}
	for (const id of ["accent-ink-blue", "accent-clay", "accent-slate", "paper-warm", "paper-cool"]) {
		if (!styleSettings.includes(`id: ${id}`)) {
			apFailures.push(`src/07-style-settings.css Style Settings is missing '${id}'.`);
		}
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("accent-paper-showcase.md")) {
			apFailures.push(`${name} is missing accent/paper reference 'accent-paper-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("accent-paper-showcase.md")) {
		apFailures.push("preview/README.md is missing 'accent-paper-showcase.md'.");
	}
	for (const term of ["Accent & Paper Temperature Showcase", "Paper temperature"]) {
		if (!previewFixture.includes(term)) {
			apFailures.push(`preview/accent-paper-showcase.md is missing '${term}'.`);
		}
	}

	return apFailures;
};

const validateDashboard = (pluginsPrimary, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const dashFailures = [];

	// N4: daily/periodic dashboard helper. Guard the panel rule and the widget header.
	if (!pluginsPrimary.includes(".markdown-preview-view.dashboard h2")) {
		dashFailures.push("src/05-plugins-primary.css is missing the N4 dashboard widget header (.markdown-preview-view.dashboard h2).");
	}
	if (!pluginsPrimary.includes(".markdown-preview-view.dashboard :is(")) {
		dashFailures.push("src/05-plugins-primary.css is missing the N4 dashboard block panels.");
	}
	if (!pluginsPrimary.includes(".markdown-preview-view.dashboard.cards :is(")) {
		dashFailures.push("src/05-plugins-primary.css is missing the N4 dashboard+cards composition rule.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("dashboard-showcase.md")) {
			dashFailures.push(`${name} is missing dashboard reference 'dashboard-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("dashboard-showcase.md")) {
		dashFailures.push("preview/README.md is missing 'dashboard-showcase.md'.");
	}
	for (const term of ["Dashboard Showcase", "cssclasses: [dashboard]"]) {
		if (!previewFixture.includes(term)) {
			dashFailures.push(`preview/dashboard-showcase.md is missing '${term}'.`);
		}
	}

	return dashFailures;
};

const validateActivePath = (foundation, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const pathFailures = [];

	// N3: current-path / breadcrumb / active-note emphasis. Guard the three
	// real surfaces (breadcrumb, active tab, active pane title) plus the toggle.
	if (!foundation.includes("body.active-path-emphasis .view-header-breadcrumb")) {
		pathFailures.push("src/01-foundation.css is missing the N3 breadcrumb path emphasis (.view-header-breadcrumb).");
	}
	if (!foundation.includes("body.active-path-emphasis .workspace-tab-header.is-active")) {
		pathFailures.push("src/01-foundation.css is missing the N3 active-tab emphasis (.workspace-tab-header.is-active).");
	}
	if (!foundation.includes("body.active-path-emphasis .workspace-leaf.mod-active .view-header-title")) {
		pathFailures.push("src/01-foundation.css is missing the N3 active-pane title cue (.workspace-leaf.mod-active .view-header-title).");
	}
	if (!styleSettings.includes("id: active-path-emphasis")) {
		pathFailures.push("src/07-style-settings.css Style Settings is missing 'active-path-emphasis'.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("active-path-showcase.md")) {
			pathFailures.push(`${name} is missing active-path reference 'active-path-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("active-path-showcase.md")) {
		pathFailures.push("preview/README.md is missing 'active-path-showcase.md'.");
	}
	for (const term of ["Active Path Showcase", "no native breadcrumb"]) {
		if (!previewFixture.includes(term)) {
			pathFailures.push(`preview/active-path-showcase.md is missing '${term}'.`);
		}
	}

	return pathFailures;
};

const validateTaskPriorityPalette = (pluginsPrimary, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const priorityFailures = [];

	// N5: task priority palette. Guard the warm-to-cool ramp (highest reuses
	// progress-color-1, lowest reuses progress-color-5), the opt-in toggle, and
	// the warm due chip. The DOM-honesty note keeps the date-proximity boundary
	// documented (no JS-less overdue/today computation).
	if (!pluginsPrimary.includes("body.task-priority-palette .task-list-item[data-task-priority='highest']")) {
		priorityFailures.push("src/05-plugins-primary.css is missing the N5 highest-priority rule (data-task-priority='highest').");
	}
	if (!pluginsPrimary.includes("body.task-priority-palette .task-list-item[data-task-priority='lowest']")) {
		priorityFailures.push("src/05-plugins-primary.css is missing the N5 lowest-priority rule (data-task-priority='lowest').");
	}
	if (!pluginsPrimary.includes("var(--progress-color-1)") || !pluginsPrimary.includes("var(--progress-color-5)")) {
		priorityFailures.push("src/05-plugins-primary.css N5 palette must reuse the progress 5-color ramp (--progress-color-1 … --progress-color-5).");
	}
	if (!pluginsPrimary.includes("body.task-priority-palette .tasks-layout .tasks-due")) {
		priorityFailures.push("src/05-plugins-primary.css is missing the N5 warm due chip (.tasks-layout .tasks-due).");
	}
	if (!styleSettings.includes("id: task-priority-palette")) {
		priorityFailures.push("src/07-style-settings.css Style Settings is missing 'task-priority-palette'.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("task-priority-showcase.md")) {
			priorityFailures.push(`${name} is missing task-priority reference 'task-priority-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("task-priority-showcase.md")) {
		priorityFailures.push("preview/README.md is missing 'task-priority-showcase.md'.");
	}
	for (const term of ["Task Priority Showcase", "data-task-priority"]) {
		if (!previewFixture.includes(term)) {
			priorityFailures.push(`preview/task-priority-showcase.md is missing '${term}'.`);
		}
	}

	return priorityFailures;
};

const validatePaperPanes = (foundation, header, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const paneFailures = [];

	// N6: paper panes. Guard the raised-sheet rule (scoped to .mod-root), the
	// active-pane lift via the new --shadow-raised token, the token itself, and
	// the opt-in toggle. overflow:hidden keeps the box model intact.
	if (!foundation.includes("body.paper-panes .mod-root .workspace-tabs")) {
		paneFailures.push("src/01-foundation.css is missing the N6 paper-panes sheet rule (.mod-root .workspace-tabs).");
	}
	if (!foundation.includes("body.paper-panes .mod-root .workspace-tabs:has(.workspace-leaf.mod-active)")) {
		paneFailures.push("src/01-foundation.css is missing the N6 active-pane lift (:has(.workspace-leaf.mod-active)).");
	}
	if (!foundation.includes("var(--shadow-raised)")) {
		paneFailures.push("src/01-foundation.css N6 active pane must use the --shadow-raised token.");
	}
	if (!header.includes("--shadow-raised:")) {
		paneFailures.push("src/00-header.css is missing the --shadow-raised component token used by N6.");
	}
	if (!styleSettings.includes("id: paper-panes")) {
		paneFailures.push("src/07-style-settings.css Style Settings is missing 'paper-panes'.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("paper-panes-showcase.md")) {
			paneFailures.push(`${name} is missing paper-panes reference 'paper-panes-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("paper-panes-showcase.md")) {
		paneFailures.push("preview/README.md is missing 'paper-panes-showcase.md'.");
	}
	for (const term of ["Paper Panes Showcase", "workspace-tabs"]) {
		if (!previewFixture.includes(term)) {
			paneFailures.push(`preview/paper-panes-showcase.md is missing '${term}'.`);
		}
	}

	return paneFailures;
};

const validateTypewriterFocus = (foundation, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const twFailures = [];

	// N7: typewriter focus, a Focus-mode sub-toggle. Guard the dim/active-line
	// emphasis (focus-gated, Live Preview only), the centered composition room,
	// and the toggle. DOM-honest: no scroll-lock claim.
	if (!foundation.includes("body.focus-mode.typewriter-focus .markdown-source-view.mod-cm6 .cm-editor.cm-focused .cm-line")) {
		twFailures.push("src/01-foundation.css is missing the N7 typewriter dim rule (focus-mode.typewriter-focus .cm-focused .cm-line).");
	}
	if (!foundation.includes("body.focus-mode.typewriter-focus .markdown-source-view.mod-cm6 .cm-editor.cm-focused .cm-line.cm-active")) {
		twFailures.push("src/01-foundation.css is missing the N7 active-line emphasis (.cm-line.cm-active).");
	}
	if (!foundation.includes("body.focus-mode.typewriter-focus .markdown-source-view.mod-cm6 .cm-content")) {
		twFailures.push("src/01-foundation.css is missing the N7 centered composition room (.cm-content padding-block).");
	}
	if (!styleSettings.includes("id: typewriter-focus")) {
		twFailures.push("src/07-style-settings.css Style Settings is missing 'typewriter-focus'.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("typewriter-focus-showcase.md")) {
			twFailures.push(`${name} is missing typewriter-focus reference 'typewriter-focus-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("typewriter-focus-showcase.md")) {
		twFailures.push("preview/README.md is missing 'typewriter-focus-showcase.md'.");
	}
	for (const term of ["Typewriter Focus Showcase", "scroll-lock"]) {
		if (!previewFixture.includes(term)) {
			twFailures.push(`preview/typewriter-focus-showcase.md is missing '${term}'.`);
		}
	}

	return twFailures;
};

const validateReadingFont = (header, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const fontFailures = [];

	// N8: optional serif/Western reading-font profile (extends the CJK serif idea
	// to Latin text). Guard the indirection (--font-text-theme resolves through
	// --reading-font), the named stacks, the decoupled UI chrome, the curated
	// stacks, and the variable-select. The UI-chrome decoupling keeps the interface
	// system sans so a serif reading font does not turn the whole app serif.
	if (!header.includes("--font-text-theme: var(--reading-font, var(--font-system-ui))")) {
		fontFailures.push("src/00-header.css must resolve --font-text-theme through --reading-font with the system stack fallback.");
	}
	if (!header.includes("--font-interface-theme: var(--font-system-ui)")) {
		fontFailures.push("src/00-header.css must keep --font-interface-theme on --font-system-ui so the reading-font select does not restyle the UI chrome.");
	}
	for (const token of ["--font-system-ui:", "--font-western-serif:", "--font-western-modern:", "--font-western-humanist:"]) {
		if (!header.includes(token)) {
			fontFailures.push(`src/00-header.css is missing the N8 reading-font token '${token}'.`);
		}
	}
	if (!styleSettings.includes("id: reading-font")) {
		fontFailures.push("src/07-style-settings.css Style Settings is missing the reading-font control 'reading-font'.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("reading-font-showcase.md")) {
			fontFailures.push(`${name} is missing reading-font reference 'reading-font-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("reading-font-showcase.md")) {
		fontFailures.push("preview/README.md is missing 'reading-font-showcase.md'.");
	}
	for (const term of ["Reading Font Showcase", "reading-font"]) {
		if (!previewFixture.includes(term)) {
			fontFailures.push(`preview/reading-font-showcase.md is missing '${term}'.`);
		}
	}

	return fontFailures;
};

const validateBulletThreading = (header, foundation, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const threadFailures = [];

	// M12: Logseq-style bullet threading. Guard the tokens, the per-mode
	// anchors, the three drawing roles (tail / pass-through / elbow), the
	// active-bullet tint, and the toggle. DOM-honest: editor only — no
	// Reading View claim (no cursor there).
	for (const token of ["--ouroboros-thread-color:", "--ouroboros-thread-width:", "--ouroboros-thread-indent:"]) {
		if (!header.includes(token)) {
			threadFailures.push(`src/00-header.css is missing the M12 bullet-threading token '${token}'.`);
		}
	}
	if (!foundation.includes("body.bullet-threading .markdown-source-view.mod-cm6 {")) {
		threadFailures.push("src/01-foundation.css is missing the M12 Live Preview threading anchor (--ouroboros-thread-base).");
	}
	if (!foundation.includes("body.bullet-threading .markdown-source-view.mod-cm6:not(.is-live-preview)")) {
		threadFailures.push("src/01-foundation.css is missing the M12 source-mode threading anchor.");
	}
	if (!foundation.includes("border-bottom-left-radius: var(--radius-m);")) {
		threadFailures.push("src/01-foundation.css is missing the M12 rounded threading elbow.");
	}
	if (!foundation.includes("body.bullet-threading .markdown-source-view.mod-cm6 .HyperMD-list-line.cm-active .list-bullet")) {
		threadFailures.push("src/01-foundation.css is missing the M12 active-bullet tint rule.");
	}
	if (!styleSettings.includes("id: bullet-threading")) {
		threadFailures.push("src/07-style-settings.css Style Settings is missing 'bullet-threading'.");
	}
	// BUG-007: a negative z-index sinks the thread below line backgrounds
	// (.cm-line is not a stacking context), so the native "Highlight active
	// line" backdrop swallows it. Threads must stay at z-index 0 with the
	// list markers lifted above them.
	if (foundation.includes("z-index: -99")) {
		threadFailures.push("src/01-foundation.css regressed BUG-007: threading pseudo-elements use a negative z-index and sink below line backgrounds.");
	}
	if (!foundation.includes(":is(.list-bullet, .list-number, .task-list-item-checkbox)")) {
		threadFailures.push("src/01-foundation.css is missing the BUG-007 marker elevation rule (markers above the thread).");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("bullet-threading-showcase.md")) {
			threadFailures.push(`${name} is missing bullet-threading reference 'bullet-threading-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("bullet-threading-showcase.md")) {
		threadFailures.push("preview/README.md is missing 'bullet-threading-showcase.md'.");
	}
	for (const term of ["Bullet Threading Showcase", "bullet-threading"]) {
		if (!previewFixture.includes(term)) {
			threadFailures.push(`preview/bullet-threading-showcase.md is missing '${term}'.`);
		}
	}

	return threadFailures;
};

const validateCleanEmbeds = (foundation, styleSettings, readmeSource, readmeCnSource, previewIndex, previewFixture) => {
	const embedFailures = [];

	// M12: clean embeds (Minimal embed-strict absorption). Guard the global
	// toggle path, the per-note cssclass path, the hover affordance, and the
	// Style Settings entry.
	if (!foundation.includes("body.embed-clean .markdown-embed,")) {
		embedFailures.push("src/01-foundation.css is missing the M12 global clean-embed rule (body.embed-clean .markdown-embed).");
	}
	if (!foundation.includes(".markdown-preview-view.embed-clean .markdown-embed,")) {
		embedFailures.push("src/01-foundation.css is missing the M12 per-note clean-embed cssclass rule.");
	}
	if (!foundation.includes("body.embed-clean .markdown-embed:hover,")) {
		embedFailures.push("src/01-foundation.css is missing the M12 clean-embed hover affordance.");
	}
	if (!styleSettings.includes("id: embed-clean")) {
		embedFailures.push("src/07-style-settings.css Style Settings is missing 'embed-clean'.");
	}

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		if (!source.includes("clean-embeds-showcase.md")) {
			embedFailures.push(`${name} is missing clean-embeds reference 'clean-embeds-showcase.md'.`);
		}
	}
	if (!previewIndex.includes("clean-embeds-showcase.md")) {
		embedFailures.push("preview/README.md is missing 'clean-embeds-showcase.md'.");
	}
	for (const term of ["Clean Embeds Showcase", "embed-clean"]) {
		if (!previewFixture.includes(term)) {
			embedFailures.push(`preview/clean-embeds-showcase.md is missing '${term}'.`);
		}
	}

	return embedFailures;
};

const validateM12FixRegressions = (header, code, animations) => {
	const fixFailures = [];

	// BUG-003: `border: <color-token>` shorthand has no style and renders
	// nothing; the fancy-code borders must carry an explicit `1px solid`.
	if (code.includes("border: var(--codeblock-border);") || code.includes("border-left: var(--codeblock-border);")) {
		fixFailures.push("src/02-code.css regressed BUG-003: border shorthand uses the color token without an explicit style/width.");
	}
	// BUG-005: --max-width was an unused token; keep it removed.
	if (header.includes("--max-width:")) {
		fixFailures.push("src/00-header.css regressed BUG-005: unused --max-width token reintroduced.");
	}
	// BUG-006: the callout max-height transition was dead (Obsidian folds at
	// the display level) and overflow:hidden risked clipping popovers.
	if (animations.includes("transition: max-height")) {
		fixFailures.push("src/09-animations.css regressed BUG-006: dead callout max-height transition reintroduced.");
	}

	return fixFailures;
};

if (packageJson.version !== manifest.version) {
	failures.push(
		`package.json version (${packageJson.version}) does not match manifest.json version (${manifest.version}).`
	);
}

if (versions[manifest.version] !== manifest.minAppVersion) {
	failures.push(
		`versions.json entry for ${manifest.version} should be ${manifest.minAppVersion}, got ${versions[manifest.version] ?? "missing"}.`
	);
}

if (!sourceHeader.includes(`Version ${packageJson.version}`)) {
	failures.push(`src/00-header.css banner is not updated to Version ${packageJson.version}.`);
}

if (!builtTheme.includes(`Version ${packageJson.version}`)) {
	failures.push(`theme.css banner is not updated to Version ${packageJson.version}.`);
}

failures.push(...validateStyleSettings(styleSettingsSource));
failures.push(...validatePluginCompatibility(pluginCompatSource, pluginCompatAudit));
failures.push(...validateKnownLimitations(knownLimitations, pluginCompatAudit, readme, readmeCn));
failures.push(...validateStylePacks(foundationSource, styleSettingsSource, readme, readmeCn, previewReadme, presetPreview));
failures.push(...validateReadingWidth(sourceHeader, styleSettingsSource, readme, readmeCn, previewReadme, readingWidthPreview));
failures.push(...validateReadingFont(sourceHeader, styleSettingsSource, readme, readmeCn, previewReadme, readingFontPreview));
failures.push(...validateNumberedHeadings(foundationSource, styleSettingsSource, readme, readmeCn, previewReadme, numberedHeadingsPreview));
failures.push(...validateCodeBlocks(codeSource, styleSettingsSource, readme, readmeCn, previewReadme, codeBlockPreview));
failures.push(...validateNestedTags(foundationSource, readme, readmeCn, previewReadme, nestedTagsPreview));
failures.push(...validateGraphView(foundationSource, readme, readmeCn, previewReadme, graphViewPreview));
failures.push(...validateMotionAudit(animationsSource));
failures.push(...validateHighlightPens(foundationSource, readme, readmeCn, previewReadme, highlightPensPreview));
failures.push(...validateAccentPaper(sourceHeader, foundationSource, styleSettingsSource, readme, readmeCn, previewReadme, accentPaperPreview));
failures.push(...validateActivePath(foundationSource, styleSettingsSource, readme, readmeCn, previewReadme, activePathPreview));
failures.push(...validateDashboard(pluginsPrimarySource, readme, readmeCn, previewReadme, dashboardPreview));
failures.push(...validateTaskPriorityPalette(pluginsPrimarySource, styleSettingsSource, readme, readmeCn, previewReadme, taskPriorityPreview));
failures.push(...validatePaperPanes(foundationSource, sourceHeader, styleSettingsSource, readme, readmeCn, previewReadme, paperPanesPreview));
failures.push(...validateTypewriterFocus(foundationSource, styleSettingsSource, readme, readmeCn, previewReadme, typewriterPreview));
failures.push(...validateBulletThreading(sourceHeader, foundationSource, styleSettingsSource, readme, readmeCn, previewReadme, bulletThreadingPreview));
failures.push(...validateCleanEmbeds(foundationSource, styleSettingsSource, readme, readmeCn, previewReadme, cleanEmbedsPreview));
failures.push(...validateM12FixRegressions(sourceHeader, codeSource, animationsSource));
failures.push(...validateContentHelpers(foundationSource, pluginsPrimarySource, readme, readmeCn, previewReadme, contentHelpersPreview));
failures.push(...validateNavigationEnhancements(foundationSource, readme, readmeCn, previewReadme, navigationPreview));
failures.push(...validateImageHelpers(foundationSource, readme, readmeCn, previewReadme, imageHelpersPreview, imagePreviewAssets));
failures.push(...validateFocusKeyboardMode(foundationSource, styleSettingsSource, readme, readmeCn, previewReadme, focusModePreview));
failures.push(...validatePublishPrintSupport(foundationSource, readme, readmeCn, previewReadme, readFileSync("preview/CHECKLIST.md", "utf8"), publishPrintPreview));
failures.push(...validateReleaseCandidateQa(previewReadme, readFileSync("preview/CHECKLIST.md", "utf8"), qaRunPreview));
failures.push(...validateSyncScript(syncScript));

const expectedTheme = buildThemeOutput();
if (builtTheme !== expectedTheme) {
	failures.push('theme.css is out of date. Run "npm run build" and commit the result.');
}

if (failures.length > 0) {
	console.error("Theme checks failed:");
	for (const failure of failures) {
		console.error(`- ${failure}`);
	}
	process.exit(1);
}

console.log("Theme checks passed.");
