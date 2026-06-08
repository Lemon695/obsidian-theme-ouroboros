import { readFileSync } from "fs";
import { buildThemeOutput } from "./build-theme.mjs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const versions = JSON.parse(readFileSync("versions.json", "utf8"));
const builtTheme = readFileSync("theme.css", "utf8");
const syncScript = readFileSync("sync-theme-to-vault.mjs", "utf8");
const sourceHeader = readFileSync("src/00-header.css", "utf8");
const styleSettingsSource = readFileSync("src/07-style-settings.css", "utf8");
const pluginCompatSource = readFileSync("src/08-plugin-compat.css", "utf8");
const readme = readFileSync("README.md", "utf8");
const readmeCn = readFileSync("README_CN.md", "utf8");

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
	for (const key of ["name:", "id:", "settings:"]) {
		if (!lines.some((line) => line.trim().startsWith(key))) {
			settingsFailures.push(`src/07-style-settings.css @settings block is missing top-level ${key}`);
		}
	}

	const ids = new Map();
	let currentItem = null;
	const items = [];

	for (let index = 0; index < lines.length; index += 1) {
		const lineNumber = index + 6;
		const line = lines[index];
		const trimmed = line.trim();

		if (/^ {4}-\s*$/.test(line)) {
			currentItem = { lineNumber, fields: new Set(), id: null };
			items.push(currentItem);
			continue;
		}

		if (!currentItem) continue;

		const fieldMatch = trimmed.match(/^([a-zA-Z0-9_-]+):\s*(.*)$/);
		if (!fieldMatch) continue;

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
	}

	for (const item of items) {
		if (!item.fields.has("id")) settingsFailures.push(`src/07-style-settings.css settings item at line ${item.lineNumber} is missing id.`);
		if (!item.fields.has("type")) settingsFailures.push(`src/07-style-settings.css settings item '${item.id ?? "<unknown>"}' at line ${item.lineNumber} is missing type.`);
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
		if (id && section) sections[section].add(id);
	}

	return { sections, failures: [] };
};

const validatePluginCompatibility = (source) => {
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
		if (!sections.core.has(id)) compatFailures.push(`src/08-plugin-compat.css @plugins core list is missing '${id}'.`);
	}

	for (const id of requiredCommunityIds) {
		if (!sections.community.has(id)) compatFailures.push(`src/08-plugin-compat.css @plugins community list is missing '${id}'.`);
	}

	for (const forbiddenId of ["db-folder", "obsidian-db-folder"]) {
		if (sections.community.has(forbiddenId)) {
			compatFailures.push(`src/08-plugin-compat.css should not list legacy DB Folder id '${forbiddenId}' until an official id is verified.`);
		}
	}

	return compatFailures;
};

const validatePublicDocs = (readmeSource, readmeCnSource) => {
	const docFailures = [];

	const forbiddenTerms = [
		"docs-code-ai/",
		"preview/CHECKLIST.md",
		"npm run sync:vault",
		"## Preview QA",
		"## Preview QA",
		"preview/core-showcase.md",
		"preview/plugin-showcase.md",
	];

	for (const [name, source] of [["README.md", readmeSource], ["README_CN.md", readmeCnSource]]) {
		for (const term of forbiddenTerms) {
			if (source.includes(term)) {
				docFailures.push(`${name} still contains internal/publication term '${term}'.`);
			}
		}
	}

	for (const [name, source, terms] of [
		["README.md", readmeSource, ["## Installation", "## Highlights", "## Compatibility", "## Development"]],
		["README_CN.md", readmeCnSource, ["## 安装方式", "## 主题亮点", "## 兼容性", "## 开发"]],
	]) {
		for (const term of terms) {
			if (!source.includes(term)) {
				docFailures.push(`${name} is missing public documentation heading '${term}'.`);
			}
		}
	}

	return docFailures;
};

const validateSyncScript = (script) => {
	const syncFailures = [];
	for (const term of [
		"resolve(vaultArg)",
		"hasExactThemeEntry",
		"normalizeLowercaseThemeDir",
		"cleanLowercase && !normalizedLowercaseThemeDir",
		".obsidian",
		"themes",
		"Ouroboros",
	]) {
		if (!script.includes(term)) {
			syncFailures.push(`sync-theme-to-vault.mjs is missing sync safety term '${term}'.`);
		}
	}
	return syncFailures;
};

if (packageJson.version !== manifest.version) {
	failures.push(`package.json version (${packageJson.version}) does not match manifest.json version (${manifest.version}).`);
}

if (versions[manifest.version] !== manifest.minAppVersion) {
	failures.push(`versions.json entry for ${manifest.version} should be ${manifest.minAppVersion}, got ${versions[manifest.version] ?? "missing"}.`);
}

if (!sourceHeader.includes(`Version ${packageJson.version}`)) {
	failures.push(`src/00-header.css banner is not updated to Version ${packageJson.version}.`);
}

if (!builtTheme.includes(`Version ${packageJson.version}`)) {
	failures.push(`theme.css banner is not updated to Version ${packageJson.version}.`);
}

failures.push(...validateStyleSettings(styleSettingsSource));
failures.push(...validatePluginCompatibility(pluginCompatSource));
failures.push(...validatePublicDocs(readme, readmeCn));
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
