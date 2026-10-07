const $ = (id) => document.getElementById(id);
const hypotheses = {
  clarity: { name: '明快・実務', pattern: '一覧で比較 → 選択 → 確認。配置を安定させ、戻る経路を残す。', series: 'Baseline / DADS / Fluent', benefit: '見つけやすさと正確さ', cost: '個性や高揚感が弱くなる可能性', tests: '初回の完了時間、誤操作、ラベルの理解' },
  immersion: { name: '没入・物語', pattern: '場面に入る → 対象を発見 → 操作 → 世界内で反応。物語と操作の意味を揃える。', series: '独自の表現候補。ラボの深い色・浮遊感は研究段階', benefit: '世界観への参加と愛着', cost: '探索や演出が繰り返し利用を遅くする可能性', tests: '世界観の理解、発見のしやすさ、再利用時の疲労' },
  bold: { name: '大胆・演出', pattern: '強い構図で注目 → 選択で反応 → 決定を演出。通常時と選択時の差を作る。', series: '独自の非対称・高コントラスト表現候補。ラボ限定', benefit: '高揚感と印象に残る操作', cost: '読み取りや比較に時間がかかる可能性', tests: '楽しさ、視線の迷い、誤選択、反復時の疲労' },
};
let direction = 'clarity';
let selected = '';
function chooseDirection(value) {
  direction = value;
  $('scene').dataset.direction = value;
  document.querySelectorAll('[data-direction].andm-chip').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.direction === value)));
}
document.querySelectorAll('[data-direction].andm-chip').forEach(button => button.addEventListener('click', () => chooseDirection(button.dataset.direction)));
document.querySelectorAll('[data-project]').forEach(button => {
  button.setAttribute('aria-pressed', 'false');
  button.addEventListener('click', () => {
    selected = button.dataset.project;
    document.querySelectorAll('[data-project]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    $('selection').textContent = selected + ' を選択しました。';
    $('open').disabled = false;
  });
});
$('reset').addEventListener('click', () => {
  selected = ''; $('open').disabled = true;
  $('selection').textContent = '作品を選択してください。';
  document.querySelectorAll('[data-project]').forEach(button => button.setAttribute('aria-pressed', 'false'));
});
$('open').addEventListener('click', () => { $('project-title').textContent = selected; $('project-dialog').showModal(); });
$('brief').addEventListener('submit', event => {
  event.preventDefault();
  const hypothesis = hypotheses[$('priority').value];
  chooseDirection($('priority').value);
  $('proposal').replaceChildren();
  const entries = [['仮説', hypothesis.name], ['目的', $('goal').value], ['利用者', $('audience').value || '未設定'], ['構成候補', hypothesis.pattern], ['表現候補', hypothesis.series], ['期待する効果', hypothesis.benefit], ['トレードオフ', hypothesis.cost], ['検証', hypothesis.tests]];
  if ($('medium').value === 'spatial') entries.push(['AR / VR の追加検証', '距離・文字の視角・遮蔽・視線と手の入力・姿勢・疲労を実機で調べる。このWeb試作で空間UIの妥当性は判定しない。']);
  entries.forEach(([label, value]) => { const p = document.createElement('p'); const strong = document.createElement('strong'); strong.textContent = label + '：'; p.append(strong, document.createTextNode(value)); $('proposal').append(p); });
});
$('download').addEventListener('click', () => {
  const record = { createdAt: new Date().toISOString(), goal: $('goal').value, audience: $('audience').value, priority: $('priority').value, medium: $('medium').value, prototypeDirection: direction, selected, hypothesis: hypotheses[$('priority').value], notes: $('notes').value, adopted: null };
  const url = URL.createObjectURL(new Blob([JSON.stringify(record, null, 2)], { type: 'application/json' }));
  const a = document.createElement('a'); a.href = url; a.download = 'andm-experience-review.json'; a.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
  $('save-status').textContent = '条件と検証メモを書き出しました。採用判断は未決です。';
});
