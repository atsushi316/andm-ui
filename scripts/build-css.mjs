import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const stylesDir = join(root, "src", "styles");
const outFile = join(root, "dist", "style.css");

const sources = ["index.css", "tokens.css", "base.css", "button.css"];

const banner = "/*! @atsushi316/andm-ui — built from src/styles */\n";

const chunks = [];
for (const name of sources) {
  const css = await readFile(join(stylesDir, name), "utf8");
  chunks.push(`/* --- ${name} --- */\n${css.trim()}\n`);
}

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, banner + chunks.join("\n"), "utf8");
console.log(`Wrote ${outFile}`);
