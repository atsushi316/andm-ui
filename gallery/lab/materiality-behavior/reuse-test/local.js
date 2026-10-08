// Independently generated from the written contract; no Lab controller import.
const form = document.querySelector('#observation-form');
const button = document.querySelector('#save-observation');
const feedback = document.querySelector('#press-feedback');
const result = document.querySelector('#save-result');
const stopMotion = document.querySelector('#stop-motion');
const disableSave = document.querySelector('#disable-save');
const motionDescription = document.querySelector('#motion-description');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const listeners = new AbortController();
const options = { signal: listeners.signal };
let pointerId = null;
let heldKey = null;
let cancelled = false;
let cancelledKey = null;
let saveCount = 0;
let savedNote = '';

function release(message = '操作できます。') {
  button.dataset.held = 'false';
  feedback.textContent = button.disabled ? '保存ボタンは無効です。' : message;
}
function cancel() {
  if (pointerId === null && heldKey === null) return;
  cancelled = true;
  cancelledKey = heldKey;
  pointerId = null;
  heldKey = null;
  release('操作を取り消しました。');
}
function press() {
  cancelled = false;
  cancelledKey = null;
  button.dataset.held = 'true';
  feedback.textContent = '受付中（まだ保存していません）。';
}
function withinButton(event) {
  const rect = button.getBoundingClientRect();
  return event.clientX >= rect.left && event.clientX <= rect.right &&
    event.clientY >= rect.top && event.clientY <= rect.bottom;
}

button.addEventListener('pointerdown', event => {
  if (button.disabled || !event.isPrimary || event.button !== 0) return;
  pointerId = event.pointerId;
  heldKey = null;
  press();
}, options);
window.addEventListener('pointermove', event => {
  if (event.pointerId === pointerId && !withinButton(event)) cancel();
}, options);
window.addEventListener('pointerup', event => {
  if (event.pointerId !== pointerId) return;
  if (!withinButton(event)) { cancel(); return; }
  pointerId = null;
  release('指を離しました。保存結果は下に表示します。');
}, options);
window.addEventListener('pointercancel', event => {
  if (event.pointerId === pointerId) cancel();
}, options);
button.addEventListener('keydown', event => {
  if (event.key === 'Escape') { cancel(); return; }
  if (event.key !== 'Enter' && event.key !== ' ') return;
  if (button.disabled) return;
  if (event.repeat) { event.preventDefault(); return; }
  heldKey = event.key;
  pointerId = null;
  press();
  // Native Enter click may occur now; native Space click occurs on keyup.
}, options);
window.addEventListener('keyup', event => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  if (cancelledKey === event.key) {
    event.preventDefault();
    setTimeout(() => { cancelled = false; cancelledKey = null; }, 0);
  }
  if (heldKey === event.key) {
    heldKey = null;
    release('キーを離しました。保存結果は下に表示します。');
  }
}, options);
button.addEventListener('blur', cancel, options);
window.addEventListener('blur', cancel, options);
window.addEventListener('keydown', event => {
  if (event.key === 'Escape') cancel();
}, options);
button.addEventListener('click', event => {
  if (button.disabled || (cancelled && (cancelledKey || event.detail !== 0))) {
    event.preventDefault();
    event.stopImmediatePropagation();
    return;
  }
  // Never synthesize click or announce saving from an animation event.
  cancelled = false;
  // Enter can activate while still held: success never ends visual press.
  if (pointerId === null && heldKey === null) release('操作を受け付けました。');
}, { ...options, capture: true });
form.addEventListener('invalid', () => {
  release('入力内容を確認してください。');
  result.textContent = '今回の保存は行っていません。必須のメモを入力してください。';
}, { ...options, capture: true });
form.addEventListener('submit', event => {
  event.preventDefault();
  if (button.disabled) return;
  // Native validation runs before submit. This is synchronous memory-only storage.
  savedNote = new FormData(form).get('observation');
  saveCount += 1;
  result.textContent = `観察メモを保存しました（模擬・この画面内のみ／${saveCount}回目、${savedNote.length}文字）。`;
}, options);

function updateMotion() {
  document.body.dataset.static = String(stopMotion.checked || reducedMotion.matches);
  motionDescription.textContent = reducedMotion.matches
    ? 'OSの設定に従い、動きを停止しています。受付と保存結果は表示します。'
    : stopMotion.checked ? '動きを停止しています。受付と保存結果は表示します。'
      : '弾性的な復元を表示します。動きの途中でも再操作できます。';
}
stopMotion.addEventListener('change', updateMotion, options);
reducedMotion.addEventListener('change', updateMotion, options);
disableSave.addEventListener('change', () => {
  cancel();
  button.disabled = disableSave.checked;
  cancelled = false;
  release();
}, options);
// Abort global listeners when this screen is discarded. Restore after bfcache.
window.addEventListener('pagehide', event => {
  cancel();
  if (!event.persisted) listeners.abort();
}, options);
updateMotion();
