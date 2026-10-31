(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const input = $('base64-input');
  const output = $('base64-output');
  const status = $('base64-status');
  function bytesToBase64(bytes) {
    let binary = '';
    const chunkSize = 0x8000;
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
    }
    return btoa(binary);
  }
  function encode() {
    if (!input.value) { status.textContent = 'متنی برای تبدیل وارد کنید.'; return; }
    const bytes = new TextEncoder().encode(input.value);
    output.value = bytesToBase64(bytes);
    status.textContent = 'متن با UTF-8 به Base64 استاندارد تبدیل شد.';
  }
  function decode() {
    const source = input.value.replace(/\s+/g, '');
    if (!source) { status.textContent = 'رشته Base64 را وارد کنید.'; return; }
    if (!/^[A-Za-z0-9+/]*={0,2}$/.test(source)) {
      status.textContent = 'ساختار Base64 استاندارد معتبر نیست.'; return;
    }
    const unpadded = source.replace(/=+$/, '');
    if (unpadded.length % 4 === 1 || (source.includes('=') && source.length % 4 !== 0)) {
      status.textContent = 'ساختار Base64 استاندارد معتبر نیست.'; return;
    }
    const padded = unpadded + '='.repeat((4 - unpadded.length % 4) % 4);
    if (!/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(padded)) {
      status.textContent = 'ساختار Base64 استاندارد معتبر نیست.'; return;
    }
    try {
      const binary = atob(padded);
      const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
      output.value = new TextDecoder('utf-8', { fatal: true }).decode(bytes);
      status.textContent = 'Base64 با موفقیت به متن UTF-8 تبدیل شد.';
    } catch {
      output.value = '';
      status.textContent = 'داده Base64 یا متن UTF-8 معتبر نیست.';
    }
  }
  $('base64-encode').addEventListener('click', encode);
  $('base64-decode').addEventListener('click', decode);
  $('base64-clear').addEventListener('click', () => { input.value = ''; output.value = ''; status.textContent = 'ورودی و خروجی پاک شدند.'; input.focus(); });
  $('base64-copy').addEventListener('click', async () => {
    if (!output.value) { status.textContent = 'ابتدا خروجی تولید کنید.'; return; }
    try { await navigator.clipboard.writeText(output.value); status.textContent = 'خروجی کپی شد.'; }
    catch { status.textContent = 'کپی خودکار در دسترس نیست؛ خروجی را دستی انتخاب کنید.'; }
  });
})();
