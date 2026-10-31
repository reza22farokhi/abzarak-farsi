(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const output = $('uuid-output');
  const status = $('uuid-status');
  function createUuidV4() {
    if (!globalThis.crypto || typeof crypto.getRandomValues !== 'function') {
      throw new Error('مرورگر به مولد تصادفی رمزنگارانه دسترسی ندارد.');
    }
    if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
    const bytes = new Uint8Array(16);
    crypto.getRandomValues(bytes);
    bytes[6] = (bytes[6] & 0x0f) | 0x40;
    bytes[8] = (bytes[8] & 0x3f) | 0x80;
    const hex = Array.from(bytes, value => value.toString(16).padStart(2, '0')).join('');
    return [hex.slice(0, 8), hex.slice(8, 12), hex.slice(12, 16), hex.slice(16, 20), hex.slice(20)].join('-');
  }
  $('uuid-generate').addEventListener('click', () => {
    const count = Number($('uuid-count').value);
    if (!Number.isInteger(count) || count < 1 || count > 100) { status.textContent = 'تعداد باید عدد صحیح بین ۱ تا ۱۰۰ باشد.'; return; }
    try {
      output.value = Array.from({ length: count }, createUuidV4).join('\n');
      status.textContent = count.toLocaleString('fa-IR') + ' شناسه UUID نسخه ۴ ساخته شد.';
    } catch (error) { output.value = ''; status.textContent = error.message; }
  });
  $('uuid-copy').addEventListener('click', async () => {
    if (!output.value) { status.textContent = 'ابتدا شناسه تولید کنید.'; return; }
    try { await navigator.clipboard.writeText(output.value); status.textContent = 'شناسه‌ها کپی شدند.'; }
    catch { status.textContent = 'کپی خودکار در دسترس نیست؛ خروجی را دستی انتخاب کنید.'; }
  });
  $('uuid-clear').addEventListener('click', () => { output.value = ''; status.textContent = 'خروجی پاک شد.'; });
})();
