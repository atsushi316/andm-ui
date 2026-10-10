/** Lab reference controller: Native button owns activation. Never synthesize click. */
export function enhanceButton(button, {onState = () => {}, onConfirm = () => {}} = {}) {
  let held = false, pointer = null, key = null, cancelled = false, cancelledKey = null;
  const abort = new AbortController();
  const listen = (target, event, handler) => target.addEventListener(event, handler, {signal: abort.signal});
  function begin(kind) {
    if (button.disabled || held) return;
    held = true; cancelled = false; cancelledKey = null; button.dataset.held = 'true'; onState('press', kind);
  }
  function release(reason = 'release') {
    if (!held) return;
    if (reason === 'cancel') { cancelled = true; cancelledKey = key; }
    held = false; delete button.dataset.held; pointer = null; key = null;
    onState(reason);
  }
  listen(button, 'pointerdown', e => {
    if (!e.isPrimary || e.button !== 0 || button.disabled) return;
    pointer = e.pointerId; begin(e.pointerType || 'pointer');
  });
  listen(window, 'pointerup', e => {
    if (pointer !== e.pointerId) return;
    const r = button.getBoundingClientRect();
    release(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom ? 'cancel' : 'release');
  });
  listen(window, 'pointercancel', e => { if (pointer === e.pointerId) release('cancel'); });
  listen(button, 'keydown', e => {
    if (!['Enter', ' '].includes(e.key) || button.disabled) return;
    if (e.repeat) { e.preventDefault(); return; }
    key = e.key; begin('keyboard');
  });
  listen(window, 'keyup', e => {
    if (key === e.key) release();
    // Native Space click occurs after keyup. Suppress only this cancelled activation.
    if (cancelledKey === e.key) setTimeout(() => { cancelled = false; cancelledKey = null; }, 0);
  });
  listen(window, 'keydown', e => { if (e.key === 'Escape' && held) release('cancel'); });
  listen(button, 'blur', () => release('cancel'));
  listen(window, 'blur', () => release('cancel'));
  listen(window, 'pagehide', () => release('cancel'));
  listen(button, 'click', e => {
    if (button.disabled || (cancelled && (cancelledKey || e.detail !== 0))) { e.preventDefault(); return; }
    cancelled = false;
    // Also supports native activation from assistive technology without key/pointer events.
    onConfirm({input: e.detail === 0 ? 'keyboard-or-assistive' : 'pointer', at: performance.now()});
  });
  const observer = new MutationObserver(() => { if (button.disabled) release('cancel'); });
  observer.observe(button, {attributes: true, attributeFilter: ['disabled']});
  return {cancel: () => release('cancel'), destroy() { release('cancel'); observer.disconnect(); abort.abort(); }};
}
