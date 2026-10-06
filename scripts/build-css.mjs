import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const stylesDir = join(root, "src", "styles");
const outFile = join(root, "dist", "style.css");

const sources = [
  "index.css",
  "tokens.css",
  "base.css",
  "controls/button.css",
  "controls/textfield.css",
  "controls/checkbox.css",
  "controls/radio.css",
  "controls/switch.css",
  "controls/select.css",
  "controls/slider.css",
  "marks/divider.css",
  "marks/badge.css",
  "containers/surface.css",
  "containers/card.css",
  "feedback/alert.css",
  "feedback/toast.css",
  "overlays/dialog.css",
  "overlays/tooltip.css",
  "overlays/drawer.css",
  "overlays/popover.css",
  "navigation/tabs.css",
  "navigation/breadcrumb.css",
  "navigation/pagination.css",
  "navigation/menu.css",
];

const banner = "/*! @atsushi316/andm-ui — built from src/styles */\n";

async function readCss(file) {
  const css = await readFile(file, "utf8");
  const dir = dirname(file);
  const re = /@import\s+["']([^"']+)["']\s*;/g;
  let out = "";
  let last = 0;
  let match;
  let any = false;
  while ((match = re.exec(css))) {
    any = true;
    out += css.slice(last, match.index);
    out += `${(await readCss(join(dir, match[1]))).trim()}\n`;
    last = match.index + match[0].length;
  }
  out += css.slice(last);
  return any ? out : css;
}

const chunks = [];
for (const name of sources) {
  const css = await readCss(join(stylesDir, name));
  chunks.push(`/* --- ${name} --- */\n${css.trim()}\n`);
}

await mkdir(dirname(outFile), { recursive: true });
await writeFile(outFile, banner + chunks.join("\n"), "utf8");
console.log(`Wrote ${outFile}`);
