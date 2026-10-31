(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const input = $('url-input');
  const output = $('url-output');
  const status = $('url-status');
  function convert(operation) {
    const value = input.value;
    if (!value) { status.textContent = 'متن یا URL را وارد کنید.'; return; }
    const fullUri = $('url-mode').value === 'uri';
    try {
      if (operation === 'encode') output.value = fullUri ? encodeURI(value) : encodeURIComponent(value);
      else output.value = fullUri ? decodeURI(value) : decodeURIComponent(value);
      status.textContent = operation === 'encode' ? 'کدگذاری انجام شد.' : 'رمزگشایی انجام شد.';
    } catch (error) {
      output.value = '';
      status.textContent = 'ورودی قابل تبدیل نیست: ' + error.message;
    }
  }
  $('url-encode').addEventListener('click', () => convert('encode'));
  $('url-decode').addEventListener('click', () => convert('decode'));
  $('url-clear').addEventListener('click', () => { input.value = ''; output.value = ''; status.textContent = 'ورودی و خروجی پاک شدند.'; input.focus(); });
  $('url-copy').addEventListener('click', async () => {
    if (!output.value) { status.textContent = 'ابتدا خروجی تولید کنید.'; return; }
    try { await navigator.clipboard.writeText(output.value); status.textContent = 'خروجی کپی شد.'; }
    catch { status.textContent = 'کپی خودکار در دسترس نیست؛ خروجی را دستی انتخاب کنید.'; }
  });
})();
