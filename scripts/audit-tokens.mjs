import { readFile } from 'node:fs/promises';
const css = (await readFile(new URL('../dist/style.css', import.meta.url), 'utf8')).replace(/\/\*[\s\S]*?\*\//g, '');
const definitions = new Set([...css.matchAll(/(--andm-[\w-]+)\s*:/g)].map(match => match[1]));
const required = new Set();
const optional = new Set();
for (const match of css.matchAll(/var\(\s*(--andm-[\w-]+)\s*([,)])/g)) {
  if (!definitions.has(match[1])) (match[2] === ',' ? optional : required).add(match[1]);
}
console.log(`${definitions.size} defined tokens`);
console.log('Optional fallback hooks:', [...optional].sort().join(', ') || 'none');
console.log('Undefined required references:', [...required].sort().join(', ') || 'none');
if (required.size) process.exitCode = 1;
