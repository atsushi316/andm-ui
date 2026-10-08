/* Gallery-only interactions; Native HTML remains the library API. */
(function () {
  function updateTypography() {
    document.querySelectorAll('[data-type-sample]').forEach(function (sample) {
      var metrics = document.querySelector('[data-type-metrics="' + sample.dataset.typeSample + '"]');
      if (!metrics) return;
      var s = getComputedStyle(sample);
      metrics.textContent = s.fontSize + ' / 行高 ' + s.lineHeight + ' / 太さ ' + s.fontWeight + ' / 字間 ' + s.letterSpacing + ' · ' + s.fontFamily;
    });
    var selected = document.getElementById('series-select');
    var note = document.getElementById('type-evidence-note');
    var id = selected && selected.value || 'baseline';
    if (note) note.textContent = ['apple', 'spectrum'].includes(id) ? '本文・見出しのサイズと行高は andm 独自の補完です。公式の役割別数値は今回未確認。フォントファイルは同梱していません。' : ['baseline','soft','dense','technical','editorial','playful'].includes(id) ? 'andm 独自の文字設計です。フォントファイルは同梱せず、端末の代替書体も使います。' : '確認した一次資料を andm の用途へ対応付けています。一部の用途・字間は独自補完です。公式の全スタイル再現ではありません。フォントファイルは同梱していません。';
  }
  window.addEventListener('hashchange', function () { requestAnimationFrame(updateTypography); });
  window.addEventListener('andm:viewchange', updateTypography);
  document.getElementById('series-select').addEventListener('change', function () { requestAnimationFrame(updateTypography); });
  document.getElementById('series-switch').addEventListener('click', function () { requestAnimationFrame(updateTypography); });
  new MutationObserver(updateTypography).observe(document.getElementById('series-preview'), { attributes:true, attributeFilter:['class'] });
  document.querySelectorAll('[data-atom-action]').forEach(function (button) { button.addEventListener('click', function () { document.getElementById('atom-button-result').textContent = button.dataset.atomAction; }); });
  document.querySelectorAll('[data-atom-toggle]').forEach(function (button) { button.addEventListener('click', function () {
    var pressed = button.getAttribute('aria-pressed') !== 'true'; button.setAttribute('aria-pressed', String(pressed));
    document.getElementById('atom-button-result').textContent = pressed ? 'お気に入りに追加しました。' : 'お気に入りを解除しました。';
  }); });
  var form = document.getElementById('atom-error-form');
  form.addEventListener('submit', function (event) {
    event.preventDefault(); var field = document.getElementById('atom-email'); var error = document.getElementById('atom-email-error');
    var invalid = !field.validity.valid;
    error.hidden = !invalid; field.setAttribute('aria-invalid', String(invalid));
    field.setAttribute('aria-describedby', invalid ? 'atom-email-help atom-email-error' : 'atom-email-help');
    document.getElementById('atom-email-status').textContent = invalid ? '' : '入力を確認しました。この見本では送信しません。';
    if (invalid) field.focus();
  });
  document.getElementById('atom-file').addEventListener('change', function (event) {
    var files = Array.from(event.target.files); document.getElementById('atom-file-result').textContent = files.length ? files.map(function (file) { return file.name; }).join('、') : '未選択';
  });
  document.querySelectorAll('[data-indeterminate]').forEach(function (input) { input.indeterminate = true; });
  updateTypography();
})();
