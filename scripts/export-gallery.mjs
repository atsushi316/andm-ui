import {cp, mkdir, readFile, writeFile, readdir} from 'node:fs/promises';
import {resolve, join, dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {createHash} from 'node:crypto';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const target=process.argv[2] && resolve(process.argv[2]);
if(!target || target===root || root.startsWith(target+'/')) throw new Error('Provide a separate static output directory.');
await mkdir(target,{recursive:true});
for(const folder of ['gallery','docs','dist']) await cp(join(root,folder),join(target,folder),{recursive:true});
for(const folder of ['library','analysis','spatial']) {
 await mkdir(join(target,'research',folder),{recursive:true});
 for(const file of await readdir(join(root,'research',folder))) if(file.endsWith('.md')) await cp(join(root,'research',folder,file),join(target,'research',folder,file));
}
await cp(join(root,'research','README.md'),join(target,'research','README.md'));
await writeFile(join(target,'index.html'),'<!doctype html><html lang="ja"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>andm-ui</title><meta http-equiv="refresh" content="0;url=/gallery/"><a href="/gallery/">ギャラリーを開く</a></html>');
const stamp=createHash('sha256').update(await readFile(join(root,'dist/style.css'))).update(await readFile(join(root,'gallery/index.html'))).digest('hex').slice(0,12);
const p=join(target,'gallery/index.html');let html=await readFile(p,'utf8');
html=html.replace(/src="([\w-]+\.js)(?:\?[^"]*)?"/g,'src="$1?v='+stamp+'"');
html=html.replace(/href="([^"?]*\.css)(?:\?[^"]*)?"/g,'href="$1?v='+stamp+'"');
html=html.replace(/data-gallery-build="[^"]*"/,'data-gallery-build="'+stamp+'"');
await writeFile(p,html);
console.log(JSON.stringify({directory:target,build:stamp}));
