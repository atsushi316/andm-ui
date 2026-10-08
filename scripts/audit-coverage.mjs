import {readFile} from 'node:fs/promises';
const read=path=>readFile(new URL('../'+path,import.meta.url),'utf8');
const data=JSON.parse(await read('docs/COMPONENT-COVERAGE.json'));
const md=await read('docs/COMPONENT-COVERAGE.md');
const html=await read('gallery/index.html');
const parts=new Set([...html.matchAll(/<section\b[^>]*data-part="([^"]+)"/g)].map(m=>m[1]).filter(p=>p!=='series'));
const states=new Set(['実装済み','簡易版','未実装','対象外']);
const ids=new Set(),covered=new Set(),counts={};
for(const row of data.rows){
 if(ids.has(row.id)||!states.has(row.status))throw Error('Invalid or duplicate coverage row: '+row.id);
 ids.add(row.id);counts[row.status]=(counts[row.status]||0)+1;
 for(const part of row.parts){if(!parts.has(part))throw Error('Unknown Gallery part: '+part);covered.add(part);}
 for(const system of Object.keys(row.sources))if(!data.sources.some(s=>s.system===system))throw Error('Unknown source: '+system);
 const cells=data.sources.map(s=>(row.sources[s.system]||[]).join(' / ')||'—');
 const expected='| '+[row.label,row.status,row.priority,...cells].join(' | ')+' |';
 if(!md.includes(expected))throw Error('Coverage document differs from ledger: '+row.id);
 if(row.status==='未実装'&&!row.gap)throw Error('Missing gap explanation: '+row.id);
}
for(const part of parts)if(!covered.has(part))throw Error('Unreviewed part: '+part);
for(const state of states)if(counts[state]!==data.counts[state])throw Error('Incorrect coverage total: '+state);
console.log(JSON.stringify({parts:parts.size,capabilities:ids.size,sources:data.sources.length,counts,coverage:'complete',document:'current'}));
