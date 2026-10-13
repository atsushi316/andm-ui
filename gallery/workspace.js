/* Explorer のみ。文献の数値を Core / Token に取り込まない。 */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  var aliases = {
    button: ['ボタン', '操作'], 'text-field': ['入力', 'テキスト', '複数行'], checkbox: ['チェック', '複数選択'], radio: ['ラジオ', '単一選択'], switch: ['スイッチ', '切替'], select: ['セレクト', '選択'], slider: ['スライダー', '範囲'], segmented: ['切替', 'セグメント'], chip: ['チップ', '絞り込み'], fab: ['主操作', 'フローティング'], card: ['カード', '面'], surface: ['面', '容器'], accordion: ['開閉', 'アコーディオン'], list: ['一覧', 'リスト'], table: ['表', 'テーブル'], alert: ['通知', '警告'], toast: ['通知', 'トースト'], progress: ['進捗'], skeleton: ['読み込み'], spinner: ['読み込み'], avatar: ['アバター'], badge: ['バッジ', '状態'], divider: ['区切り'], tabs: ['タブ'], breadcrumb: ['現在地', 'パンくず'], pagination: ['ページ'], menu: ['メニュー'], dialog: ['ダイアログ', '確認'], drawer: ['ドロワー'], tooltip: ['補足'], popover: ['補足'], color: ['色', 'カラー'], typography: ['文字', '書体'], spacing: ['余白'], shape: ['角', '形'], motion: ['動き', 'アニメーション'], interaction: ['フォーカス', '操作'], layout: ['配置', 'レイアウト'], component: ['部品固有', 'トークン'], standards: ['規格', '標準'], academic: ['論文', '理論'], books: ['本', '書籍'], 'design-systems': ['デザインシステム']
  };
  var descriptions = {
    button: '操作を実行する。種類・サイズ・状態を比較。', 'text-field': '文字を入力する。説明・エラー・複数行。', checkbox: '複数の項目を選ぶ。', radio: '一つの項目を選ぶ。', switch: '設定をオン・オフにする。', select: '候補から値を選ぶ。', slider: '範囲内の値を調整する。', segmented: '同じ領域の値を切り替える。', chip: '小さな絞り込み操作。独自仕様。', fab: '主操作を強調する。独自仕様。', dialog: '確認して決定・取消する。', drawer: '補助の操作面を開く。', table: '行と列で情報を比較する。', card: '関連する情報と操作をまとめる。', tabs: '同じ画面内の内容を切り替える。'
  };
  var sources = {
    expressive: { label: 'M3 Expressive', file: 'm3-expressive', url: 'https://developer.android.com/develop/ui/compose/designsystems/material3', note: 'ボタンの形・動きと、ほかの部品への独自解釈を区別しています。' },
    dads: { label: 'DADS', file: 'dads', url: 'https://design.digital.go.jp/dads/', note: '公開ガイドの要件と、本文で未確認の実装値を区別しています。' },
    apple: { label: 'Apple HIG', file: 'apple-hig', url: 'https://developer.apple.com/design/human-interface-guidelines', note: '公式寸法の再現ではありません。現在はシステムフォントを使う独自解釈です。' },
    spectrum: { label: 'Spectrum 2', file: 'spectrum', url: 'https://s2.spectrum.adobe.com/', note: 'ボタンの確認済み仕様を、別部品の公式仕様としては扱いません。' },
    carbon: { label: 'Carbon', file: 'carbon', url: 'https://carbondesignsystem.com/', note: '確認済みのトークンと、部品への独自の対応付けを区別しています。' },
    atlassian: { label: 'Atlassian', file: 'atlassian', url: 'https://atlassian.design/', note: '確認済みの基礎仕様と、個別部品の未確認項目を区別しています。' },
    uswds: { label: 'USWDS', file: 'uswds', url: 'https://designsystem.digital.gov/', note: '公式の用途・基礎仕様と、独自解釈を区別しています。' },
    fluent: { label: 'Fluent 2', file: 'fluent', url: 'https://fluent2.microsoft.design/shapes', note: '形・文字の基礎仕様のみ参照。Chip / FAB の公式寸法は未確認です。' }
  };
  Object.assign(aliases, {"form-field":["フォーム","入力"],"search-form":["検索","検索フォーム"],"filter-bar":["絞り込み","フィルター"],"results-header":["検索結果","並び替え"],"form-actions":["保存","キャンセル"],"header-nav":["ヘッダー","ナビ"],"side-nav":["サイド","階層"],"mobile-nav":["モバイル","メニュー"],"bottom-nav":["ボトム","携帯"],toolbar:["ツールバー","操作"],"action-menu":["アクション","操作メニュー"],"resource-item":["リスト","作品"],"empty-state":["空状態","結果なし"],"loading-state":["読み込み","ローディング"],text:['文字','タイポグラフィ','見出し','本文'],icon:['アイコン','記号'],'icon-button':['アイコンボタン','閉じる'],link:['リンク'],label:['ラベル'],'helper-text':['説明','補足'],'error-text':['エラー','検証'],'required-marker':['必須','任意'],status:['状態'],code:['コード'],kbd:['キーボード','キー'],image:['画像'],'file-input':['ファイル','添付'],'native-input':['日付','時刻','数値','パスワード','標準入力']});
  var entries = [];
  var initialized = false;
  var search = $('component-search');
  var navToggle = $('nav-toggle');
  var mobile = matchMedia('(max-width: 800px)');
  function setNav(open) {
    document.body.toggleAttribute('data-nav-open', open);
    navToggle.setAttribute('aria-expanded', String(open));
  }
  navToggle.addEventListener('click', function () { setNav(!document.body.hasAttribute('data-nav-open')); });
  function normalize(value) { return value.normalize('NFKC').toLowerCase().trim(); }
  function groupLabel(link) {
    var group = link.closest('.g-nav__group');
    var label = group && group.querySelector('.g-nav__label');
    var groups={Controls:'入力・操作',Marks:'文字・記号',Display:'文字・記号',Containers:'面・情報表示',Navigation:'ナビゲーション',Feedback:'状態・通知',Overlays:'重ねて表示',Pattern:'組み合わせ部品',Experience:'体験例'}; var name=label ? label.textContent.trim() : '項目';return groups[name]||name;
  }
  function collect() {
    entries = Array.from(document.querySelectorAll('.g-nav a[href^="#/"]')).map(function (link) {
      var label = link.cloneNode(true); label.querySelectorAll('.g-badge').forEach(function (badge) { badge.remove(); });
      var id = link.dataset.partNav || link.dataset.tokenNav || link.dataset.libraryNav || link.dataset.seriesNav || '';
      return { href: link.getAttribute('href'), title: label.textContent.trim(), group: ['form-field','search-form','filter-bar','results-header','form-actions','toolbar','action-menu'].includes(id)?'入力・操作':['header-nav','side-nav','mobile-nav','bottom-nav'].includes(id)?'ナビゲーション':['resource-item'].includes(id)?'面・情報表示':['empty-state','loading-state'].includes(id)?'状態・通知':groupLabel(link), id: id, part: !!link.dataset.partNav, keywords: aliases[id] || [] };
    }).map(function(entry) {
      if (entry.group === '追加・操作整備部品') {
        var responsibility=entry.href.split('/')[1];
        entry.group=({controls:'入力・操作',display:'面・情報表示',navigation:'ナビゲーション',feedback:'状態・通知',overlays:'重ねて表示'})[responsibility]||entry.group;
      }
      return entry;
    });
  }
  function matches(entry, query) {
    var haystack = normalize([entry.title, entry.group, window.ANDM_USAGE && window.ANDM_USAGE.entries[entry.id] ? window.ANDM_USAGE.entries[entry.id].when : ''].concat(entry.keywords).join(' '));
    return query.split(/\s+/).every(function (word) { return haystack.includes(word); });
  }
  // Discover by task first; keep source group labels and routes intact.
  var purposeGroups = ['入力・操作', 'ナビゲーション', '面・情報表示', '状態・通知', '重ねて表示', '文字・記号', '組み合わせ部品'];
  function setupPurposeFilters() {
    var top = document.querySelector('.g-index-top');
    if (!top || document.getElementById('purpose-filters')) return;
    var region = document.createElement('div');
    region.id = 'purpose-filters';
    region.className = 'g-purpose-filters';
    region.setAttribute('role', 'group');
    region.setAttribute('aria-label', '用途から探す');
    var heading = document.createElement('span');
    heading.className = 'g-purpose-label';
    heading.textContent = '用途から選ぶ';
    region.append(heading);
    [{ label: 'すべて', value: '' }].concat(purposeGroups.map(function (name) { return { label: name, value: name }; })).forEach(function (item) {
      var button = document.createElement('button');
      button.type = 'button';
      button.className = 'g-purpose-option';
      button.textContent = item.label;
      button.dataset.category = item.value;
      button.setAttribute('aria-pressed', String($('component-category').value === item.value));
      button.addEventListener('click', function () {
        $('component-category').value = item.value;
        syncPurposeFilters();
        buildIndex(normalize(search.value));
        if(mobile.matches){setNav(false);var heading=$('gd-catalog-title');if(heading){heading.tabIndex=-1;heading.focus({preventScroll:true});}window.scrollTo(0,0);}
      });
      region.append(button);
    });
    var sidebar=document.querySelector('.gd-sidebar-primary');
    if(sidebar)sidebar.after(region);else top.after(region);
  }
  function syncPurposeFilters() {
    document.querySelectorAll('.g-purpose-option').forEach(function (button) {
      button.setAttribute('aria-pressed', String(button.dataset.category === $('component-category').value));
    });
  }
  function buildIndex(query) {
    var category = $('component-category').value;
    window.ANDM_DISCOVERY.render(entries.filter(e => e.part), query, category, descriptions, matches);
  }

  function searchEntries() {
    var query = normalize(search.value);
    buildIndex(query);
    $('search-results').replaceChildren();
    if (!query) { $('search-results').hidden = true; $('search-status').textContent = ''; return; }
    var found = entries.filter(function (entry) { return matches(entry, query); });
    found.forEach(function (entry) {
      var a = document.createElement('a'); a.href = entry.href;
      var title = document.createElement('span'); title.textContent = entry.title;
      var group = document.createElement('small'); group.textContent = entry.group;
      a.append(title, group); $('search-results').append(a);
    });
    if (!found.length) { var p = document.createElement('p'); p.textContent = '一致する項目がありません。別の言葉で探してください。'; $('search-results').append(p); }
    $('search-results').hidden = document.body.dataset.view === 'home'; $('search-status').textContent = found.length + ' 件見つかりました。';
  }
  $('component-category').addEventListener('change', function () { syncPurposeFilters(); buildIndex(normalize(search.value)); });
  setupPurposeFilters();
  search.addEventListener('input', searchEntries);
  search.addEventListener('focus', function () { if (search.value.trim()) searchEntries(); });
  search.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowDown') { var first = $('search-results').querySelector('a'); if (first) { event.preventDefault(); first.focus(); } }
    if (event.key === 'Enter') { var result = $('search-results').querySelector('a'); if (result) { event.preventDefault(); result.click(); } }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') { $('search-results').hidden = true; if (document.body.hasAttribute('data-nav-open')) { setNav(false); navToggle.focus(); } else if ($('search-results').contains(document.activeElement)) search.focus(); }
  });
  document.addEventListener('click', function (event) {
    if (!event.target.closest('.g-search')) $('search-results').hidden = true;
    var a = event.target.closest('a[href^="#/"]');
    if (!a) return;
    if (mobile.matches) setNav(false);
    $('search-results').hidden = true;
    if (a.closest('#search-results')) { search.value = ''; buildIndex(''); }
    requestAnimationFrame(function () { update(); if (mobile.matches) { $('page-title').focus({ preventScroll: true }); window.scrollTo(0, 0); } });
  });
  mobile.addEventListener('change', function () { setNav(false); });
  function selectedSeries() { var select = $('series-select'); return select && select.value || 'baseline'; }
  function currentPart() { return document.querySelector('[data-part]:not([hidden])'); }
  function updateCode(section) {
    var isPart = document.body.dataset.shell === 'part';
    var panel = $('component-code'); panel.hidden = !isPart || !section;
    if (panel.hidden) return;
    var navigation = ['header-nav','side-nav','bottom-nav'].includes(section.dataset.part);
    var overlay = ['dialog','drawer'].includes(section.dataset.part) && section.querySelector('dialog');
    var example = overlay || (navigation && section.querySelector('.andm-header-nav, .andm-side-nav, .andm-bottom-nav')) || section.querySelector('.cc-sample') || section.querySelector('.g-row, .g-stack, .g-compare') || section.querySelector('[class*="andm-"]');
    if (!example) { panel.hidden = true; return; }
    var clone = example.cloneNode(true);
    clone.querySelectorAll(selectedSeries() === 'dads' ? '[data-partial-spinner]' : '[data-partial-wait]').forEach(function (node) { node.remove(); });
    clone.querySelectorAll(".g-type-role, .g-type-metrics").forEach(function (node) { node.remove(); });
    [clone].concat(Array.from(clone.querySelectorAll('*'))).forEach(function (node) {
      Array.from(node.attributes).forEach(function (attr) { if (['data-held','data-andm-pressed','data-drag','data-enhanced'].includes(attr.name)) node.removeAttribute(attr.name); });
      if (node.classList) { Array.from(node.classList).forEach(function (name) { if (name.startsWith('g-') || name.startsWith('gd-')) node.classList.remove(name); }); if (!node.className) node.removeAttribute('class'); }
    });
    var id = selectedSeries();
    var wrapper = document.createElement('div'); if (id !== 'baseline') wrapper.className = 'andm-series--' + id;
    wrapper.append(clone); $('component-html').textContent = wrapper.outerHTML;
    $('code-context').textContent = '先頭の見本のHTMLです。style.cssを読み込んで使います。状態変更・開閉・値の同期はアプリ側のJavaScriptが必要です。';
    $('copy-status').textContent = '';
  }
  function updateEvidence(section) {
    var el = $('component-evidence'); var view = document.body.dataset.view;
    el.hidden = !section || !(document.body.dataset.shell === 'part' || view === 'series');
    if (el.hidden) return;
    el = $('evidence-body'); el.replaceChildren(); var id = selectedSeries(); var part = section.dataset.part;
    var p = document.createElement('p');
    p.textContent = part === 'chip' || part === 'fab' ? '独自仕様：色・文字はシリーズを継承します。Chip / FAB 固有の寸法・角・動きは公式再現として未確認です。' : 'シリーズは公開システムの解釈です。各部品が公式仕様どおりであることを保証するものではありません。';
    el.append(p); var recheck=document.createElement('a');recheck.href='#/library/source-reaudit';recheck.textContent='全パーツの再監査・プロパティ別の根拠';el.append(recheck,document.createElement('br')); var audit=document.createElement('a');audit.href='#/library/component-audit';audit.textContent='この部品の概念・出典との照合';el.append(audit,document.createElement('br')); var source = sources[id];
    if (source) {
      var note = document.createElement('p'); note.textContent = source.note;
      var analysis = document.createElement('a'); analysis.href = '#/library/analysis-' + source.file; analysis.textContent = '確認済み・未確認の範囲';
      var official = document.createElement('a'); official.href = source.url; official.target = '_blank'; official.rel = 'noopener noreferrer'; official.textContent = source.label + ' 公式資料';
      el.append(note, analysis, document.createTextNode(' · '), official);
    } else { var note = document.createElement('p'); note.textContent = 'Baseline / Soft / Dense / Technical / Editorial / Playful は andm 独自の設計です。'; el.append(note); }
    if (['text','icon','icon-button','link','label','helper-text','error-text','required-marker','status','code','kbd','image','file-input','native-input'].includes(part)) { var atomic = document.createElement('a'); atomic.href = '#/library/atomic-sources'; atomic.textContent = '今回の仕様・シリーズ対応・未確認事項'; el.append(document.createElement('br'), atomic); }
    if (['form-field','search-form','filter-bar','results-header','form-actions','header-nav','side-nav','mobile-nav','bottom-nav','toolbar','action-menu','resource-item','empty-state','loading-state'].includes(part)) { var c=document.createElement('a');c.href='#/library/composition-sources';c.textContent='組み合わせ部品の仕様・出典';el.append(document.createElement('br'),c); }
    if (part === 'chip' || part === 'fab') { var a = document.createElement('a'); a.href = '#/library/component-sources'; a.textContent = '今回の部品の仕様と根拠'; el.append(document.createElement('br'), a); }
  }
  function update() {
    $('back-to-parts').hidden=document.body.dataset.shell!=='part';
    var dadsNote=document.querySelector('[data-dads-bottom-warning]');
    if(dadsNote)dadsNote.hidden=selectedSeries()!=='dads';

    if (!initialized && $('series-select').options.length) { initialized = true; collect();
      Array.from(new Set(entries.filter(function (entry) { return entry.part; }).map(function (entry) { return entry.group; }))).forEach(function (label) { var option = document.createElement('option'); option.value = label; option.textContent = label; $('component-category').append(option); });
      buildIndex(normalize(search.value)); }
    if (initialized) window.ANDM_DISCOVERY.applySeries();
    var section = currentPart(); updateCode(section); updateEvidence(section);
  }
  $('copy-component').addEventListener('click', async function () {
    try { await navigator.clipboard.writeText($('component-html').textContent); $('copy-status').textContent = 'HTMLをコピーしました。'; }
    catch (_) { var range = document.createRange(); range.selectNodeContents($('component-html')); var selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range); $('copy-status').textContent = 'コピーできませんでした。選択されたHTMLを手動でコピーしてください。'; }
  });
  window.addEventListener('hashchange', update); window.addEventListener('andm:viewchange', update);
  function stepSeries(delta) {
    var select=$('series-select'),options=Array.from(select.options),index=options.findIndex(o=>o.value===select.value);
    select.value=options[(index+delta+options.length)%options.length].value;
    select.dispatchEvent(new Event('change',{bubbles:true}));
  }
  $('series-prev').addEventListener('click',()=>stepSeries(-1));
  $('series-next').addEventListener('click',()=>stepSeries(1));
  $('series-switch').addEventListener('click', function () { requestAnimationFrame(update); });
  var observer = new MutationObserver(function () { update(); });
  observer.observe($('nav-series'), { childList: true });
  var skeletonControl=$('skeleton-motion'),skeleton=$('skeleton-demo');
  if(skeletonControl&&skeleton)skeletonControl.addEventListener('click',function(){
    var paused=skeletonControl.getAttribute('aria-pressed')!=='true';
    skeletonControl.setAttribute('aria-pressed',String(paused));skeleton.dataset.paused=String(paused);
    skeletonControl.textContent=paused?'動きを再開':'動きを止める';
    $('skeleton-status').textContent=paused?'静止した読み込みの見本です。':'読み込み中の見本です。動きを減らすOS設定では静止します。';
  });
  update();
})();
