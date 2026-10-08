const {chromium}=await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
import {fileURLToPath} from 'node:url';
import assert from 'node:assert/strict';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
const out=process.env.QA_OUTPUT || '/tmp/andm-philosophy-qa';await mkdir(out,{recursive:true});
const {createServer}=await import('node:http');
const {stat}=await import('node:fs/promises');
const root=fileURLToPath(new URL('../',import.meta.url)).replace(/\/$/,'');
const server=createServer(async(req,res)=>{try{let path=root+decodeURIComponent(req.url.split('?')[0]);if(path.endsWith('/'))path+='index.html';const body=await readFile(path);const ext=path.split('.').at(-1);res.setHeader('Content-Type',({html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',json:'application/json',svg:'image/svg+xml',md:'text/plain'})[ext]||'text/plain');res.end(body);}catch{res.writeHead(404);res.end('Not found');}});
await new Promise(resolve=>server.listen(4181,'127.0.0.1',resolve));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE_PATH ? {executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-dev-shm-usage']} : {})});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base='http://127.0.0.1:4181/gallery/lab/philosophy-poc/';
const matrix=[],axe=[];
for(const candidate of (process.env.OPS_ONLY ? [] : ['minimal','brutal','original','minimal-extended','index','decisions']))for(const width of [320,390,768,1280])for(const scale of [1,2]) {
 await page.setViewportSize({width,height:900});await page.goto(base+(candidate==='index'?'':candidate+'.html'));await page.waitForTimeout(100);
 await page.evaluate(scale=>document.documentElement.style.fontSize=16*scale+'px',scale);
 const overflow=await page.evaluate(()=>({doc:document.documentElement.scrollWidth,width:innerWidth,over:[...document.querySelectorAll('main *')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.right>innerWidth+1||r.left< -1)}).slice(0,6).map(e=>e.tagName+'.'+e.className)}));
 matrix.push({candidate,width,scale,...overflow});
 if(overflow.doc>width+1)console.log('OVERFLOW',JSON.stringify(matrix.at(-1)));
 if(scale===1&&[390,1280].includes(width))await page.screenshot({path:out+'/'+candidate+'-'+width+'.png',fullPage:true});
 if(scale===1&&width===390){await page.addScriptTag({path:process.env.AXE_SCRIPT || (()=>{throw Error('Set AXE_SCRIPT to axe-core/axe.min.js')})()});const results=await page.evaluate(async()=>await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));axe.push({candidate,violations:results.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});}
}
await writeFile(out+"/matrix.json",JSON.stringify({matrix,axe},null,2));
// C: Native keyboard, selected state, switching to linear and back, details.
await page.setViewportSize({width:1280,height:900});await page.goto(base+'original.html');
await page.locator('[data-node="history"]').focus();await page.keyboard.press('Enter');assert.equal(await page.locator('[data-node="history"]').getAttribute('aria-pressed'),'true');assert.equal(await page.locator('#node-detail h3').textContent(),'履歴確認');
await page.locator('button[data-view="linear"]').focus();await page.keyboard.press('Space');assert.equal(await page.locator('.inspector').getAttribute('data-view'),'linear');assert.equal(await page.locator('[data-node="history"]').getAttribute('aria-pressed'),'true');
await page.locator('button[data-view="map"]').click();assert.equal(await page.locator('[data-node="history"]').getAttribute('aria-pressed'),'true');
await page.keyboard.press("Tab");
const focus=await page.locator('[data-node="history"]').evaluate(e=>{e.focus();const s=getComputedStyle(e);return {style:s.outlineStyle,width:s.outlineWidth}});assert.notEqual(focus.style,'none');
await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await page.evaluate(()=>matchMedia('(prefers-reduced-motion:reduce)').matches),true);
// Compare retaining semantic section on switch, C inspector selection and viewport mode.
await page.goto(base);await page.waitForSelector('#left-meta dt',{state:'attached'});
await page.selectOption('#section-choice','features');await page.locator('#jump').click();await page.waitForTimeout(100);
await page.selectOption('#left-choice','brutal');await page.locator('#left-frame').waitFor();await page.waitForTimeout(180);
let frame=page.frames().find(f=>f.url().endsWith('/brutal.html'));assert(frame);let rect=await frame.locator('#features').evaluate(e=>e.getBoundingClientRect().top);assert(Math.abs(rect)<20,`preserved section top ${rect}`);
await page.selectOption('#left-choice','original');await page.waitForTimeout(150);
frame=page.frames().find(f=>f.url().endsWith('/original.html'));await frame.locator('[data-node="history"]').click();await frame.locator('button[data-view="linear"]').click();
await page.selectOption('#left-choice','minimal');await page.waitForTimeout(150);await page.selectOption('#left-choice','original');await page.waitForTimeout(150);
frame=page.frames().find(f=>f.url().endsWith('/original.html'));assert.equal(await frame.locator('[data-node="history"]').getAttribute('aria-pressed'),'true');assert.equal(await frame.locator('.inspector').getAttribute('data-view'),'linear');
assert(await page.locator('#right-pane').isVisible());await page.locator('#two-up').uncheck();assert(!(await page.locator('#right-pane').isVisible()));await page.locator('#two-up').check();
await page.setViewportSize({width:390,height:900});await page.waitForFunction(()=>document.getElementById('right-pane').hidden);assert(!(await page.locator('#right-pane').isVisible()));
await page.locator('#notes').fill('日本語の長い観察メモ。読み順と世界観を別々に記録する。');const d=page.waitForEvent('download');await page.locator('#export').click();const download=await d;const file=await download.path();const exported=JSON.parse(await readFile(file,'utf8'));assert.equal(exported.recommended,null);assert.equal(exported.notes,'日本語の長い観察メモ。読み順と世界観を別々に記録する。');
// Long Japanese does not break flow.
await page.goto(base+'brutal.html');await page.evaluate(()=>document.querySelector('h1').textContent='散らばった考えを関連付けて履歴から振り返りながら自分で整理していける、非常に長い日本語の見出し');assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),true);
await page.keyboard.press('Tab');const active=await page.evaluate(()=>document.activeElement.tagName);assert.notEqual(active,'BODY');
// Gallery regression: unchanged 58 parts, Series switching and search interaction.
await page.goto('http://127.0.0.1:4181/gallery/');await page.waitForTimeout(500);
const gallery=await page.evaluate(()=>({parts:document.querySelectorAll('[data-part].g-section:not([data-part="series"])').length,inputs:[...document.querySelectorAll('input')].filter(x=>x.type==='search').map(x=>({id:x.id,placeholder:x.placeholder})),selects:[...document.querySelectorAll('select')].map(x=>({id:x.id,len:x.options.length}))}));
assert.equal(gallery.parts,58);
await page.locator('#component-search').fill('検索');await page.waitForTimeout(180);assert(await page.locator('#search-results').isVisible());
await page.goto('http://127.0.0.1:4181/gallery/#/series/baseline');await page.waitForTimeout(250);
const seriesOptions=await page.locator('#series-select option').evaluateAll(x=>x.map(o=>o.value));
if(seriesOptions.includes('carbon')){await page.selectOption('#series-select','carbon');assert.equal(await page.locator('#series-select').inputValue(),'carbon');}
await page.goto('http://127.0.0.1:4181/gallery/lab/');await page.locator('#goal').fill('作りかけの作品を選ぶ');await page.locator('#brief button').click();assert((await page.locator('#proposal').textContent()).includes('作りかけの作品を選ぶ'));
await page.locator('[data-project="空間ノート"]').click();await page.locator('#open').click();assert(await page.locator('#project-dialog').isVisible());await page.keyboard.press('Escape');assert(!(await page.locator('#project-dialog').isVisible()));
await writeFile(out+'/results.json',JSON.stringify({matrix,axe,focus,gallery,errors,operations:'C Enter/Space/state/focus; compare section/state/single/two-up/mobile; export null; long Japanese; reduced-motion'},null,2));
assert.equal(matrix.filter(x=>x.doc>x.width+1).length,0,'Horizontal overflow');assert.equal(axe.flatMap(x=>x.violations).length,0,'axe violation');assert.equal(errors.length,0,'JavaScript exceptions');
console.log(JSON.stringify({matrix:matrix.length,overflows:matrix.filter(x=>x.doc>x.width+1),axe,focus,gallery,errors},null,2));
await browser.close();server.close();
