import {enhanceButton} from './button.js';
const CONDITIONS = [
  {id:'A', shape:'round', reaction:'elastic', title:'丸い造形 × 弾性的な復元', explanation:'同じ押し込みから、元の大きさを少し越えて収束します。'},
  {id:'B', shape:'round', reaction:'monotonic', title:'丸い造形 × 単調な復元', explanation:'同じ押し込みから、元の大きさを越えずに戻ります。'},
  {id:'C', shape:'square', reaction:'monotonic', title:'角のある造形 × 単調な復元', explanation:'Bと同じ復元。変わるのは静止した角の形だけです。'},
  {id:'D', shape:'square', reaction:'elastic', title:'角のある造形 × 弾性的な復元', explanation:'Aと同じ復元。変わるのは静止した角の形だけです。'}
];
const $ = id => document.getElementById(id);
const params = new URLSearchParams(location.search), evaluating = params.get('mode') === 'evaluate';
$('exploration').hidden = evaluating; $('evaluation').hidden = !evaluating;
$('explore-link').removeAttribute('aria-current');
(evaluating ? $('evaluate-link') : $('explore-link')).setAttribute('aria-current','page');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
function motion() { return reduced.matches || $('motion-off').checked ? 'static' : 'animated'; }
function updateMotion() {
  document.body.dataset.motion = $('motion-off').checked ? 'off' : 'on';
  $('motion-note').textContent = reduced.matches ? 'OS設定により変形・復元の動きを止めています。受付と結果は表示します。' : motion() === 'static' ? '変形は停止中。受付と結果は表示します。' : '復元は両条件とも480ms。戻り方だけを比べます。';
}
$('motion-off').addEventListener('change',updateMotion); reduced.addEventListener('change',updateMotion); updateMotion();
function markup(condition, name, evaluation = false) {
  return `<article class="condition" aria-labelledby="heading-${name}"><h3 id="heading-${name}">${evaluation ? '試行 '+name : condition.id+' · '+condition.title}</h3>${evaluation ? '' : '<p class="description">'+condition.explanation+'</p>'}<div class="stage"><button type="button" class="andm-btn andm-btn--filled mb-button" data-shape="${condition.shape}" data-return="${condition.reaction}" ${evaluation ? 'disabled data-awaiting="true"' : ''}><span class="mb-face" aria-hidden="true"></span><span class="mb-label">保存する</span></button></div><p class="event-state">入力状態：待機</p><p class="result" role="status">まだ保存していません。</p>${evaluation ? '' : '<footer><label><input type="checkbox" class="disable-example">操作不可にする</label><a href="?condition='+condition.id+'">この条件だけ試す ↗</a></footer>'}</article>`;
}
function connect(article, onConfirm = () => {}, events = []) {
  let saves = 0;
  const button = article.querySelector('.mb-button'), state = article.querySelector('.event-state'), result = article.querySelector('.result');
  const controller = enhanceButton(button, {
    onState(event,input) {
      const labels = {press:'受付中（まだ保存していません）',release:'入力を解除しました',cancel:'入力を取消しました（保存していません）'};
      state.textContent = '入力状態：'+labels[event];
      events.push({event,input:input??null,at:performance.now(),motion:motion()});
    },
    onConfirm(info) {
      saves++; result.textContent = `保存しました（模擬） · ${saves}回目`;
      events.push({event:'confirm',...info,motion:motion()}); onConfirm({count:saves,...info,motion:motion()});
    }
  });
  const toggle = article.querySelector('.disable-example');
  toggle?.addEventListener('change',() => {
    controller.cancel(); button.disabled = toggle.checked;
    state.textContent = toggle.checked ? '入力状態：操作不可' : '入力状態：待機';
  });
  return controller;
}
if (!evaluating) {
  const chosen = CONDITIONS.find(x=>x.id === params.get('condition'));
  if (chosen) { document.body.classList.add('standalone'); $('explore-title').textContent = chosen.title; }
  $('conditions').innerHTML = (chosen ? [chosen] : CONDITIONS).map(c=>markup(c,c.id)).join('');
  $('conditions').querySelectorAll('.condition').forEach(a=>connect(a));
}
function shuffled(items) {
  const result = [...items];
  for (let i=result.length-1;i>0;i--) { const value = crypto.getRandomValues(new Uint32Array(1))[0]; const j = Math.floor(value/4294967296*(i+1)); [result[i],result[j]]=[result[j],result[i]]; }
  return result;
}
function choices(name, label, low, high) {
  return `<label class="form-row">${label}<select name="${name}" required><option value="">選択してください</option>${Array.from({length:7},(_,i)=>'<option value="'+(i+1)+'">'+(i+1)+(i===0?' · '+low:i===6?' · '+high:'')+'</option>').join('')}</select></label>`;
}
let session, trialIndex = 0, controller;
function restart() {
  controller?.destroy();
  const ids=shuffled(['R17','R42','R63','R85']);
  session = {version:'materiality-stimulus-v1',startedAt:new Date().toISOString(),recommended:null,adoption:null,
    randomization:'Fisher-Yates; four conditions once; no population counterbalancing claim',
    stimulus:{pressScale:.94,pressMs:80,releaseMs:480,roundRem:2,squareRem:.25,elasticCurve:[.34,2.5,.3,1],monotonicCurve:[.2,0,.2,1],faceColor:'#245348',buttonWidthRem:14,buttonMinHeightRem:4.5},
    trials:shuffled(CONDITIONS).map((c,i)=>({neutralId:ids[i],conditionId:c.id,expectation:null,impression:null,events:[],activations:0}))};
  trialIndex = 0; $('export-evaluation').disabled = true; $('eval-message').textContent = ''; $('export-status').textContent = 'このタブを閉じると未保存の回答は消えます。'; renderTrial();
}
function renderTrial() {
  controller?.destroy();
  if (trialIndex===4) {
    $('eval-progress').textContent = '4 / 4 · 予備評価が終わりました';
    $('eval-content').innerHTML = '<h3 tabindex="-1" id="finished">回答を保存できます</h3><p>今回は個人の探索的な記録です。統計的な効果・採用の判定は行いません。</p><details><summary>回答と条件の対応を確認する</summary><ul class="summary-list">'+session.trials.map(t=>'<li>'+t.neutralId+' → '+t.conditionId+' · 期待一致 '+t.impression.match+' / 好み '+t.impression.preference+' / 明確さ '+t.impression.clarity+'</li>').join('')+'</ul></details>';
    $('export-evaluation').disabled=false; $('finished').focus(); return;
  }
  const t = session.trials[trialIndex], c = CONDITIONS.find(x=>x.id===t.conditionId);
  $('eval-progress').textContent = `${trialIndex+1} / 4 · ${t.neutralId}`;
  $('eval-content').innerHTML = markup(c,t.neutralId,true)+`<form id="before-form"><fieldset><legend>1 · 触る前の期待</legend>${choices('softness','見た目から予想する押し込みやすさ','硬そう','柔らかそう')}${choices('return','予想する戻り方','単調に戻りそう','弾性的に戻りそう')}<label class="form-row">今回使う入力<select name="input" required><option value="">選択してください</option><option value="mouse">マウス・トラックパッド</option><option value="touch">タッチ</option><option value="keyboard">キーボード</option><option value="assistive">支援技術</option></select></label><label class="form-row">この実験を以前に触りましたか<select name="exposure" required><option value="">選択してください</option><option value="first">初めて</option><option value="explored">探索モード・別条件を触った</option><option value="repeated">繰り返し評価している</option></select></label></fieldset><button class="lab-action" type="submit">期待を記録してボタンを試す</button></form><p id="expectation-record" hidden></p><form id="after-form" hidden><fieldset><legend>2 · 操作後の印象</legend>${choices('match','予想した反応との一致','一致しない','一致する')}${choices('preference','この反応の好み','好ましくない','好ましい')}${choices('clarity','受付と保存完了の分かりやすさ','分かりにくい','分かりやすい')}<label class="form-row">気づいたこと（任意）<textarea name="note" maxlength="2000"></textarea></label></fieldset><button class="lab-action" type="submit">印象を記録して次へ</button></form>`;
  controller = connect($('eval-content').querySelector('.condition'),info=>{
    t.activations=info.count; t.lastInput=info.input; t.motionAtActivation=info.motion; $('after-form').hidden=false;
    $('eval-message').textContent='模擬保存が完了しました。もう一度試してから印象を記録することもできます。';
  },t.events);
  $('before-form').addEventListener('submit',e=>{
    e.preventDefault(); const values=Object.fromEntries(new FormData(e.target));
    t.expectation={...values,recordedAt:new Date().toISOString(),motion:motion()};
    $('before-form').hidden=true; $('expectation-record').hidden=false;
    $('expectation-record').textContent='操作前の期待を記録しました。ボタンを押してから印象を回答してください。';
    const b=$('eval-content').querySelector('.mb-button'); delete b.dataset.awaiting; b.disabled=false; b.focus();
  });
  $('after-form').addEventListener('submit',e=>{
    e.preventDefault(); if (!t.activations) return;
    t.impression={...Object.fromEntries(new FormData(e.target)),recordedAt:new Date().toISOString(),motion:motion()};
    trialIndex++; $('eval-message').textContent='印象を記録しました。'; renderTrial();
    if(trialIndex<4){const h=$('eval-content').querySelector('h3');h.tabIndex=-1;h.focus();}
  });
}
$('restart-evaluation').addEventListener('click',()=>{
  if (session.trials.some(t=>t.expectation) && !confirm('このセッションの回答を破棄して、新しい提示順でやり直しますか？')) return;
  restart();
});
$('export-evaluation').addEventListener('click',()=>{
  if(trialIndex!==4) return;
  const data={...session,completedAt:new Date().toISOString(),environment:{userAgent:navigator.userAgent,viewport:{width:innerWidth,height:innerHeight},osReducedMotion:reduced.matches,manualNoMotion:$('motion-off').checked},limits:['individual exploratory evaluation','not a blinded source-code experiment','no statistical inference','no adoption decision']};
  const blob=new Blob([JSON.stringify(data,null,2)],{type:'application/json'}), url=URL.createObjectURL(blob),a=document.createElement('a');
  a.href=url;a.download='materiality-evaluation.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);$('export-status').textContent='回答をJSONで書き出しました。外部には送信していません。';
});
if(evaluating) restart();
