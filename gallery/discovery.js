/* Gallery-only catalog. Specimens come from existing DOM + dist/style.css. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  const node = (tag, cls, text) => { const el = document.createElement(tag); if (cls) el.className = cls; if (text) el.textContent = text; return el; };
  const modes = {parts:'部品',screens:'画面構成',series:'Series',motion:'Motion',knowledge:'Design Knowledge'};
  const screens = [
    {id:'settings',title:'設定・入力を完了する',use:'値を入力し、選択して保存する。エラーや処理中の状態も確認。',parts:['header-nav','form-field','switch','form-actions'],group:'入力・操作'},
    {id:'search',title:'検索して比較する',use:'検索・絞り込みから一覧、並べ替え、ページ移動へ。',parts:['search-form','filter-bar','table','pagination'],group:'面・情報表示'},
    {id:'detail',title:'詳細を読み、操作する',use:'現在地、内容、補助操作をひとつの画面に組み合わせる。',parts:['breadcrumb','resource-item','toolbar'],group:'ナビゲーション'}
  ];
  const knowledge = [
    {id:'philosophy',title:'世界観と設計思想を比べる',use:'Intent・Philosophy・Series・Compositionを分けて考える。既存の思想Labと判断記録へ。',mark:'00 / DESIGN KNOWLEDGE',href:'lab/philosophy-poc/'},
    {id:'catalog',title:'Design Knowledgeの記録',use:'美学、技法、構成、意図、制約、代案、判断、検証の23件。設計時に参照するJSON資料。',mark:'00 / CATALOG',href:'../research/design-knowledge/catalog.json'},
    {id:'source-first',title:'出典優先の設計',use:'公式仕様 → 同じ体系から導出 → 文献で補完。判断の順序を確認。',mark:'01 / PRINCIPLES'},
    {id:'source-reaudit',title:'仕様と根拠を確認する',use:'プロパティごとの確認済み・未確認を読み、採用の範囲を見極める。',mark:'02 / EVIDENCE'},
    {id:'component-coverage',title:'他体系との機能比較',use:'実装済みの部品と不足、操作の対応範囲を確認。',mark:'03 / COVERAGE'},
    {id:'academic',title:'認知・群化・視覚的階層',use:'余白の関係や知覚の原則を調べる。研究の数値を自動でTokenにしない。',mark:'04 / RESEARCH'},
    {id:'design-systems',title:'公式デザインシステム',use:'各Seriesの出典へ。版・対象・取得状態を区別して読む。',mark:'05 / SOURCES'},
    {id:'standards',title:'操作とアクセシビリティ',use:'Native HTML、キーボード、ARIA、状態の契約を確認。',mark:'06 / STANDARDS'}
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
      if (el.tagName === 'DIALOG' || el.tagName === 'DETAILS') el.setAttribute('open','');
      if (el.matches('.andm-tooltip__bubble, .andm-popover__panel, .andm-menu')) el.removeAttribute('hidden');
    });
    return clone;
  }
  const fit = new ResizeObserver(entries => entries.forEach(({target}) => {
    const frame = target.parentElement; if (!frame || !frame.clientWidth) return;
    const scale = Math.min(1,frame.clientWidth / 480);
    target.style.transform = 'scale('+scale+')';
    frame.style.height = Math.min(target.scrollHeight*scale,frame.closest('.gd-screen-card') ? 270 : 210)+'px';
  }));
  function specimen(ids, series, fixed) {
    const frame=node('div','gd-specimen'); frame.inert=true; frame.setAttribute('aria-hidden','true');
    const inner=node('div','gd-specimen-inner'); inner.dataset.gdSeries=fixed?'fixed':'selected';
    inner.dataset.series=series; if (series!=='baseline') inner.classList.add('andm-series--'+series);
    ids.forEach(id=>inner.append(cloneSample(id))); frame.append(inner); fit.observe(inner); return frame;
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
  function mount() {
    if(mounted)return; mounted=true;
    const region=node('div','gd-intro');region.innerHTML='<p class="gd-eyebrow">UI EXPLORER / andm-ui</p><h2>目的に合うUIを、見て選ぶ。</h2><p>部品と構成を眺め、Seriesの違いを比べて、実装と根拠へ。</p>';
    const nav=node('nav','gd-catalog-nav');nav.setAttribute('aria-label','カタログの種類');
    Object.entries(modes).forEach(([id,label])=>{const b=node('button','',label);b.type='button';b.dataset.mode=id;b.addEventListener('click',()=>{mode=id;refresh();});nav.append(b);});
    const tools=node('div','gd-compare-tools');tools.innerHTML='<p>見本のSeriesは右下で切り替えられます。</p><label for="gd-compare-series">比較するSeries</label><select id="gd-compare-series"></select>';
    $('component-index').prepend(region,nav,tools);
    [...$('series-select').options].forEach(opt=>$('gd-compare-series').append(opt.cloneNode(true)));
    $('gd-compare-series').value='carbon';$('gd-compare-series').addEventListener('change',applyScopes);
    $('index-count').setAttribute('role','status');
    const note=node('aside','gd-license');note.innerHTML='<strong>利用する前に</strong><p>HTML・CSSの見本です。通信・保存・業務判断はアプリ側で実装します。現在のリポジトリは <code>UNLICENSED</code>。利用・再配布の許諾条件を確認してください。各Seriesは公開仕様の解釈で、公式パッケージの再配布ではありません。</p><a href="https://github.com/atsushi316/andm-ui/blob/main/package.json" target="_blank" rel="noopener noreferrer">利用条件を確認 ↗</a> · <a href="#/library/source-first">出典と採用ルール</a>';
    $('component-grid').after(note);
  }
  function card(entry, ids, href, series) {
    const article=node('article','g-component-card'+(ids.length>1&&mode==='screens'?' gd-screen-card':''));article.dataset.catalogId=entry.id;
    const a=node('a','gd-card-link');a.href=href;if(mode==='screens')a.dataset.screenId=entry.id;const preview=specimen(ids,series||'baseline',!!series);
    const label=node('small','gd-preview-label');if(series)label.textContent=(window.ANDM_SERIES_COPY.labels[series]||series)+' · 実装見本';else label.dataset.gdLabel='selected';
    a.append(preview,label,node('h3','',entry.title),node('p','',entry.use),node('span','gd-card-category',entry.group||'Series'));
    article.append(a);
    const details=node('details','gd-quick');const summary=node('summary','','比較・構成を確認');details.append(summary);
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
    document.querySelectorAll('[data-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.mode===mode)));
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
      const article=node('article','g-component-card gd-knowledge-card');const a=node('a','gd-card-link');a.href=e.href||'#/library/'+e.id;a.append(node('span','gd-knowledge-mark',e.mark),node('h3','',e.title),node('p','',e.use),node('span','gd-detail-link','資料と根拠を読む →'));article.append(a);return article;
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
  window.ANDM_DISCOVERY={render(entries,query,category,descriptions,matchesFn){context={entries,query,category,descriptions,matches:matchesFn};mount();refresh();},applySeries:applyScopes};
})();
