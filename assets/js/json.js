(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const input = $('json-input');
  const output = $('json-output');
  const status = $('json-status');
  const maxBytes = 1000000;
  function processJson(mode) {
    const source = input.value;
    if (!source.trim()) { status.textContent = 'ابتدا JSON را وارد کنید.'; return; }
    if (new TextEncoder().encode(source).length > maxBytes) { status.textContent = 'حجم ورودی از یک مگابایت بیشتر است.'; return; }
    try {
      const value = JSON.parse(source);
      if (mode === 'validate') {
        output.value = '';
        status.textContent = 'JSON معتبر است.';
        return;
      }
      const indent = mode === 'minify' ? 0 : Number($('json-indent').value);
      output.value = JSON.stringify(value, null, indent);
      status.textContent = mode === 'minify' ? 'JSON فشرده شد.' : 'JSON با موفقیت قالب‌بندی شد.';
    } catch (error) {
      output.value = '';
      status.textContent = 'JSON نامعتبر است: ' + error.message;
    }
  }
  $('json-format').addEventListener('click', () => processJson('format'));
  $('json-minify').addEventListener('click', () => processJson('minify'));
  $('json-validate').addEventListener('click', () => processJson('validate'));
  $('json-clear').addEventListener('click', () => { input.value = ''; output.value = ''; status.textContent = 'ورودی و خروجی پاک شدند.'; input.focus(); });
  $('json-copy').addEventListener('click', async () => {
    if (!output.value) { status.textContent = 'ابتدا خروجی تولید کنید.'; return; }
    try { await navigator.clipboard.writeText(output.value); status.textContent = 'خروجی کپی شد.'; }
    catch { status.textContent = 'کپی خودکار در دسترس نیست؛ خروجی را دستی انتخاب کنید.'; }
  });
})();
