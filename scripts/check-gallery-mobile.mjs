/* Real Chromium regression and responsive/touch QA; no production side effects. */
import {createServer} from 'node:http';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {resolve,extname} from 'node:path';
import assert from 'node:assert/strict';
const {chromium}=await import(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=fileURLToPath(new URL('../',import.meta.url));
const out=process.env.QA_OUTPUT||'/tmp/andm-mobile-qa';await mkdir(out,{recursive:true});
const server=createServer(async(req,res)=>{try{let path=decodeURIComponent(req.url.split('?')[0]);if(path.endsWith('/'))path+='index.html';const file=resolve(root,'.'+path);if(!file.startsWith(root))throw Error('path');res.setHeader('Content-Type',({'.html':'text/html;charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.md':'text/plain;charset=utf-8'})[extname(file)]||'application/octet-stream');res.end(await readFile(file));}catch{res.writeHead(404);res.end();}});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base='http://127.0.0.1:'+server.address().port+'/gallery/';
const browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE_PATH,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--disable-gpu']});
const report={browser:await browser.version(),matrix:[],operations:[],errors:[],overflow:[],screenshots:[]};
try{
 const context=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:1});
 const page=await context.newPage();page.on('pageerror',e=>report.errors.push(e.message));
 await page.goto(base);await page.waitForSelector('#component-grid > article');
 const routes=await page.locator('.g-nav [data-part-nav]').evaluateAll(es=>[...new Map(es.map(e=>[e.dataset.partNav,{id:e.dataset.partNav,href:e.getAttribute('href')}])).values()]);assert.equal(routes.length,96);
 await page.locator('#nav-toggle').tap();assert(await page.locator('body').getAttribute('data-nav-open')!==null);
 await page.getByText('用途から絞り込む',{exact:true}).click();
 await page.locator('.g-purpose-option[data-category="ナビゲーション"]').tap();assert.equal(await page.locator('body').getAttribute('data-nav-open'),null);
 await page.locator('#series-select').selectOption('carbon');
 await page.locator('[data-catalog-id="header-nav"] .gd-card-link').tap();await page.waitForFunction(()=>document.body.dataset.shell==='part');
 assert.equal(await page.locator('#series-select').inputValue(),'carbon','home selection carries into details');
 report.operations.push('mobile menu → purpose selection closes menu → home Series persists into details');
 await page.locator('#series-next').tap();await page.locator('#series-prev').tap();assert.equal(await page.locator('#series-select').inputValue(),'carbon');
 await page.goto(base+'#/controls/text-field');await page.waitForFunction(()=>document.body.dataset.view==='controls');
 const input=page.locator('[data-part="text-field"] input').first();await input.fill('入力を保持します');
 await page.locator('#series-select').selectOption('expressive');assert.equal(await input.inputValue(),'入力を保持します');
 const before=await page.evaluate(()=>window.scrollY);await page.locator('#series-next').tap();assert.equal(await input.inputValue(),'入力を保持します');assert(Math.abs(await page.evaluate(()=>window.scrollY)-before)<2,'Series switching does not reset scroll');
 report.operations.push('bottom prev/next & select; input and scroll retention');
 await page.getByRole('button',{name:'使いどころ',exact:true}).tap();await page.waitForFunction(()=>{const r=document.getElementById('component-usage-title').getBoundingClientRect(),header=document.querySelector('.g-toolbar').getBoundingClientRect(),dock=document.getElementById('series-tools').getBoundingClientRect();return r.top>=header.bottom&&r.bottom<dock.top;});
 assert(await page.locator('#component-usage').isVisible());
 await page.getByRole('button',{name:'コード・組み込み',exact:true}).tap();assert(await page.locator('#component-code').getAttribute('open')!==null);

 assert.equal(await page.locator('summary').filter({hasText:/^操作・組み込み$/}).filter({visible:true}).count(),1);
 report.operations.push('usage jump; one implementation disclosure; source links and code panel');
 await page.goto(base+'#/overlays/dialog');await page.waitForSelector('[data-part="dialog"] [data-dialog-open]');
 await page.locator('[data-part="dialog"] [data-dialog-open]').tap();await page.waitForFunction(()=>document.querySelector('[data-part="dialog"] dialog').open);
 await page.locator('[data-part="dialog"] dialog [data-dialog-close]').first().tap();await page.waitForFunction(()=>!document.querySelector('[data-part="dialog"] dialog').open);
 assert(await page.locator('[data-part="dialog"] [data-dialog-open]').evaluate(e=>e===document.activeElement));report.operations.push('native dialog opens, cancels and restores focus');
 await page.goto(base+'#/display/data-table');await page.waitForSelector('#cc-table tbody tr');await page.locator('#cc-table [data-search]').fill('プロジェクト 01');
 await page.waitForFunction(()=>document.querySelectorAll('#cc-table tbody tr').length===1);report.operations.push('data table behavior remains connected after detail normalization');
 for(const width of [320,390,768,1280]){
   await page.setViewportSize({width,height:width===1280?900:844});
   await page.goto(base);await page.waitForSelector('#component-grid > article');
   for(const route of routes){
     await page.evaluate(hash=>location.hash=hash,route.href);await page.waitForFunction(id=>document.querySelector('.g-section[data-part="'+id+'"]:not([hidden])'),route.id);
     for(const series of (width===390?['baseline','expressive','dads','carbon']:['baseline'])){
       await page.locator('#series-select').selectOption(series);
       const measurements=await page.evaluate(()=>{const dock=document.querySelector('#series-tools').getBoundingClientRect();return {page:document.documentElement.scrollWidth,viewport:innerWidth,dock:{left:dock.left,right:dock.right,bottom:dock.bottom,top:dock.top},sampleCount:document.querySelector('.g-section[data-part]:not([hidden]):not([data-part=series]) .gd-detail-stage')?.querySelectorAll('[class*="andm-"]').length||0,usage:!!document.querySelector('#component-usage a'),summaries:[...document.querySelectorAll('summary')].filter(s=>s.textContent.trim()==='操作・組み込み'&&s.getBoundingClientRect().height>0).length};});
       const item={id:route.id,width,series,...measurements};report.matrix.push(item);
       if(measurements.page>width+1||measurements.dock.right>width+1||measurements.dock.left<0||measurements.summaries!==1||!measurements.usage||!measurements.sampleCount)report.overflow.push(item);
     }
   }
 }
 for(const [width,hash,name] of [[390,'#/','home-mobile'],[390,'#/navigation/header-nav','header-mobile'],[390,'#/navigation/bottom-nav','bottom-mobile'],[390,'#/controls/text-field','input-mobile'],[1280,'#/navigation/side-nav','side-desktop']]){
   await page.setViewportSize({width,height:900});await page.goto(base+hash);await page.waitForSelector('#series-select option',{state:'attached'});await page.locator('#series-select').selectOption('baseline');await page.screenshot({path:out+'/'+name+'.png'});report.screenshots.push(name+'.png');
 }
 // All Series on representative mobile navigation and inputs.
 await page.setViewportSize({width:390,height:844});await page.goto(base+'#/controls/text-field');await page.waitForSelector('#series-select option',{state:'attached'});
 const allSeries=await page.locator('#series-select option').evaluateAll(es=>es.map(e=>e.value));assert.equal(allSeries.length,14);
 report.seriesMatrix=[];
 for(const hash of ['#/controls/button','#/controls/text-field','#/navigation/header-nav','#/navigation/side-nav','#/navigation/bottom-nav','#/overlays/dialog']){
   await page.evaluate(hash=>location.hash=hash,hash);
   for(const id of allSeries){await page.locator('#series-select').selectOption(id);const width=await page.evaluate(()=>document.documentElement.scrollWidth);report.seriesMatrix.push({hash,series:id,width});assert(width<=390,'Series mobile reflow: '+hash+' '+id);}
 }
 const desktop=await browser.newContext({viewport:{width:1280,height:900},isMobile:false,hasTouch:false});const dp=await desktop.newPage();dp.on('pageerror',e=>report.errors.push(e.message));await dp.goto(base);await dp.waitForSelector('#component-grid > article');
 const cards=dp.locator('#component-grid > article'),nextBefore=await cards.nth(1).boundingBox();await cards.first().hover();assert(await cards.first().locator('details').getAttribute('open')!==null);
 const nextAfter=await cards.nth(1).boundingBox();assert(Math.abs(nextBefore.y-nextAfter.y)<1&&Math.abs(nextBefore.height-nextAfter.height)<1,'hover does not move other cards');
 await cards.first().locator('.gd-card-link').press('Tab');assert(await cards.first().locator('details').getAttribute('open')!==null);await cards.first().locator('summary').press('Escape');assert.equal(await cards.first().locator('details').getAttribute('open'),null);report.operations.push('desktop hover & keyboard preview, stable card layout and Escape');await desktop.close();
 // 200% root text size. Verify chrome reflow and local table scrolling separately.
 await page.setViewportSize({width:390,height:844});await page.goto(base+'#/controls/text-field');await page.waitForSelector('#component-usage');
 await page.evaluate(()=>document.documentElement.style.fontSize='32px');
 const zoom=await page.evaluate(()=>({page:document.documentElement.scrollWidth,width:innerWidth,dock:document.querySelector('#series-tools').getBoundingClientRect().toJSON()}));report.zoom=zoom;
 await page.screenshot({path:out+'/input-mobile-200.png'});
 assert.equal(report.errors.length,0,'JS errors');
 await writeFile(out+'/results.json',JSON.stringify(report,null,2));
 console.log(JSON.stringify({cases:report.matrix.length,seriesCases:report.seriesMatrix.length,overflows:report.overflow.length,errors:report.errors,zoom,output:out}));
 assert.equal(report.overflow.length,0,'layout or detail coverage failures; see results.json');assert(zoom.page<=zoom.width+1,'200% reflow');
}catch(error){console.log('QA failed:',error.message);console.log(JSON.stringify(report.errors));await writeFile(out+'/failure.json',JSON.stringify({error:error.message,report},null,2));const tabs=browser.contexts().flatMap(c=>c.pages());if(tabs[0]){console.log(await tabs[0].url());await tabs[0].screenshot({path:out+'/failure.png'});}throw error;}finally{await browser.close();server.close();}
