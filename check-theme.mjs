import { readFileSync } from "fs";
import { buildThemeOutput } from "./build-theme.mjs";

const packageJson = JSON.parse(readFileSync("package.json", "utf8"));
const manifest = JSON.parse(readFileSync("manifest.json", "utf8"));
const versions = JSON.parse(readFileSync("versions.json", "utf8"));
const builtTheme = readFileSync("theme.css", "utf8");
const sourceHeader = readFileSync("src/00-header.css", "utf8");

const failures = [];

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
