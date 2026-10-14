/* Gallery-only catalog. Specimens come from existing DOM + dist/style.css. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const node = (tag, cls, text) => { const el = document.createElement(tag); if (cls) el.className = cls; if (text) el.textContent = text; return el; };
  const modes = {parts:'コンポーネント',screens:'画面構成',series:'デザインの比較',motion:'動きと反応',knowledge:'文献・設計資料',labs:'実験室'};
  const leads = {parts:'用途から探して、実物の見本を確かめる。',screens:'パーツを組み合わせたときの配置と流れを見る。',series:'同じ部品で、形・密度・文字・反応の違いを比べる。',motion:'操作への反応と、動きが伝える意味を確かめる。',knowledge:'設計の判断に使う、出典・原則・確認範囲。',labs:'質感・状態・世界観を操作して確かめる。'};
  const screens = [
    {id:'settings',title:'設定・入力を完了する',use:'値を入力し、選択して保存する。エラーや処理中の状態も確認。',parts:['header-nav','form-field','switch','form-actions'],group:'入力・操作'},
    {id:'search',title:'検索して比較する',use:'検索・絞り込みから一覧、並べ替え、ページ移動へ。',parts:['search-form','filter-bar','table','pagination'],group:'面・情報表示'},
    {id:'detail',title:'詳細を読み、操作する',use:'現在地、内容、補助操作をひとつの画面に組み合わせる。',parts:['breadcrumb','resource-item','toolbar'],group:'ナビゲーション'}
  ];
  const knowledge = [
    {id:'philosophy',title:'世界観と設計思想を比べる',use:'Intent・Philosophy・Series・Compositionを分けて考える。既存の思想Labと判断記録へ。',mark:'設計思想',href:'#/labs/philosophy-poc'},
    {id:'catalog',title:'Design Knowledgeの記録',use:'美学、技法、構成、意図、制約、代案、判断、検証の23件。設計時に参照するJSON資料。',mark:'設計の軸',href:'#/library/design-philosophies'},
    {id:'source-first',title:'出典優先の設計',use:'公式仕様 → 同じ体系から導出 → 文献で補完。判断の順序を確認。',mark:'原則'},
    {id:'source-reaudit',title:'仕様と根拠を確認する',use:'プロパティごとの確認済み・未確認を読み、採用の範囲を見極める。',mark:'根拠'},
    {id:'component-coverage',title:'他体系との機能比較',use:'実装済みの部品と不足、操作の対応範囲を確認。',mark:'機能一覧'},
    {id:'academic',title:'認知・群化・視覚的階層',use:'余白の関係や知覚の原則を調べる。研究の数値を自動でTokenにしない。',mark:'認知と知覚'},
    {id:'design-systems',title:'公式デザインシステム',use:'各Seriesの出典へ。版・対象・取得状態を区別して読む。',mark:'公式資料'},
    {id:'standards',title:'操作とアクセシビリティ',use:'Native HTML、キーボード、ARIA、状態の契約を確認。',mark:'操作の基準'}
  ];
  let branchId=0;
  let mode = 'parts', size = '', origin = '', activeRoute = '', context, mounted = false;
  const selector = {
    button:'#button-isolated .g-row',dialog:'dialog',drawer:'dialog',tooltip:'.andm-tooltip',popover:'.andm-popover',
    'search-form':'.andm-search','form-field':'.andm-field','form-actions':'.andm-form-actions','filter-bar':'.andm-filter-bar',
    'header-nav':'.andm-header-nav','side-nav':'.andm-side-nav','bottom-nav':'.andm-bottom-nav',table:'.andm-table',menu:'.andm-menu'
  };
  function sample(id) {
    const section = document.querySelector('[data-part="'+id+'"]');
    if (!section) return null;
    return section.querySelector(selector[id] || '.cc-sample') || section.querySelector('.g-row, .g-stack, .g-compare') || section.querySelector('[class*="andm-"]');
  }
  function cloneSample(id) {
    const original = sample(id); if (!original) return node('p','','詳細ページで見本を確認できます。');
    const clone = original.cloneNode(true);
    [clone,...clone.querySelectorAll('*')].forEach(el => {
      [...el.attributes].forEach(attr => { if (attr.name.startsWith('data-') || ['id','name','for','autofocus','aria-controls','aria-labelledby','aria-describedby','popover'].includes(attr.name)) el.removeAttribute(attr.name); });
      if (el.tagName === 'DIALOG') el.setAttribute('open','');
      if (el.matches('.andm-tooltip__bubble, .andm-popover__panel, .andm-menu')) el.removeAttribute('hidden');
    });
    return clone;
  }
  function backdrop() {
    const content=node('div','gd-scene-content');
    content.append(node('div','gd-scene-kicker','PROJECT / OVERVIEW'),node('h4','','プロジェクトの概要'));
    const bars=node('div','gd-scene-lines');bars.append(node('i'),node('i'),node('i'));content.append(bars);
    const tiles=node('div','gd-scene-tiles');tiles.append(node('i'),node('i'),node('i'));content.append(tiles);return content;
  }
  function scene(ids) {
    const nav=ids.length===1&&['header-nav','side-nav','bottom-nav'].includes(ids[0]);
    if(!nav&&ids.length===1)return cloneSample(ids[0]);
    const shell=node('div','gd-scene'+(ids[0]==='bottom-nav'?' gd-scene-phone':''));
    if(nav) {
      shell.dataset.placement=ids[0];
      if(ids[0]==='header-nav')shell.append(cloneSample(ids[0]),backdrop());
      if(ids[0]==='side-nav'){const row=node('div','gd-scene-row');row.append(cloneSample(ids[0]),backdrop());shell.append(row);}
      if(ids[0]==='bottom-nav')shell.append(backdrop(),cloneSample(ids[0]));
    } else {
      shell.classList.add('gd-scene-composition');
      ids.forEach(id=>{const zone=node('div','gd-scene-zone');zone.append(cloneSample(id));shell.append(zone);});
    }
    return shell;
  }
  const fit = new ResizeObserver(entries => entries.forEach(({target}) => {
    const frame=target.parentElement;if(!frame||!frame.clientWidth)return;
    const width=Number(target.dataset.stageWidth)||400;
    const scale=Math.min(1,frame.clientWidth/width);
    target.style.transform='scale('+scale+')';
  }));
  function specimen(ids, series, fixed) {
    const frame=node('div','gd-specimen');frame.inert=true;frame.setAttribute('aria-hidden','true');
    const structural=ids.length>1||['header-nav','side-nav','bottom-nav'].includes(ids[0]);
    if(structural)frame.classList.add('gd-specimen-structure');
    const inner=node('div','gd-specimen-inner');inner.dataset.stageWidth=structural?520:400;inner.style.width=inner.dataset.stageWidth+'px';
    inner.dataset.gdSeries=fixed?'fixed':'selected';inner.dataset.series=series;
    if(series!=='baseline')inner.classList.add('andm-series--'+series);
    inner.append(scene(ids));frame.append(inner);fit.observe(inner);return frame;
  }
  function applyScopes() {
    const selected=$('series-select').value || 'baseline';
    const other=$('gd-compare-series').value || 'carbon';
    document.querySelectorAll('[data-gd-series]').forEach(el=>{
      const id=el.dataset.gdSeries==='fixed'?el.dataset.series:el.dataset.gdSeries==='comparison'?other:selected;
      [...el.classList].filter(c=>c.startsWith('andm-series--')).forEach(c=>el.classList.remove(c));
      if(id!=='baseline') el.classList.add('andm-series--'+id);
    });
    document.querySelectorAll('[data-screen-id]').forEach(el=>{el.href='#/screens/'+el.dataset.screenId;});
    document.querySelectorAll('[data-gd-label]').forEach(el=>{const id=el.dataset.gdLabel==='comparison'?other:selected;el.textContent=(window.ANDM_SERIES_COPY.labels[id]||id)+' · 実装見本';});
  }
  function installNavigationStages() {
    ['header-nav','side-nav','bottom-nav'].forEach(id=>{
      const section=document.querySelector('[data-part="'+id+'"]');
      const nav=section&&section.querySelector(selector[id]);if(!nav||nav.closest('.gd-navigation-demo'))return;
      const frame=node('div','gd-navigation-demo');frame.dataset.placement=id;
      const parent=nav.parentElement;
      if(id==='side-nav'){const row=node('div','gd-navigation-row');parent.replaceChild(frame,nav);row.append(nav,backdrop());frame.append(row);}
      else {parent.replaceChild(frame,nav);if(id==='header-nav')frame.append(nav,backdrop());else frame.append(backdrop(),nav);}
    });
  }
  function modeIcon(id) {
    const paths={parts:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 10h18M10 10v11"/>',screens:'<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 8h18M8 8v13"/>',series:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18"/>',motion:'<path d="M4 18c0-6 6 0 6-6s7 0 7-7M15 3h6v6"/>',knowledge:'<path d="M3 5c4-2 7-1 9 1 2-2 5-3 9-1v14c-4-2-7-1-9 1-2-2-5-3-9-1V5zM12 6v14"/>'};
    const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.classList.add('gd-mode-icon');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('fill','none');svg.setAttribute('stroke','currentColor');svg.setAttribute('stroke-width','1.5');svg.setAttribute('stroke-linecap','round');svg.setAttribute('stroke-linejoin','round');svg.setAttribute('aria-hidden','true');svg.innerHTML=paths[id]||paths.motion;return svg;
  }
  const small = new Set('button text-field checkbox radio switch select slider segmented chip fab text icon icon-button label helper-text error-text required-marker link status code kbd image file-input native-input avatar badge divider spinner progress skeleton surface removable-tag meter'.split(' '));
  const tier = id => small.has(id) ? 'small' : 'pattern';
  const sizes = {small:'小さなパーツ',pattern:'用途のある部品'};
  const originals = id => window.ANDM_SERIES_COPY.meta[id]?.sourceKind === 'andm';
  function setMode(id, filter = '') {
    mode=id;size=id==='parts'?filter:'';origin=id==='series'?filter:'';
    location.hash='#/catalog/'+id+(filter?'/'+filter:'');
    $('component-category').value='';
    $('component-category').dispatchEvent(new Event('change',{bubbles:true}));
    document.body.removeAttribute('data-nav-open');$('nav-toggle').setAttribute('aria-expanded','false');
    refresh();
  }
  function branch(label, parent) { const d=node('details','gd-menu-branch');d.dataset.branchId=String(++branchId);d.setAttribute('name',parent.classList.contains('gd-sidebar-primary')?'gd-library-roots':'gd-library-'+parent.dataset.branchId);d.append(node('summary','',label));parent.append(d);d.addEventListener('toggle',()=>{if(d.open)[...parent.children].filter(e=>e!==d&&e.matches('details.gd-menu-branch')).forEach(e=>e.open=false);});return d; }
  function menuButton(label, id, filter, parent) { const b=node('button','gd-menu-leaf',label);b.type='button';b.dataset.mode=id;b.dataset.filter=filter||'';b.addEventListener('click',()=>setMode(id,filter));parent.append(b);return b; }
  function menuLink(label, href, parent) {const a=node('a','gd-menu-leaf',label);a.href=href;parent.append(a);return a;}
  function mount() {
    if(mounted)return;mounted=true;installNavigationStages();
    const nav=$('gallery-nav');
    const index=node('details','gd-all-index');index.append(node('summary','','すべての項目'));
    [...nav.children].forEach(child=>{if(child.classList.contains('g-nav__group'))index.append(child);});
    const sidebar=node('div','gd-sidebar-primary');sidebar.append(node('p','gd-sidebar-heading','ライブラリ'));
    const components=branch('コンポーネント',sidebar);components.open=!location.hash||location.hash==='#/'||location.hash.startsWith('#/catalog/parts');
    menuButton('すべてのコンポーネント','parts','',components);
    Object.entries(sizes).forEach(([key,label])=>{const level=branch(label,components);menuButton(label+'をすべて見る','parts',key,level);
      const entries=context.entries.filter(e=>tier(e.id)===key);
      [...new Set(entries.map(e=>e.group))].forEach(group=>{const g=branch(group,level);entries.filter(e=>e.group===group).forEach(e=>{
        const a=document.querySelector('[data-part-nav="'+e.id+'"]');if(a)g.append(a);else menuLink(e.title,e.href,g);
      });});
    });
    const compositions=branch('画面・構成',sidebar);menuButton('画面構成をすべて見る','screens','',compositions);
    screens.forEach(e=>menuLink(e.title,'#/screens/'+e.id,compositions));
    const comparisons=branch('デザインの比較',sidebar);menuButton('すべてのSeries','series','',comparisons);
    [['original','andmオリジナル'],['referenced','公式資料を参照したSeries']].forEach(([key,label])=>{const g=branch(label,comparisons);menuButton(label+'を比較','series',key,g);[...$('series-select').options].filter(o=>originals(o.value)===(key==='original')).forEach(o=>menuLink(o.textContent,'#/series/'+o.value,g));});
    const motions=branch('動きと反応',sidebar);menuButton('動きの一覧','motion','',motions);menuLink('Motion Tokens','#/tokens/motion',motions);menuLink('M3 · 動きの見本','#/labs/m3',motions);
    const resources=branch('文献・設計資料',sidebar);menuButton('資料の一覧','knowledge','',resources);
    menuLink('文献ライブラリの読み方','#/library',resources);
    const shelves=[
      ['使いどころ・操作',[['component-usage','部品の用途・使い分け'],['standards','アクセシビリティ・操作の標準'],['component-coverage','実装済み機能と不足'],['atomic-inventory','小さなパーツの整備範囲']]],
      ['設計の原則・判断',[['source-first','出典優先の設計'],['design-philosophies','目的・世界観・設計思想'],['source-decisions','採用した設計判断'],['gallery-review','Galleryの改善根拠']]],
      ['部品の仕様・根拠',[['atomic-sources','小さなパーツ・文字'],['composition-sources','フォーム・ナビ等の組み合わせ'],['component-sources','Chip・FAB'],['component-audit','部品の概念との照合'],['source-reaudit','全パーツの確認済み・未確認']]],
      ['Seriesの公式仕様',[['design-systems','公式デザインシステムの索引'],['analysis-m3-expressive','M3 Expressive'],['analysis-dads','DADS'],['analysis-apple-hig','Apple HIG'],['analysis-spectrum','Spectrum 2'],['analysis-fluent','Fluent 2'],['analysis-carbon','Carbon'],['analysis-atlassian','Atlassian'],['analysis-uswds','USWDS']]],
      ['研究・書籍',[['academic','知覚・認知・情報探索'],['books','設計・HCIの書籍'],['waveform','波形・動きの一次資料']]]
    ];
    shelves.forEach(([label,items])=>{const g=branch(label,resources);items.forEach(([id,title])=>{const original=index.querySelector('[data-library-nav="'+id+'"]');const a=original||menuLink(title,'#/library/'+id,g);a.textContent=title;a.dataset.libraryNav=id;if(original)g.append(a);});});

    const foundations=branch('基礎・トークン',sidebar);index.querySelectorAll('[data-token-nav]').forEach(a=>foundations.append(a));
    const extras=branch('実験室',sidebar);menuButton('実験室をすべて見る','labs','',extras);
    window.ANDM_PORTAL.entries.forEach(e=>menuLink(e.title,'#/labs/'+e.id,extras));
    const shortcuts=document.querySelector('.g-lab-shortcuts');if(shortcuts)shortcuts.remove();
    nav.prepend(sidebar);const purposes=$('purpose-filters');if(purposes){const tasks=branch('用途から絞り込む',components);tasks.append(purposes);}
    index.hidden=true;nav.append(index);
    const footer=node('div','gd-sidebar-footer');footer.innerHTML='<a href="https://github.com/atsushi316/andm-ui" target="_blank" rel="noopener noreferrer">GitHub ↗</a><span>目的に合うUIをつくる。</span>';nav.append(footer);
    const region=node('header','gd-intro');region.innerHTML='<div><p class="gd-eyebrow">andm-ui / Library</p><h1 id="gd-catalog-title">コンポーネント</h1><p id="gd-catalog-lead"></p></div>';
    const mobileNav=node('nav','gd-catalog-nav');mobileNav.setAttribute('aria-label','カタログの種類');
    Object.entries(modes).forEach(([id,label])=>{const b=node('button','',label);b.type='button';b.dataset.mode=id;b.addEventListener('click',()=>setMode(id));mobileNav.append(b);});
    const tools=node('div','gd-compare-tools');tools.innerHTML='<label for="gd-compare-series">ホバー・フォーカスで比べる</label><select id="gd-compare-series"></select>';
    const controls=node('div','gd-controls');controls.append($('series-tools'),tools);
    $('component-index').prepend(region,mobileNav,controls);
    [...$('series-select').options].forEach(opt=>$('gd-compare-series').append(opt.cloneNode(true)));
    $('gd-compare-series').value='carbon';$('gd-compare-series').addEventListener('change',applyScopes);
    $('series-tools').querySelector('label').textContent='見本のSeries';
    $('index-count').setAttribute('role','status');
    const note=node('details','gd-license');note.innerHTML='<summary>利用条件と出典について</summary><p>HTML・CSSの見本です。通信・保存・業務判断はアプリ側で実装します。現在のリポジトリは <code>UNLICENSED</code>。利用・再配布の許諾条件を確認してください。andmオリジナルは独自設計です。外部参照Seriesは公開仕様の解釈を含み、公式パッケージの再配布ではありません。</p><a href="https://github.com/atsushi316/andm-ui/blob/main/package.json" target="_blank" rel="noopener noreferrer">利用条件 ↗</a> · <a href="#/library/source-first">出典と採用ルール</a>';
    $('component-grid').after(note);
    $('top').append($('series-tools'));
    window.addEventListener('hashchange',refresh);
  }
  function updateActive(){
    const route=location.hash.match(/^#\/catalog\/(parts|screens|series|motion|knowledge|labs)(?:\/(small|pattern|original|referenced))?$/);if(route){mode=route[1];size=mode==='parts'?(route[2]||''):'';origin=mode==='series'?(route[2]||''):'';}
    const home=document.body.dataset.view==='home';
    document.querySelectorAll('[data-mode]').forEach(b=>{b.setAttribute('aria-pressed',String(home&&b.dataset.mode===mode&&(b.dataset.filter||'')===(mode==='parts'?size:mode==='series'?origin:'')));});
    const nav=$('gallery-nav');nav.querySelectorAll('.gd-sidebar-primary a[href^="#/"]').forEach(a=>{const current=a.getAttribute('href')===location.hash||(a.getAttribute('href')==='#/library'&&location.hash==='#/library/index');if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});
    const routeKey=location.hash+'|'+document.body.dataset.view;if(activeRoute!==routeKey){activeRoute=routeKey;nav.querySelectorAll('.gd-sidebar-primary [aria-current="page"],.gd-sidebar-primary [data-mode][aria-pressed="true"]').forEach(el=>{let p=el.parentElement;while(p&&p!==nav){if(p.tagName==='DETAILS')p.open=true;p=p.parentElement;}});}
    document.body.dataset.catalogMode=mode;
    $('gd-catalog-title').textContent=(mode==='parts'&&size?sizes[size]:mode==='series'&&origin?(origin==='original'?'andmオリジナル':'公式資料を参照したSeries'):modes[mode]);$('gd-catalog-lead').textContent=leads[mode];
  }
  function card(entry, ids, href, series) {
    const article=node('article','g-component-card'+(ids.length>1&&mode==='screens'?' gd-screen-card':''));article.dataset.catalogId=entry.id;
    const a=node('a','gd-card-link');a.href=href;a.setAttribute('aria-label',entry.title+'の見本と使い方');if(mode==='screens')a.dataset.screenId=entry.id;const preview=specimen(ids,series||'baseline',!!series);
    const label=node('small','gd-preview-label');if(series)label.textContent=(window.ANDM_SERIES_COPY.labels[series]||series)+' · 実装見本';else label.dataset.gdLabel='selected';
    a.append(preview,label,node('h3','',entry.title),node('p','',entry.use),node('span','gd-card-category',entry.group||'Series'));
    if(mode==='series'){const meta=window.ANDM_SERIES_COPY.meta[series];a.append(node('p','gd-provenance',meta.sourceNote),node('small','gd-provenance-limit',originals(series)?'独自の設計。外部ライブラリの再現ではありません。':'公式製品そのものではありません。未確認・独自補完の範囲は詳細の出典で確認できます。'));}
    if(mode==='parts')a.querySelector('.gd-card-category').textContent=sizes[tier(entry.id)]+' / '+entry.group;
    article.append(a);
    const details=node('details','gd-quick');const summary=node('summary','','比較を表示');details.append(summary);
    const panel=node('div','gd-quick-panel');
    const info=node('p','',entry.info||('構成：'+ids.map(id=>{const e=context.entries.find(e=>e.id===id);return e?e.title:id;}).join(' / ')));panel.append(info);
    const comparison=specimen(ids,series||'carbon',!!series);if(!series)comparison.firstElementChild.dataset.gdSeries='comparison';
    const comparisonLabel=node('small','gd-preview-label');if(series)comparisonLabel.textContent='同じ共通API / '+(window.ANDM_SERIES_COPY.briefs[series]||{}).motion;else comparisonLabel.dataset.gdLabel='comparison';
    panel.append(comparisonLabel,comparison);
    const go=node('a','gd-detail-link','実物を操作・コードと出典を見る →');go.href=href;if(mode==='screens')go.dataset.screenId=entry.id;panel.append(go);details.append(panel);article.append(details);
    // Open the native disclosure for pointer/focus previews; tapping pins it.
    let pinned=false;
    summary.addEventListener('click',event=>{event.preventDefault();pinned=!pinned;details.open=pinned;});
    article.addEventListener('pointerenter',event=>{if(event.pointerType==='mouse')details.open=true;});
    article.addEventListener('pointerleave',()=>{if(!pinned&&!article.contains(document.activeElement))details.open=false;});
    article.addEventListener('focusin',event=>{if(event.target.matches(':focus-visible'))details.open=true;});
    article.addEventListener('focusout',event=>{if(!pinned&&!article.contains(event.relatedTarget)&&!article.matches(':hover'))details.open=false;});
    article.addEventListener('keydown',event=>{if(event.key==='Escape'){pinned=false;details.open=false;summary.focus();details.open=false;event.stopPropagation();}});
    return article;
  }
  function refresh() {
    if(!context)return; fit.disconnect();
    updateActive();
    $('component-index').dataset.catalogMode=mode;
    const query=context.query, category=context.category;
    const matches=e=>(!query||query.split(/\s+/).every(w=>[e.title,e.use,e.group,e.info].join(' ').normalize('NFKC').toLowerCase().includes(w))) && (!category || e.group===category);
    let cards=[];
    if(mode==='parts') {const priority=['button','text-field','checkbox','radio','switch','select','card','tabs','dialog','header-nav','side-nav','bottom-nav'];cards=context.entries.slice().sort((a,b)=>{const ai=priority.indexOf(a.id),bi=priority.indexOf(b.id);return (ai<0?999:ai)-(bi<0?999:bi);}).filter(e=>(!size||tier(e.id)===size)&&(!category||e.group===category)&&(!query||context.matches(e,query))).map(e=>{
      const section=document.querySelector('[data-part="'+e.id+'"]');
      const desc=section&&section.querySelector('.g-desc');
      return card({...e,use:(window.ANDM_USAGE&&window.ANDM_USAGE.entries[e.id]&&window.ANDM_USAGE.entries[e.id].when)||context.descriptions[e.id]||e.keywords.join('・')||'詳細で状態と操作を確認。',info:desc?desc.textContent.trim():''},[e.id],e.href);
    });}
    if(mode==='screens') cards=screens.filter(matches).map(e=>card(e,e.parts,'#/screens/'+e.id));
    if(mode==='series') cards=[...$('series-select').options].map(o=>{const b=window.ANDM_SERIES_COPY.briefs[o.value]||{};return {id:o.value,title:o.textContent,use:b.use,info:b.trait,group:originals(o.value)?'andmオリジナル':'公式資料を参照 / andmの解釈'};}).filter(e=>(!origin||originals(e.id)===(origin==='original'))&&(!query||matches({...e,group:category}))).map(e=>card(e,['button','form-field'],'#/series/'+e.id,e.id));
    if(mode==='knowledge') cards=knowledge.filter(e=>!query||matches({...e,group:category})).map(e=>{
      const article=node('article','g-component-card gd-knowledge-card');const a=node('a','gd-card-link');a.href=e.href||'#/library/'+e.id;a.append(node('span','gd-knowledge-mark',e.mark),node('h3','',e.title),node('p','',e.use),node('span','gd-detail-link','資料と根拠を読む →'));article.append(a);if(e.id==='catalog'){const raw=node('a','gd-raw-link','参照データ（JSON）');raw.href='../research/design-knowledge/catalog.json';article.append(raw);}return article;
    });
    if(mode==='motion') cards=[
      {id:'motion',title:'Motion Tokens',use:'時間・曲線・反応を実表示で確認。',info:'Character / Pattern / Tokenの三層を区別。',group:'動き',href:'#/tokens/motion'},
      {id:'m3',title:'M3 · 動きの見本',use:'押下の形、速度、強調を操作して比べる。',info:'既存のMaterial 3検証ページ。',group:'動き',href:'#/labs/m3'},
      {id:'materiality',title:'質感と復元',use:'形と反応を独立に比べる研究Lab。',info:'独立実験。Coreへの自動採用はしません。',group:'研究Lab',href:'#/labs/materiality-behavior'},
      {id:'waveform',title:'波形と状態表現',use:'装飾・入力反応・状態・データの違いを見る。',info:'波形表現の独立実験。',group:'研究Lab',href:'#/labs/waveform-expression'}
    ].filter(e=>!query||matches({...e,group:category})).map(e=>card(e,['button'],e.href));
    if(mode==='labs')cards=window.ANDM_PORTAL.entries.filter(e=>!query||matches({...e,group:category,use:e.use})).map(e=>{const article=node('article','g-component-card gd-lab-card');article.dataset.catalogId=e.id;const a=node('a','gd-card-link');a.href='#/labs/'+e.id;a.append(node('span','gd-lab-mark','操作できる実験'),node('h3','',e.title),node('p','',e.use),node('span','gd-card-category','andmの独立研究'),node('span','gd-detail-link','見本を操作・実装と出典を見る →'));article.append(a);return article;});
    $('component-grid').replaceChildren(...cards);
    $('index-count').textContent=cards.length+' '+(mode==='parts'?'部品':mode==='screens'?'構成':'項目');$('index-empty').hidden=!!cards.length;
    $('index-empty').textContent='一致する項目がありません。検索語や用途を変えてください。';
    applyScopes();
  }
  window.ANDM_DISCOVERY={tier,setMode,render(entries,query,category,descriptions,matchesFn){context={entries,query,category,descriptions,matches:matchesFn};mount();refresh();},applySeries:applyScopes};
})();
