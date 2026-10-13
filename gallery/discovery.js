/* Gallery-only catalog. Specimens come from existing DOM + dist/style.css. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const node = (tag, cls, text) => { const el = document.createElement(tag); if (cls) el.className = cls; if (text) el.textContent = text; return el; };
  const modes = {parts:'コンポーネント',screens:'画面構成',series:'デザインの比較',motion:'動きと反応',knowledge:'設計資料'};
  const leads = {parts:'用途から探して、実物の見本を確かめる。',screens:'パーツを組み合わせたときの配置と流れを見る。',series:'同じ部品で、形・密度・文字・反応の違いを比べる。',motion:'操作への反応と、動きが伝える意味を確かめる。',knowledge:'設計の判断に使う、出典・原則・確認範囲。'};
  const screens = [
    {id:'settings',title:'設定・入力を完了する',use:'値を入力し、選択して保存する。エラーや処理中の状態も確認。',parts:['header-nav','form-field','switch','form-actions'],group:'入力・操作'},
    {id:'search',title:'検索して比較する',use:'検索・絞り込みから一覧、並べ替え、ページ移動へ。',parts:['search-form','filter-bar','table','pagination'],group:'面・情報表示'},
    {id:'detail',title:'詳細を読み、操作する',use:'現在地、内容、補助操作をひとつの画面に組み合わせる。',parts:['breadcrumb','resource-item','toolbar'],group:'ナビゲーション'}
  ];
  const knowledge = [
    {id:'philosophy',title:'世界観と設計思想を比べる',use:'Intent・Philosophy・Series・Compositionを分けて考える。既存の思想Labと判断記録へ。',mark:'設計思想',href:'lab/philosophy-poc/'},
    {id:'catalog',title:'Design Knowledgeの記録',use:'美学、技法、構成、意図、制約、代案、判断、検証の23件。設計時に参照するJSON資料。',mark:'設計の軸',href:'#/library/design-philosophies'},
    {id:'source-first',title:'出典優先の設計',use:'公式仕様 → 同じ体系から導出 → 文献で補完。判断の順序を確認。',mark:'原則'},
    {id:'source-reaudit',title:'仕様と根拠を確認する',use:'プロパティごとの確認済み・未確認を読み、採用の範囲を見極める。',mark:'根拠'},
    {id:'component-coverage',title:'他体系との機能比較',use:'実装済みの部品と不足、操作の対応範囲を確認。',mark:'機能一覧'},
    {id:'academic',title:'認知・群化・視覚的階層',use:'余白の関係や知覚の原則を調べる。研究の数値を自動でTokenにしない。',mark:'認知と知覚'},
    {id:'design-systems',title:'公式デザインシステム',use:'各Seriesの出典へ。版・対象・取得状態を区別して読む。',mark:'公式資料'},
    {id:'standards',title:'操作とアクセシビリティ',use:'Native HTML、キーボード、ARIA、状態の契約を確認。',mark:'操作の基準'}
  ];
  let mode = 'parts', context, mounted = false;
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
    document.querySelectorAll('[data-screen-id]').forEach(el=>{el.href='completion/?screen='+el.dataset.screenId+'&series='+encodeURIComponent(selected);});
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
  function setMode(id) {
    mode=id;$('component-category').value='';
    $('component-category').dispatchEvent(new Event('change',{bubbles:true}));
    if(location.hash!=='#/')location.hash='#/';
    document.body.removeAttribute('data-nav-open');$('nav-toggle').setAttribute('aria-expanded','false');
    refresh();
  }
  function mount() {
    if(mounted)return;mounted=true;installNavigationStages();
    const nav=$('gallery-nav');
    const index=node('details','gd-all-index');index.append(node('summary','','すべての項目'));
    [...nav.children].forEach(child=>{if(child.classList.contains('g-nav__group'))index.append(child);});
    const sidebar=node('div','gd-sidebar-primary');sidebar.append(node('p','gd-sidebar-heading','ライブラリ'));
    Object.entries(modes).forEach(([id,label],i)=>{const b=node('button','gd-mode-button');b.type='button';b.dataset.mode=id;b.append(node('span','gd-mode-icon',['◫','▤','◐','↗','≡'][i]),node('span','',label));b.addEventListener('click',()=>setMode(id));sidebar.append(b);});
    const extras=node('details','gd-lab-menu');extras.append(node('summary','','実験室'));
    const shortcuts=document.querySelector('.g-lab-shortcuts');[...shortcuts.children].forEach(a=>extras.append(a));shortcuts.remove();
    nav.prepend(sidebar);const purposes=$('purpose-filters');if(purposes)sidebar.after(purposes);nav.append(index,extras);
    const footer=node('div','gd-sidebar-footer');footer.innerHTML='<a href="https://github.com/atsushi316/andm-ui" target="_blank" rel="noopener noreferrer">GitHub ↗</a><span>目的に合うUIをつくる。</span>';nav.append(footer);
    const region=node('header','gd-intro');region.innerHTML='<div><p class="gd-eyebrow">andm-ui / Library</p><h1 id="gd-catalog-title">コンポーネント</h1><p id="gd-catalog-lead"></p></div>';
    const mobileNav=node('nav','gd-catalog-nav');mobileNav.setAttribute('aria-label','カタログの種類');
    Object.entries(modes).forEach(([id,label])=>{const b=node('button','',label);b.type='button';b.dataset.mode=id;b.addEventListener('click',()=>setMode(id));mobileNav.append(b);});
    const tools=node('div','gd-compare-tools');tools.innerHTML='<label for="gd-compare-series">ホバー・フォーカスで比べる</label><select id="gd-compare-series"></select>';
    const controls=node('div','gd-controls');controls.append($('series-tools'),tools);
    $('component-index').prepend(region,mobileNav,controls);
    [...$('series-select').options].forEach(opt=>$('gd-compare-series').append(opt.cloneNode(true)));
    $('gd-compare-series').value='carbon';$('gd-compare-series').addEventListener('change',applyScopes);
    $('series-tools').querySelector('label').textContent='見本のデザイン';
    $('index-count').setAttribute('role','status');
    const note=node('details','gd-license');note.innerHTML='<summary>利用条件と出典について</summary><p>HTML・CSSの見本です。通信・保存・業務判断はアプリ側で実装します。現在のリポジトリは <code>UNLICENSED</code>。利用・再配布の許諾条件を確認してください。各Seriesは公開仕様の解釈で、公式パッケージの再配布ではありません。</p><a href="https://github.com/atsushi316/andm-ui/blob/main/package.json" target="_blank" rel="noopener noreferrer">利用条件 ↗</a> · <a href="#/library/source-first">出典と採用ルール</a>';
    $('component-grid').after(note);
    function placeTools(){const home=document.body.dataset.view==='home';if(home)controls.prepend($('series-tools'));else $('pagehead').before($('series-tools'));}
    window.addEventListener('andm:viewchange',placeTools);window.addEventListener('hashchange',()=>{placeTools();updateActive();});placeTools();
  }
  function updateActive(){
    const home=document.body.dataset.view==='home';
    document.querySelectorAll('[data-mode]').forEach(b=>{b.setAttribute('aria-pressed',String(home&&b.dataset.mode===mode));});
    document.body.dataset.catalogMode=mode;
    $('gd-catalog-title').textContent=modes[mode];$('gd-catalog-lead').textContent=leads[mode];
  }
  function card(entry, ids, href, series) {
    const article=node('article','g-component-card'+(ids.length>1&&mode==='screens'?' gd-screen-card':''));article.dataset.catalogId=entry.id;
    const a=node('a','gd-card-link');a.href=href;a.setAttribute('aria-label',entry.title+'の見本と使い方');if(mode==='screens')a.dataset.screenId=entry.id;const preview=specimen(ids,series||'baseline',!!series);
    const label=node('small','gd-preview-label');if(series)label.textContent=(window.ANDM_SERIES_COPY.labels[series]||series)+' · 実装見本';else label.dataset.gdLabel='selected';
    a.append(preview,label,node('h3','',entry.title),node('p','',entry.use),node('span','gd-card-category',entry.group||'Series'));
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
    article.addEventListener('focusin',()=>{details.open=true;});
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
    if(mode==='parts') cards=context.entries.filter(e=>(!category||e.group===category)&&(!query||context.matches(e,query))).map(e=>{
      const section=document.querySelector('[data-part="'+e.id+'"]');
      const desc=section&&section.querySelector('.g-desc');
      return card({...e,use:context.descriptions[e.id]||e.keywords.join('・')||'詳細で状態と操作を確認。',info:desc?desc.textContent.trim():''},[e.id],e.href);
    });
    if(mode==='screens') cards=screens.filter(matches).map(e=>card(e,e.parts,'completion/?screen='+e.id));
    if(mode==='series') cards=[...$('series-select').options].map(o=>{const b=window.ANDM_SERIES_COPY.briefs[o.value]||{};return {id:o.value,title:o.textContent,use:b.use,info:b.trait,group:'Series'};}).filter(e=>!query||matches({...e,group:category})).map(e=>card(e,['button','form-field'],'#/series/'+e.id,e.id));
    if(mode==='knowledge') cards=knowledge.filter(e=>!query||matches({...e,group:category})).map(e=>{
      const article=node('article','g-component-card gd-knowledge-card');const a=node('a','gd-card-link');a.href=e.href||'#/library/'+e.id;a.append(node('span','gd-knowledge-mark',e.mark),node('h3','',e.title),node('p','',e.use),node('span','gd-detail-link','資料と根拠を読む →'));article.append(a);if(e.id==='catalog'){const raw=node('a','gd-raw-link','参照データ（JSON）');raw.href='../research/design-knowledge/catalog.json';article.append(raw);}return article;
    });
    if(mode==='motion') cards=[
      {id:'motion',title:'Motion Tokens',use:'時間・曲線・反応を実表示で確認。',info:'Character / Pattern / Tokenの三層を区別。',group:'動き',href:'#/foundation/motion'},
      {id:'m3',title:'M3 · 動きの見本',use:'押下の形、速度、強調を操作して比べる。',info:'既存のMaterial 3検証ページ。',group:'動き',href:'m3/'},
      {id:'materiality',title:'質感と復元',use:'形と反応を独立に比べる研究Lab。',info:'独立実験。Coreへの自動採用はしません。',group:'研究Lab',href:'lab/materiality-behavior/'},
      {id:'waveform',title:'波形と状態表現',use:'装飾・入力反応・状態・データの違いを見る。',info:'波形表現の独立実験。',group:'研究Lab',href:'lab/waveform-expression/'}
    ].filter(e=>!query||matches({...e,group:category})).map(e=>card(e,['button'],e.href));
    $('component-grid').replaceChildren(...cards);
    $('index-count').textContent=cards.length+' '+(mode==='parts'?'部品':mode==='screens'?'構成':'項目');$('index-empty').hidden=!!cards.length;
    $('index-empty').textContent='一致する項目がありません。検索語や用途を変えてください。';
    applyScopes();
  }
  window.ANDM_DISCOVERY={setMode,render(entries,query,category,descriptions,matchesFn){context={entries,query,category,descriptions,matches:matchesFn};mount();refresh();},applySeries:applyScopes};
})();
