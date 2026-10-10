import {readFile, writeFile, readdir} from 'node:fs/promises';
import {resolve, relative} from 'node:path';
const root=resolve(new URL('..',import.meta.url).pathname);
const rows=[];
async function walk(dir) {
  for (const entry of (await readdir(dir,{withFileTypes:true})).sort((a,b)=>a.name.localeCompare(b.name))) {
    const path=resolve(dir,entry.name);
    if(entry.isDirectory()) await walk(path);
    else if(entry.name.endsWith('.css')) {
      const css=(await readFile(path,'utf8')).replace(/\/\*[\s\S]*?\*\//g,'');
      // Tokenize balanced blocks and declaration separators, preserving strings/functions.
      const stack=[];let start=0,quote='',depth=0;
      const emit=end=>{
        const declaration=css.slice(start,end).trim();
        const match=declaration.match(/^([\w-]+)\s*:\s*([\s\S]+)$/);
        if(!match || !stack.length) return;
        rows.push({file:relative(root,path),scope:stack.join(' / '),property:match[1],value:match[2].trim(),dependencies:[...new Set([...match[2].matchAll(/var\(\s*(--andm-[\w-]+)/g)].map(m=>m[1]))].join(' ')});
      };
      for(let i=0;i<css.length;i++) {
        const c=css[i];
        if(quote){if(c===quote && css[i-1]!=='\\')quote='';continue;}
        if(c==='"'||c==="'"){quote=c;continue;}
        if(c==='('){depth++;continue;}if(c===')'){depth--;continue;}
        if(depth)continue;
        if(c==='{'){stack.push(css.slice(start,i).trim());start=i+1;}
        else if(c===';'){emit(i);start=i+1;}
        else if(c==='}'){emit(i);stack.pop();start=i+1;}
      }
    }
  }
}
await walk(resolve(root,'src/styles'));
const quote=s=>'"'+String(s).replaceAll('"','""')+'"';
const output=['file,scope,property,value,dependencies',...rows.map(r=>Object.values(r).map(quote).join(','))].join('\n')+'\n';
const path=resolve(root,'docs/SOURCE-PROPERTIES.csv');
if(process.argv.includes('--write')) await writeFile(path,output);
else if(await readFile(path,'utf8')!==output) throw Error('Source property inventory is stale. Run npm run audit:sources -- --write after reviewing changed properties.');
const html=await readFile(resolve(root,'gallery/index.html'),'utf8');
const parts=new Set([...html.matchAll(/<section\b[^>]*data-part="([^"]+)"/g)].map(m=>m[1]).filter(p=>p!=='series'));
const audit=await readFile(resolve(root,'docs/SOURCE-REAUDIT.md'),'utf8');
for(const part of parts) if(!audit.includes('`'+part+'`'))throw Error('Missing component audit: '+part);
// New series hooks must reach a component consumer, rather than merely exist as tokens.
for(const hook of ['card-border-width','card-padding','pagination-radius','alert-padding-x','alert-padding-y','field-gap','field-help-gap','field-line-height','control-focus-width','control-focus-offset','control-focus-shadow','tabs-indicator-width','code-radius','spinner-duration'])
  if(!rows.some(r=>!r.file.includes('/series/') && r.dependencies.split(' ').includes('--andm-'+hook)))throw Error('Unused audited hook: '+hook);
console.log(JSON.stringify({parts:parts.size,properties:rows.length,inventory:'current',hooks:'consumed'}));
