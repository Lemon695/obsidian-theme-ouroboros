import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { pathToFileURL } from "url";

const sourceDir = "src";
const outputFile = "theme.css";

export const getThemeSourceFiles = () =>
	readdirSync(sourceDir)
		.filter((file) => file.endsWith(".css"))
		.sort();

export const buildThemeOutput = () => {
	const parts = getThemeSourceFiles().map((file) =>
		readFileSync(join(sourceDir, file), "utf8").trimEnd()
	);

	return `${parts.join("\n\n")}\n`;
};

const output = buildThemeOutput();

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
	writeFileSync(outputFile, output);
	console.log(`Built ${outputFile} from ${getThemeSourceFiles().length} source files.`);
}
