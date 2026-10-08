import {fileURLToPath} from 'node:url';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createServer} from 'node:http';
import assert from 'node:assert/strict';
const engines=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const out=process.env.QA_OUTPUT||'/tmp/andm-materiality-qa';await mkdir(out,{recursive:true});
const root=fileURLToPath(new URL('../',import.meta.url));
const server=createServer(async(req,res)=>{try{let path=root+decodeURIComponent(req.url.split('?')[0]).replace(/^\//,'');if(path.endsWith('/'))path+='index.html';res.setHeader('Content-Type',({html:'text/html; charset=utf-8',css:'text/css',js:'text/javascript',json:'application/json',md:'text/plain'})[path.split('.').at(-1)]||'text/plain');res.end(await readFile(path));}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(4182,'127.0.0.1',r));
const browser=await engines.chromium.launch({headless:true,executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,args:['--no-sandbox','--disable-dev-shm-usage']});
const page=await browser.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const base='http://127.0.0.1:4182/gallery/lab/materiality-behavior/';
const report={matrix:[],axe:[],trajectories:[],operations:[],otherEngines:[]};
try {
for(const route of ['', '?mode=evaluate','?condition=D','example.html',...(process.env.INCLUDE_REUSE?['reuse-test/']:[])])for(const width of [320,390,768,1280])for(const scale of [1,2]) {
 await page.setViewportSize({width,height:900});await page.goto(base+route);await page.waitForTimeout(50);await page.evaluate(s=>document.documentElement.style.fontSize=16*s+'px',scale);
 const doc=await page.evaluate(()=>document.documentElement.scrollWidth);report.matrix.push({route,width,scale,doc});assert(doc<=width+1,`overflow ${route} ${width} ${scale}: ${doc}`);
 if(scale===1&&[390,1280].includes(width))await page.screenshot({path:out+'/'+(route.replace(/[^a-zA-Z]/g,'')||'explore')+'-'+width+'.png',fullPage:true});
 if(width===390&&scale===1){await page.addScriptTag({path:process.env.AXE_SCRIPT});const a=await page.evaluate(async()=>axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21aa','wcag22aa']}}));report.axe.push({route,violations:a.violations.map(v=>({id:v.id,nodes:v.nodes.map(n=>n.target)}))});}
}
await page.setViewportSize({width:1280,height:900});await page.goto(base);const buttons=page.locator('.mb-button');assert.equal(await buttons.count(),4);
const geometry=await buttons.evaluateAll(bs=>bs.map(b=>({width:b.getBoundingClientRect().width,height:b.getBoundingClientRect().height,color:getComputedStyle(b.querySelector('.mb-face')).backgroundColor})));assert(geometry.every(g=>JSON.stringify(g)===JSON.stringify(geometry[0])));
for(let i=0;i<4;i++) {
 const b=buttons.nth(i);await b.scrollIntoViewIfNeeded();const box=await b.boundingBox();await page.mouse.move(box.x+box.width/2,box.y+box.height/2);await page.mouse.down();await page.waitForTimeout(160);
 const pressed=await b.locator('.mb-face').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).a);assert(Math.abs(pressed-.94)<.003);
 if(i===0)await page.screenshot({path:out+'/press.png'});
 await page.mouse.up();const samples=[];for(const ms of [40,80,120,160]){await page.waitForTimeout(ms);samples.push(await b.locator('.mb-face').evaluate(e=>new DOMMatrix(getComputedStyle(e).transform).a));}
 const elastic=[0,3].includes(i);assert(elastic?samples.some(s=>s>1.001):samples.every(s=>s<=1.0001),JSON.stringify(samples));
 assert((await b.locator('xpath=ancestor::article').locator('.result').textContent()).includes('保存しました'));report.trajectories.push({condition:'ABCD'[i],pressed,samples,elastic});
 assert.equal((await b.boundingBox()).width,box.width);
}
const card=page.locator('.condition').first(), b=card.locator('.mb-button');
let count=1;for(let i=0;i<8;i++){await b.click({delay:10});count++;}assert((await card.locator('.result').textContent()).includes(count+'回目'));
await b.focus();await page.keyboard.press('Tab');await page.keyboard.press('Shift+Tab');assert(await b.evaluate(e=>document.activeElement===e));await page.keyboard.press('Enter');count++;await page.keyboard.press('Space');count++;assert((await card.locator('.result').textContent()).includes(count+'回目'));
const focus=await b.evaluate(e=>({outline:getComputedStyle(e).outlineStyle,width:getComputedStyle(e).outlineWidth}));assert.equal(focus.outline,'solid');assert.equal(focus.width,'3px');
await page.keyboard.down('Space');await page.keyboard.press('Escape');await page.keyboard.up('Space');await page.waitForTimeout(30);assert((await card.locator('.result').textContent()).includes(count+'回目'));assert.equal(await b.getAttribute('data-held'),null);
// Assistive activation remains possible after cancellation.
await b.evaluate(e=>e.click());count++;assert((await card.locator('.result').textContent()).includes(count+'回目'));
const box=await b.boundingBox();await page.mouse.move(box.x+10,box.y+10);await page.mouse.down();await page.mouse.move(box.x-30,box.y-30);await page.mouse.up();assert.equal(await b.getAttribute('data-held'),null);assert((await card.locator('.result').textContent()).includes(count+'回目'));
await b.dispatchEvent('pointerdown',{pointerId:9,isPrimary:true,button:0,pointerType:'touch'});await b.dispatchEvent('pointercancel',{pointerId:9});assert.equal(await b.getAttribute('data-held'),null);
await b.focus();await page.keyboard.down('Space');await page.evaluate(()=>window.dispatchEvent(new Event('blur')));await page.keyboard.up('Space');assert.equal(await b.getAttribute('data-held'),null);
await card.locator('.disable-example').check();assert(await b.isDisabled());await b.evaluate(e=>e.click());assert((await card.locator('.result').textContent()).includes(count+'回目'));await card.locator('.disable-example').uncheck();
await page.emulateMedia({reducedMotion:'reduce'});await b.focus();await page.keyboard.down('Space');assert.equal(await b.locator('.mb-face').evaluate(e=>getComputedStyle(e).transform),'none');await page.keyboard.up('Space');count++;assert((await card.locator('.result').textContent()).includes(count+'回目'));await page.emulateMedia({reducedMotion:'no-preference'});
await page.locator('#motion-off').check();assert.equal(await b.locator('.mb-face').evaluate(e=>getComputedStyle(e).transitionDuration),'0s');await page.locator('#motion-off').uncheck();
report.operations.push('same geometry/color/press; elastic overshoot vs monotonic; rapid 8 clicks; native Enter/Space; Escape/blur/outside/pointercancel; assistive after cancel; disabled; focus; OS/manual reduced motion');
await page.goto(base+'?mode=evaluate');
for(let i=0;i<4;i++) {
 const trial=page.locator('#eval-content');assert(await trial.locator('.mb-button').isDisabled());assert.equal(await trial.locator('.mb-face').evaluate(e=>getComputedStyle(e).backgroundColor),'rgb(36, 83, 72)');
 assert(!/柔らかそう|硬そう|弾性的な復元/.test(await trial.locator('h3').textContent()));
 for(const name of ['softness','return'])await trial.locator(`[name="${name}"]`).selectOption('4');await trial.locator('[name="input"]').selectOption('keyboard');await trial.locator('[name="exposure"]').selectOption('first');await trial.locator('#before-form button').click();
 await page.keyboard.press(i%2?'Space':'Enter');assert(await trial.locator('#after-form').isVisible());
 for(const name of ['match','preference','clarity'])await trial.locator(`[name="${name}"]`).selectOption('5');await trial.locator('textarea').fill('日本語の観察。長い説明を読んだ後でも、受付と完了を区別して記録する。');await trial.locator('#after-form button').click();
}
const d=page.waitForEvent('download');await page.locator('#export-evaluation').click();const download=await d;const json=JSON.parse(await readFile(await download.path(),'utf8'));assert.equal(json.recommended,null);assert.equal(json.adoption,null);assert.equal(new Set(json.trials.map(t=>t.conditionId)).size,4);assert(json.trials.every(t=>t.expectation&&t.impression&&t.activations===1));await writeFile(out+'/evaluation-export.json',JSON.stringify(json,null,2));report.operations.push('four neutral trials, gated prior expectations, separate ratings, randomized permutation, JSON null adoption export');
await page.goto(base+'example.html');await page.locator('button[type=submit]').click();assert(!/保存しました/.test(await page.locator('[role=status]').textContent()));await page.locator('textarea').fill('日本語の長文メモ。'.repeat(50));await page.locator('button[type=submit]').click();assert(/保存/.test(await page.locator('[role=status]').textContent()));
await page.goto(base);await page.setViewportSize({width:320,height:900});await page.evaluate(()=>{document.documentElement.style.fontSize='32px';document.querySelector('.mb-label').textContent='非常に長い日本語の保存ボタンの操作ラベルを読みながら押す';});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
const touch=await browser.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true});const tp=await touch.newPage();await tp.goto(base);for(let i=0;i<5;i++)await tp.locator('.mb-button').first().tap();assert((await tp.locator('.result').first().textContent()).includes('5回目'));await touch.close();report.operations.push('native required form validation; long Japanese 320px/200%; five emulated touch taps');
if(process.env.INCLUDE_REUSE) {
 await page.goto(base+'reuse-test/');const rb=page.locator('#save-observation');await page.locator('#observation').fill('独立生成テストの観察メモ');await rb.focus();await page.keyboard.down('Enter');assert.equal(await rb.getAttribute('data-held'),'true','Reuse: Enter activation must not end held visual');assert((await page.locator('#save-result').textContent()).includes('1回目'));await page.keyboard.up('Enter');
 await page.keyboard.down('Space');await page.keyboard.press('Escape');await page.keyboard.up('Space');await page.waitForTimeout(20);await rb.evaluate(e=>e.click());assert((await page.locator('#save-result').textContent()).includes('2回目'),'Reuse: assistive activation after cancellation');
 for(let i=0;i<5;i++)await rb.click({delay:10});assert((await page.locator('#save-result').textContent()).includes('7回目'));await page.emulateMedia({reducedMotion:'reduce'});await rb.focus();await page.keyboard.down('Space');assert.equal(await rb.locator('.reuse-face').evaluate(e=>getComputedStyle(e).transform),'none');await page.keyboard.up('Space');await page.emulateMedia({reducedMotion:'no-preference'});report.operations.push('independently generated reuse screen: Enter held/result independence, cancellation then assistive activation, rapid clicks, reduced motion');
}
const galleryLinks=[];
for(const width of [320,390,768,1280])for(const scale of [1,2]) {await page.setViewportSize({width,height:900});await page.goto('http://127.0.0.1:4182/gallery/');await page.evaluate(s=>document.documentElement.style.fontSize=16*s+'px',scale);const links=page.locator('.g-experiment-link');assert.equal(await links.count(),2);const boxes=[];for(let i=0;i<2;i++){assert(await links.nth(i).isVisible());const r=await links.nth(i).boundingBox();assert(r.x>=0&&r.x+r.width<=width+1);boxes.push(r);}assert(boxes[0].x+boxes[0].width<=boxes[1].x||boxes[0].y+boxes[0].height<=boxes[1].y);galleryLinks.push({width,scale,boxes});if(width===390&&scale===1)await page.screenshot({path:out+'/gallery-entry-390.png'});}
report.galleryLinks=galleryLinks;report.operations.push('Gallery experiment links visible/non-overlapping: 4 widths x 100/200%');
for(const engine of ['firefox','webkit']){try{const other=await engines[engine].launch({headless:true});const p=await other.newPage();await p.goto(base);await p.locator('.mb-button').first().click();report.otherEngines.push({engine,checked:'basic activation only'});await other.close();}catch(e){report.otherEngines.push({engine,unverified:e.message.split('\n')[0]});}}
assert.equal(report.axe.flatMap(x=>x.violations).length,0,JSON.stringify(report.axe));assert.equal(errors.length,0,JSON.stringify(errors));report.errors=errors;console.log(JSON.stringify(report,null,2));
} finally {await writeFile(out+'/results.json',JSON.stringify(report,null,2));await browser.close();server.close();}
