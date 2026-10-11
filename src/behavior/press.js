/** Optional visual press feedback. Native click remains the sole activation. */
export function pressFeedback(root, {minimum = 120} = {}) {
  const buttons = [...root.querySelectorAll('button:not(:disabled)')];
  const abort = new AbortController(), timers = new Map(), starts = new Map();
  const options = {signal: abort.signal};
  function clear(button) {
    clearTimeout(timers.get(button)); timers.delete(button); starts.delete(button);
    button.removeAttribute('data-andm-pressed');
  }
  function start(button) {
    if (button.disabled || starts.has(button)) return;
    clearTimeout(timers.get(button));
    starts.set(button, performance.now()); button.setAttribute('data-andm-pressed', '');
  }
  function release(button, cancel = false) {
    const began = starts.get(button); starts.delete(button);
    if (began === undefined) { if (cancel) clear(button); return; }
    const delay = cancel ? 0 : Math.max(0, minimum - (performance.now() - began));
    clearTimeout(timers.get(button));
    if (!delay) clear(button); else timers.set(button, setTimeout(() => clear(button), delay));
  }
  for (const button of buttons) {
    button.addEventListener('pointerdown', e => {if (e.isPrimary && e.button === 0) start(button);}, options);
    button.addEventListener('pointerleave', () => release(button, true), options);
    button.addEventListener('pointercancel', () => release(button, true), options);
    button.addEventListener('keydown', e => {if (!e.repeat && (e.key === ' ' || e.key === 'Enter')) start(button);}, options);
    button.addEventListener('keyup', e => {if (e.key === ' ' || e.key === 'Enter') release(button);}, options);
    button.addEventListener('blur', () => release(button, true), options);
  }
  root.ownerDocument.addEventListener('pointerup', () => buttons.forEach(b => release(b)), options);
  root.ownerDocument.addEventListener('pointercancel', () => buttons.forEach(b => release(b, true)), options);
  root.ownerDocument.addEventListener('visibilitychange', () => {if (root.ownerDocument.hidden) buttons.forEach(clear);}, options);
  root.ownerDocument.defaultView.addEventListener('blur', () => buttons.forEach(clear), options);
  return () => {abort.abort(); buttons.forEach(clear);};
}
