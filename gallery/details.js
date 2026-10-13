/* Detail chrome, usage documentation and a persistent Series dock. */
(function(){
 const $=id=>document.getElementById(id);
 const node=(tag,cls,text)=>{const el=document.createElement(tag);if(cls)el.className=cls;if(text)el.textContent=text;return el;};
 const notes=new Map();
 const displayNames={button:'ボタン','text-field':'テキスト入力',checkbox:'チェックボックス',radio:'ラジオボタン',switch:'スイッチ',select:'セレクト',slider:'スライダー',card:'カード',alert:'通知',dialog:'ダイアログ',tabs:'タブ',toast:'トースト通知',tooltip:'ツールチップ',breadcrumb:'パンくず',pagination:'ページネーション',menu:'メニュー',drawer:'ドロワー',popover:'ポップオーバー',table:'テーブル',list:'リスト',accordion:'アコーディオン',progress:'進捗表示',spinner:'処理中の表示',skeleton:'読み込みのプレースホルダー',avatar:'アバター',segmented:'分割選択',chip:'チップ',fab:'主操作ボタン'};
 function prepare(){
   document.querySelectorAll('.g-section[data-part]:not([data-part="series"])').forEach(section=>{
     const fragments=[];
     document.getElementById('series-preview').append(section);
     [...section.children].filter(el=>el.tagName==='DETAILS').forEach(details=>{
       const summary=details.querySelector(':scope > summary');
       if(summary&&/^(操作・組み込み|仕様・組み込み方)$/.test(summary.textContent.trim())){
         [...details.children].filter(el=>el!==summary).forEach(el=>fragments.push(el.cloneNode(true)));details.remove();
       }
     });notes.set(section.dataset.part,fragments);
     const stage=node('div','gd-detail-stage');
     const contents=[...section.children].filter(el=>!el.matches('h2, .g-desc, .g-source-note'));
     contents.forEach(el=>stage.append(el));
     stage.prepend(node('p','gd-stage-label','操作できる見本'));
     section.append(stage);
   });
   // Browser HTML parsing can leave generic notes outside their original section.
   // Keep one implementation entry, and put all detail chrome inside main.
   document.querySelectorAll('details').forEach(details=>{const summary=details.querySelector(':scope > summary');if(summary&&/^(操作・組み込み|仕様・組み込み方)$/.test(summary.textContent.trim()))details.remove();});
   const inspection=document.querySelector('.g-inspect-details');$('top').append(inspection);
   for(const id of ['view-library','view-tokens'])$('top').append($(id));
   document.querySelectorAll('.g-index-top').forEach(el=>[...el.childNodes].filter(n=>n.nodeType===3).forEach(n=>n.remove()));
   document.querySelectorAll('.g-block > h3').forEach(el=>{if(el.textContent.trim()==='In Context')el.textContent='使用例';});
   const dock=$('series-tools');$('top').append(dock);
   dock.querySelector('label').textContent='見本のSeries';
   $('series-prev').textContent='‹';$('series-next').textContent='›';
   const panel=$('component-code');panel.querySelector('summary').textContent='操作・組み込み';
   const implementation=node('div','gd-implementation-notes');implementation.id='component-implementation-notes';$('code-context').after(implementation);
   const usage=node('section','gd-usage');usage.id='component-usage';usage.hidden=true;
   const title=node('h2','','使いどころと選び方');title.id='component-usage-title';title.tabIndex=-1;usage.setAttribute('aria-labelledby',title.id);
   usage.append(title,node('div','gd-usage-body'));document.querySelector('.g-inspect-details').before(usage);
   const actions=node('div','gd-detail-actions');actions.hidden=true;actions.id='detail-actions';
   [['使いどころ','component-usage'],['コード・組み込み','component-code']].forEach(([label,id])=>{
     const b=node('button','g-tool-button',label);b.type='button';b.addEventListener('click',()=>{const target=$(id);if(target.tagName==='DETAILS')target.open=true;target.scrollIntoView({block:'start',behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'});if(id==='component-usage')title.focus({preventScroll:true});else target.querySelector('summary').focus({preventScroll:true});});actions.append(b);
   });$('pagehead').append(actions);
   const measure=new ResizeObserver(()=>{document.documentElement.style.setProperty('--gd-dock-height',Math.ceil(dock.getBoundingClientRect().height)+'px');});measure.observe(dock);
   const header=new ResizeObserver(()=>document.documentElement.style.setProperty('--gd-header-height',Math.ceil(document.querySelector('.g-toolbar').getBoundingClientRect().height)+'px'));header.observe(document.querySelector('.g-toolbar'));
 }
 function update(){
   const onPart=document.body.dataset.shell==='part';const section=onPart&&document.querySelector('.g-section[data-part]:not([hidden]):not([data-part="series"])');
   $('detail-actions').hidden=!section;$('component-usage').hidden=!section;
   const dock=$('series-tools');if(dock.parentElement!==$('top'))$('top').append(dock);
   if(!section)return;
   const id=section.dataset.part;if(displayNames[id])$('page-title').textContent=displayNames[id];const note=window.ANDM_USAGE.entries[id];
   const body=$('component-usage').querySelector('.gd-usage-body');
   if(note&&body.dataset.part!==id){
     body.replaceChildren();body.dataset.part=id;
     const grid=node('div','gd-usage-grid');
     [['使う場面',note.when],['別のUIを検討する場面',note.alternative]].forEach(([label,text])=>{const column=node('div');column.append(node('h3','',label),node('p','',text));grid.append(column);});body.append(grid);
     const literature=node('details','gd-usage-sources');literature.append(node('summary','','参考文献・整理の範囲'));
     literature.append(node('p','','以下の資料の用途・構造・操作原則をもとに、andmでの使い分けを整理しています。各Seriesの公式仕様の再現を示すものではありません。'));
     const list=node('ul');note.sources.forEach(key=>{const source=window.ANDM_USAGE.sources[key];const li=node('li');const a=node('a','',source[0]+' ↗');a.href=source[1];a.target='_blank';a.rel='noopener noreferrer';li.append(a);list.append(li);});literature.append(list);body.append(literature);
   }
   if(note)$('page-lead').textContent=note.when;
   const implementation=$('component-implementation-notes');implementation.replaceChildren();
   const seen=new Set();(notes.get(id)||[]).forEach(original=>{const clone=original.cloneNode(true);if(clone.tagName==='A'){if(seen.has(clone.href))return;seen.add(clone.href);}implementation.append(clone);});
   if(!implementation.children.length){const p=node('p','','見本の操作はアプリ側で接続します。通信・保存・業務上の判断はこのHTMLには含まれません。');implementation.append(p);}
 }
 prepare();window.addEventListener('hashchange',update);window.addEventListener('andm:viewchange',update);
 const ready=new MutationObserver(update);ready.observe($('nav-series'),{childList:true});update();
 window.ANDM_DETAILS={update};
})();
