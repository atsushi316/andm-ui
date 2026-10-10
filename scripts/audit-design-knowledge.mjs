import {readFile,readdir} from 'node:fs/promises';
import assert from 'node:assert/strict';
const root=new URL('../',import.meta.url);
const read=p=>readFile(new URL(p,root),'utf8');
const schema=JSON.parse(await read('research/design-knowledge/schema.json'));
const catalog=JSON.parse(await read('research/design-knowledge/catalog.json'));
// Closed validator for the exact JSON Schema keyword subset used here.
// Unknown keywords fail explicitly; it does not claim general JSON Schema support.
const supported=new Set(['$schema','$defs','$ref','title','type','additionalProperties','required','properties','items','uniqueItems','minLength','pattern','const','enum']);
function schemaCheck(s) {
 for(const key of Object.keys(s)) assert(supported.has(key),`Unsupported schema keyword: ${key}`);
 if(s.$ref)assert(s.$ref.startsWith('#/$defs/') && schema.$defs[s.$ref.split('/').at(-1)],'Bad local schema ref');
 for(const x of Object.values(s.properties||{}))schemaCheck(x);
 for(const x of Object.values(s.$defs||{}))schemaCheck(x);
 if(s.items)schemaCheck(s.items);
}
function validate(v,s,path='$') {
 if(s.$ref)return validate(v,schema.$defs[s.$ref.split('/').at(-1)],path);
 const type=v===null?'null':Array.isArray(v)?'array':typeof v;
 if(s.type)assert([s.type].flat().includes(type),`${path}: wrong type ${type}`);
 if('const' in s)assert.deepEqual(v,s.const,`${path}: const`);
 if(s.enum)assert(s.enum.includes(v),`${path}: enum`);
 if(typeof v==='string') {
  if(s.minLength)assert(v.length>=s.minLength,`${path}: minLength`);
  if(s.pattern)assert(new RegExp(s.pattern).test(v),`${path}: pattern`);
 }
 if(type==='object') {
  for(const key of s.required||[])assert(Object.hasOwn(v,key),`${path}: missing ${key}`);
  for(const [key,x] of Object.entries(v)) {
   if(s.additionalProperties===false)assert(Object.hasOwn(s.properties||{},key),`${path}: unknown ${key}`);
   if(s.properties?.[key])validate(x,s.properties[key],`${path}.${key}`);
  }
 }
 if(type==='array') {
  if(s.uniqueItems)assert(new Set(v.map(x=>JSON.stringify(x))).size===v.length,`${path}: duplicate item`);
  if(s.items)v.forEach((x,i)=>validate(x,s.items,`${path}[${i}]`));
 }
}
schemaCheck(schema);validate(catalog,schema);
const ids=new Set(catalog.records.map(r=>r.id));assert.equal(ids.size,catalog.records.length,'Duplicate record ID');
const policy=await read('docs/SOURCE-FIRST.md');
for(const field of ['basis','sourceStatus'])for(const value of schema.$defs.record.properties[field].enum)assert(policy.includes('`'+value+'`'),`Source-First missing ${value}`);
for(const r of catalog.records) {
 assert.equal(r.recommended,null,`${r.id}: adoption must remain undecided`);
 assert.equal(r.adoption.actor,null,`${r.id}: no inferred human adoption`);
 const refs=[...r.relatedIds,...r.validation,...r.alternatives.map(x=>x.id),...Object.entries(r.content).filter(([k])=>k.endsWith('Ids')).flatMap(([,v])=>v),...(r.content.componentUses||[]).flatMap(x=>x.decisionIds)];
 refs.forEach(id=>assert(ids.has(id),`${r.id}: unresolved ${id}`));
 if(r.sourceStatus==='specified')assert(r.sources.some(s=>s.checkedAt && s.verification==='本文確認'),`${r.id}: specified requires checked body`);
 if(r.sourceStatus==='not-specified-in-checked-scope')assert(r.checkedScope && r.sources.length,`${r.id}: missing checked scope`);
 for(const s of r.sources) {
  assert(s.supports.length,`${r.id}: missing supported claim`);
  if(!s.checkedAt)assert.notEqual(r.sourceStatus,'specified',`${r.id}: unchecked source`);
 }
 if(r.basis==='official')assert(r.kind==='constraint' && r.sources.some(s=>s.authority==='standard'),`${r.id}: do not label aesthetic interpretation official`);
 for(const use of r.content.componentUses||[])if(use.mode==='extend')assert(use.changes.length,`${r.id}: missing change scope`);
}
const brief=JSON.parse(await read('gallery/lab/philosophy-poc/brief.json'));
const candidates=JSON.parse(await read('gallery/lab/philosophy-poc/candidates.json'));
const normalize=s=>s.replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();
let mainA;
for(const [key,meta] of Object.entries(candidates)) {
 assert(ids.has(meta.decisionId),'Unresolved candidate decision');
 const html=await read(`gallery/lab/philosophy-poc/${key}.html`);
 for(const [id,value] of Object.entries(brief.content)) {
  const match=html.match(new RegExp(`<([a-z0-9]+)[^>]*data-content="${id}"[^>]*>([^<]*)<\\/\\1>`));
  assert(match,`${key}: missing content ${id}`);assert.equal(normalize(match[2]),normalize(value),`${key}: different ${id}`);
 }
 assert(html.includes('href="#usage"') && html.includes('href="#limits"'),'Common action targets');
 const main=html.match(/<main>([\s\S]*?)<\/main>/)[1];
 if(key==='minimal')mainA=main;
 if(key==='minimal-extended')assert.equal(main,mainA,'A/A′ main DOM must match');
 assert(!html.includes('lab.css'),'Do not import unscoped legacy Lab CSS');
}
for(const file of await readdir(new URL('gallery/lab/philosophy-poc/',root)))if(/\.(js|css|html)$/.test(file)) {
 const text=await read('gallery/lab/philosophy-poc/'+file);
 assert(!/(?:fetch|import).*research\//.test(text),`${file}: Research runtime dependency`);
}
const packageJSON=JSON.parse(await read('package.json'));
assert(packageJSON.files.every(p=>!p.startsWith('research')),'Research in npm distribution');
console.log(`Design knowledge: ${catalog.records.length} records, schema subset/IDs/Source-First/null/content/A′/runtime boundaries OK`);
