/* Shared Gallery routes for existing compositions and independent experiments. */
(()=>{
 'use strict';
 const entries=[
  {id:'construction-reveal',title:'UIが組み上がる',evidence:'#/library/construction-reveal',path:'lab/construction-reveal/',use:'点と輪郭、ワイヤーフレーム、スケルトンから、触れるUIへ。'},
  {id:'m3',title:'M3 · 動きの見本',path:'m3/',use:'形の変化、強調、押下の反応を比べる。'},
  {id:'apple-liquid-glass',title:'Apple · Liquid Glass',path:'lab/apple-liquid-glass/',use:'背景、光、透過の関係を操作して確かめる。'},
  {id:'spacing',title:'余白・モーダル比較',path:'spacing/',use:'情報の群化と、モーダルの配置を比べる。'},
  {id:'materiality-behavior',title:'質感と復元',path:'lab/materiality-behavior/',use:'質感と動きの性格を分けて試す。'},
  {id:'philosophy-poc',title:'世界観と設計思想',path:'lab/philosophy-poc/',use:'目的・設計思想・Series・画面構成の関係を検討する。'},
  {id:'state-expression',title:'状態の伝え方',path:'lab/state-expression/',use:'操作と状態の変化を、異なる表現で比較する。'},
  {id:'waveform-expression',title:'波形と状態表現',path:'lab/waveform-expression/',use:'装飾・入力への反応・状態・データの違いを確かめる。'}
 ];
 const screens={settings:{title:'設定・入力を完了する',use:'入力・選択・保存の流れと、エラー・処理中の状態を確認する。',parts:['form-field','switch','form-actions']},search:{title:'検索して比較する',use:'検索・絞り込み・並べ替え・ページ移動をつなげて試す。',parts:['search-form','filter-bar','data-table']},detail:{title:'詳細を読み、操作する',use:'現在地・内容・補助操作を一つの画面で確かめる。',parts:['breadcrumb','resource-item','toolbar']}};
 const $=id=>document.getElementById(id);
 let panel,frame,key='',resize,raf=0;
 function make(tag,cls,text){const e=document.createElement(tag);if(cls)e.className=cls;if(text)e.textContent=text;return e;}
 function hide(){if(panel)panel.hidden=true;document.body.removeAttribute('data-portal-kind');}
 function syncSeries(){if(!frame?.contentDocument||!key.startsWith('screens/'))return;const doc=frame.contentDocument,select=doc.getElementById('screen-series'),scope=doc.getElementById('screen-content');const id=$('series-select').value||'baseline';if(select){select.value=id==='baseline'?'':id;if(!select.value&&id!=='baseline')select.value=id;}if(scope){[...scope.classList].filter(c=>c.startsWith('andm-series--')).forEach(c=>scope.classList.remove(c));if(id!=='baseline')scope.classList.add('andm-series--'+id);}fit();}
 function fit(){cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{if(!frame?.contentDocument)return;const doc=frame.contentDocument;if(!doc.body)return;frame.style.height=Math.ceil(Math.max(doc.body.scrollHeight,doc.documentElement.scrollHeight,400))+'px';});}
 function loaded(){
  const doc=frame.contentDocument;if(!doc)return;
  const css=doc.createElement('style');css.textContent='html,body{min-width:0!important;overflow-x:clip}body{margin:0!important;padding:12px!important}body>header h1,body>header>a[href*="gallery"],.completion-chrome{display:none!important}main{max-width:100%!important;margin-inline:auto!important}*{box-sizing:border-box}img,canvas,video{max-width:100%}';doc.head.append(css);if(key.startsWith('screens/')){const layout=doc.createElement('style');layout.textContent='body{background:#fff!important}main{padding:0!important;gap:20px!important}.completion-card{background:white!important;border:1px solid #e1e7e3!important;border-radius:12px!important;padding:20px!important;margin:0!important}.completion-card>h2{font:600 16px/1.5 system-ui,sans-serif!important;color:#30473a!important;margin:0 0 16px!important}';doc.head.append(layout);}
  doc.querySelectorAll('a').forEach(a=>{const url=new URL(a.href);if(url.origin!==location.origin)return;const root=new URL('.',location.href);if(url.pathname===root.pathname||url.pathname===root.pathname+'index.html'){a.addEventListener('click',e=>{e.preventDefault();location.hash=url.hash||'#/';});return;}const target=entries.find(e=>url.pathname===root.pathname+e.path||url.pathname===root.pathname+e.path+'index.html');if(target)a.addEventListener('click',event=>{event.preventDefault();location.hash='#/labs/'+target.id;});});
  if(resize)resize.disconnect();resize=new ResizeObserver(fit);resize.observe(doc.body);
  doc.addEventListener('input',fit);doc.addEventListener('toggle',fit,true);doc.fonts?.ready.then(fit);syncSeries();fit();
  $('portal-loading').hidden=true;frame.hidden=false;
 }
 function show(route){
  if(!panel){panel=make('section','gd-portal');panel.id='gallery-portal';$('top').append(panel);}
  panel.hidden=false;document.body.dataset.portalKind=route.kind;
  const entry=route.kind==='screens'?screens[route.id]:entries.find(e=>e.id===route.id);
  $('page-status').textContent='';$('page-title').textContent=entry.title;$('page-kicker').textContent=route.kind==='screens'?'画面・構成':'実験室';$('page-lead').textContent=entry.use;
  const current=route.kind+'/'+route.id;if(current===key){syncSeries();return;}key=current;
  if(resize)resize.disconnect();panel.replaceChildren();
  const back=make('a','gd-portal-back',route.kind==='screens'?'← 画面構成の一覧':'← 実験室の一覧');back.href='#/catalog/'+(route.kind==='screens'?'screens':'labs');panel.append(back);
  const hint=make('p','gd-portal-note',route.kind==='screens'?'共通の部品を組み合わせた操作見本です。下部のSeries切り替えで、入力を保ったまま比較できます。':'andmの独立した実験です。画面内の設定で表現を比べられます。公式ライブラリの完成品やCoreの採用仕様を意味しません。');panel.append(hint);
  const stage=make('div','gd-portal-stage');const loading=make('p','','見本を読み込んでいます…');loading.id='portal-loading';stage.append(loading);
  frame=make('iframe','gd-portal-frame');frame.title=entry.title+'：操作できる見本';frame.hidden=true;frame.addEventListener('load',loaded);const source=route.kind==='screens'?'completion/?screen='+route.id+'&series='+encodeURIComponent($('series-select').value):entry.path;frame.src=source;stage.append(frame);panel.append(stage);
  if(route.kind==='screens'){const related=make('div','gd-related');related.append(make('h2','','構成している部品'));entry.parts.forEach(id=>{const source=document.querySelector('[data-part-nav="'+id+'"]');if(source){const a=make('a','',source.textContent.trim()+' →');a.href=source.getAttribute('href');related.append(a);}});panel.append(related);}
  const implementation=make('details','gd-portal-resources');implementation.append(make('summary','','実装・利用条件・出典'));const p=make('p','','見本の通信・保存は模擬動作です。コードはandm-uiの実装で、既存リポジトリの利用条件（UNLICENSED）を確認してください。');implementation.append(p);
  const code=make('a','','この見本の実装コード ↗');code.href='https://github.com/atsushi316/andm-ui/tree/feature/gallery-discovery-hover-preview/gallery/'+(route.kind==='screens'?'completion':entry.path.replace(/\/$/,''));code.target='_blank';code.rel='noopener noreferrer';implementation.append(code);
  const evidence=make('a','','設計の根拠・確認範囲 →');evidence.href=route.kind==='screens'?'#/library/composition-sources':entry.evidence||'#/library/source-first';implementation.append(evidence);panel.append(implementation);
 }
 window.ANDM_PORTAL={entries,has:(kind,id)=>kind==='screens'?!!screens[id]:entries.some(e=>e.id===id),show,hide,syncSeries};
 document.addEventListener('change',e=>{if(e.target.id==='series-select')syncSeries();});
})();
