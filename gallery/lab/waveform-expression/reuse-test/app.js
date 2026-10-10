// Private page implementation. These functions are not an andm-ui public API.
(() => {
  const panel = document.querySelector('#panel');
  const request = document.querySelector('#request');
  const cancel = document.querySelector('#cancel');
  const wave = document.querySelector('#wave');
  const receipt = document.querySelector('#receipt');
  const result = document.querySelector('#result');
  const progress = document.querySelector('#progress');
  const motion = document.querySelector('#motion');
  const motionNote = document.querySelector('#motion-note');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const flat = 'M12 42 L348 42';
  let sequence = 0;
  let job = null;
  let pulse = null;
  let frame = 0;
  let inView = true;
  let pointerHeld = false;
  let keyHeld = false;
  let cancelledGesture = false;
  const visible = () => !document.hidden && inView;

  function stopPulse() {
    cancelAnimationFrame(frame);
    frame = 0;
    pulse = null;
    wave.setAttribute('d', flat);
  }
  function describeMotion() {
    motionNote.textContent = reduced.matches
      ? '動きを減らす設定により、波は停止しています。受付・模擬処理は使えます。'
      : motion.checked ? '受付時だけ有限の波を表示します。' : '波は停止しています。受付・模擬処理は使えます。';
  }
  // Deterministic decorative sine envelope; no data or measured amplitude input.
  function drawPulse(age) {
    const phase = age / 720;
    const strength = 15 * (1 - phase) ** 2;
    const points = [];
    for (let x = 12; x <= 348; x += 4) {
      const u = (x - 12) / 336;
      const y = 42 + strength * Math.sin(u * Math.PI) ** 2 * Math.sin(u * Math.PI * 10 - phase * Math.PI * 5);
      points.push(`${x} ${y.toFixed(2)}`);
    }
    wave.setAttribute('d', `M${points.join(' L')}`);
  }
  function tick(now) {
    frame = 0;
    if (!pulse || !visible()) return;
    const age = pulse.elapsed + now - pulse.start;
    if (age >= 720 || reduced.matches || !motion.checked) { stopPulse(); return; }
    if (now - pulse.lastPaint >= 1000 / 30) {
      drawPulse(age);
      pulse.lastPaint = now;
    }
    frame = requestAnimationFrame(tick);
  }
  function startPulse() {
    stopPulse();
    if (reduced.matches || !motion.checked || !visible()) return;
    pulse = { elapsed: 0, start: performance.now(), lastPaint: -Infinity };
    frame = requestAnimationFrame(tick);
  }
  function scheduleJob() {
    if (!job || !visible() || job.timer !== null) return;
    const current = job;
    current.start = performance.now();
    current.timer = setTimeout(() => {
      if (job !== current) return;
      current.timer = null;
      // If visibility delivery raced this timeout, retain state until visible.
      if (!visible()) { current.remaining = 0; return; }
      job = null;
      progress.value = current.fail ? 0 : 1;
      result.textContent = current.fail
        ? `リクエスト${current.id}：模擬エラー。もう一度リクエストできます。`
        : `リクエスト${current.id}：模擬同期が完了しました。`;
      cancel.disabled = document.activeElement !== cancel;
    }, current.remaining);
  }
  function clearJob() {
    if (job) clearTimeout(job.timer);
    job = null;
  }
  function visibilityChanged() {
    if (!visible()) {
      if (job && job.timer !== null) {
        clearTimeout(job.timer);
        job.timer = null;
        job.remaining = Math.max(0, job.remaining - (performance.now() - job.start));
      }
      if (pulse && frame) {
        pulse.elapsed += performance.now() - pulse.start;
        cancelAnimationFrame(frame);
        frame = 0;
      }
      return;
    }
    scheduleJob();
    if (pulse && !frame) {
      pulse.start = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }
  request.addEventListener('click', () => {
    if (cancelledGesture) { cancelledGesture = false; return; }
    const replaced = job !== null;
    clearJob();
    sequence += 1;
    receipt.textContent = `リクエスト${sequence}を受け付けました。${replaced ? '前の模擬処理を置き換えました。' : ''}`;
    result.textContent = `リクエスト${sequence}：模擬同期中`;
    progress.removeAttribute('value');
    cancel.disabled = false;
    job = { id: sequence, fail: document.querySelector('#fail').checked, remaining: 2400, timer: null, start: 0 };
    scheduleJob();
    startPulse();
  });
  cancel.addEventListener('click', () => {
    if (!job) return;
    const id = job.id;
    clearJob();
    stopPulse();
    progress.value = 0;
    result.textContent = `リクエスト${id}：模擬処理を中止しました。`;
    // Keep focus on the action just used, instead of disabling the focused button.
  });
  document.querySelector('#stop-wave').addEventListener('click', stopPulse);
  cancel.addEventListener('blur', () => { if (!job) cancel.disabled = true; });
  motion.addEventListener('change', () => { stopPulse(); describeMotion(); });
  reduced.addEventListener('change', () => { stopPulse(); describeMotion(); });
  request.addEventListener('pointerdown', () => { pointerHeld = true; cancelledGesture = false; });
  request.addEventListener('keydown', event => {
    if ((event.key === 'Enter' || event.key === ' ') && !event.repeat) {
      keyHeld = true;
      cancelledGesture = false;
    }
  });
  request.addEventListener('keyup', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      keyHeld = false;
      if (cancelledGesture) { event.preventDefault(); cancelledGesture = false; }
    }
  });
  function cancelGesture() {
    if (pointerHeld || keyHeld) cancelledGesture = true;
    stopPulse();
  }
  request.addEventListener('pointercancel', () => {
    cancelGesture(); pointerHeld = false;
    // Cancel only this gesture; a later assistive-technology click is fresh input.
    setTimeout(() => { if (!pointerHeld && !keyHeld) cancelledGesture = false; }, 0);
  });
  document.addEventListener('pointerup', event => {
    if (pointerHeld && !request.contains(event.target)) cancelGesture();
    pointerHeld = false;
    setTimeout(() => { if (!pointerHeld && !keyHeld) cancelledGesture = false; }, 0);
  });
  request.addEventListener('blur', () => {
    cancelGesture(); keyHeld = false;
    setTimeout(() => { if (!pointerHeld && !keyHeld) cancelledGesture = false; }, 0);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') cancelGesture();
  });
  window.addEventListener('blur', cancelGesture);
  document.addEventListener('visibilitychange', visibilityChanged);
  window.addEventListener('pagehide', () => {
    clearJob(); stopPulse(); progress.value = 0;
    result.textContent = 'ページを離れたため模擬処理を中止しました。';
    cancel.disabled = true;
  });
  new IntersectionObserver(entries => {
    inView = entries[0].isIntersecting;
    visibilityChanged();
  }).observe(panel);
  document.querySelector('#series').addEventListener('change', event => {
    panel.className = 'sync-demo__panel';
    if (event.target.value) panel.classList.add(event.target.value);
  });
  describeMotion();
})();
