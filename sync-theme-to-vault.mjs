import { cpSync, existsSync, mkdirSync, readdirSync, renameSync, rmSync } from "fs";
import { basename, join, resolve } from "path";

const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help") || args.includes("-h")) {
	console.log(`Usage:
  npm run sync:vault -- /path/to/vault [--preview] [--dry-run] [--clean-lowercase]
  node sync-theme-to-vault.mjs /path/to/vault [--preview] [--dry-run] [--clean-lowercase]

Options:
  --preview          Also copy preview files into the vault
  --dry-run          Show target paths without copying files
  --clean-lowercase  Remove old .obsidian/themes/ouroboros after uppercase sync
`);
	process.exit(0);
}

const themeId = "Ouroboros";
const previewEnabled = args.includes("--preview");
const dryRun = args.includes("--dry-run");
const cleanLowercase = args.includes("--clean-lowercase");
const vaultArg = args.find((arg) => !arg.startsWith("--"));

if (!vaultArg) {
	console.error("Missing vault path.");
	process.exit(1);
}

const vaultPath = resolve(vaultArg);
if (!existsSync(vaultPath)) {
	console.error(`Vault path does not exist: ${vaultPath}`);
	process.exit(1);
}

const themesDir = join(vaultPath, ".obsidian", "themes");
const themeDir = join(themesDir, themeId);
const lowercaseThemeName = "ouroboros";
const lowercaseThemeDir = join(themesDir, lowercaseThemeName);

const listThemeEntries = () => existsSync(themesDir) ? readdirSync(themesDir, { withFileTypes: true }) : [];
const hasExactThemeEntry = (name) => listThemeEntries().some((entry) => entry.isDirectory() && entry.name === name);
let normalizedLowercaseThemeDir = false;

const normalizeLowercaseThemeDir = () => {
	if (!cleanLowercase || !hasExactThemeEntry(lowercaseThemeName) || hasExactThemeEntry(themeId)) {
		return;
	}

	if (dryRun) {
		console.log(`Would rename old lowercase theme directory ${lowercaseThemeDir} -> ${themeDir}`);
		normalizedLowercaseThemeDir = true;
		return;
	}

	const temporaryThemeDir = join(themesDir, `.ouroboros-casefix-${Date.now()}`);
	renameSync(lowercaseThemeDir, temporaryThemeDir);
	renameSync(temporaryThemeDir, themeDir);
	normalizedLowercaseThemeDir = true;
	console.log(`Renamed old lowercase theme directory ${lowercaseThemeDir} -> ${themeDir}`);
};

if (dryRun) {
	console.log(`Dry-run: would sync theme files to ${themeDir}`);
} else {
	mkdirSync(themesDir, { recursive: true });
}

normalizeLowercaseThemeDir();

if (!dryRun) {
	mkdirSync(themeDir, { recursive: true });
}

for (const file of ["theme.css", "manifest.json"]) {
	const targetFile = join(themeDir, basename(file));
	if (dryRun) {
		console.log(`Would copy ${file} -> ${targetFile}`);
	} else {
		cpSync(file, targetFile);
	}
}

if (previewEnabled) {
	const previewRoot = join(vaultPath, "Theme Preview", themeId);
	const previewDir = join(previewRoot, "preview");
	if (dryRun) {
		console.log(`Would sync preview notes to ${previewDir}`);
	} else {
		mkdirSync(previewRoot, { recursive: true });
		rmSync(previewDir, { recursive: true, force: true });
		cpSync("preview", previewDir, { recursive: true });
	}
}

if (cleanLowercase && !normalizedLowercaseThemeDir && hasExactThemeEntry(lowercaseThemeName)) {
	if (dryRun) {
		console.log(`Would remove old lowercase theme directory ${lowercaseThemeDir}`);
	} else {
		rmSync(lowercaseThemeDir, { recursive: true, force: true });
		console.log(`Removed old lowercase theme directory ${lowercaseThemeDir}`);
	}
}

if (dryRun) {
	console.log("Dry-run completed. No vault files were changed.");
} else {
	console.log(`Synced theme files to ${themeDir}`);
	if (previewEnabled) {
		console.log(`Synced preview notes to ${join(vaultPath, "Theme Preview", themeId)}`);
	}
}
