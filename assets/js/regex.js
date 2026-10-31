(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  let activeWorker = null;
  let timeoutId = null;
  const status = $('regex-status');
  const summary = $('regex-summary');
  const list = $('regex-matches');
  function stopWorker() {
    if (timeoutId !== null) window.clearTimeout(timeoutId);
    timeoutId = null;
    if (activeWorker) activeWorker.terminate();
    activeWorker = null;
  }
  $('regex-test').addEventListener('click', () => {
    stopWorker();
    list.replaceChildren();
    summary.textContent = '';
    const pattern = $('regex-pattern').value;
    const text = $('regex-text').value;
    if (!pattern) { status.textContent = 'ابتدا الگوی Regex را وارد کنید.'; return; }
    if (pattern.length > 512 || text.length > 50000) { status.textContent = 'حداکثر طول الگو ۵۱۲ و متن ۵۰٬۰۰۰ نویسه است.'; return; }
    if (typeof Worker !== 'function') { status.textContent = 'این مرورگر از Web Worker پشتیبانی نمی‌کند؛ برای جلوگیری از قفل‌شدن صفحه، اجرا متوقف شد.'; return; }
    const flags = ['g'];
    for (const flag of ['i', 'm', 's', 'u']) if ($('regex-' + flag).checked) flags.push(flag);
    try {
      activeWorker = new Worker('../assets/js/workers/regex-worker.js');
      status.textContent = 'در حال بررسی در پردازش جداگانه…';
      timeoutId = window.setTimeout(() => {
        stopWorker();
        status.textContent = 'زمان اجرای الگو بیش از حد مجاز شد؛ Worker متوقف شد. الگو را ساده‌تر کنید.';
      }, 700);
      activeWorker.onmessage = event => {
        stopWorker();
        const result = event.data;
        if (result.error) { status.textContent = 'الگوی Regex نامعتبر است: ' + result.error; return; }
        summary.textContent = result.matches.length.toLocaleString('fa-IR') +
          ' تطبیق پیدا شد' + (result.truncated ? '؛ نمایش به ۲۰۰ مورد محدود شد.' : '.');
        for (const match of result.matches) {
          const item = document.createElement('li');
          const strong = document.createElement('strong');
          const detail = document.createElement('p');
          strong.textContent = 'تطبیق: ' + match.value;
          detail.textContent = 'موقعیت شروع: ' + match.index +
            (match.groups.length ? ' | گروه‌ها: ' + JSON.stringify(match.groups) : '');
          item.append(strong, detail);
          list.appendChild(item);
        }
        status.textContent = 'بررسی کامل شد.';
      };
      activeWorker.onerror = () => { stopWorker(); status.textContent = 'اجرای Regex با خطای داخلی مواجه شد.'; };
      activeWorker.postMessage({ pattern, flags: flags.join(''), text });
    } catch (error) {
      stopWorker();
      status.textContent = 'ساخت Worker ناموفق بود: ' + error.message;
    }
  });
  $('regex-clear').addEventListener('click', () => {
    stopWorker();
    $('regex-pattern').value = '';
    $('regex-text').value = '';
    list.replaceChildren();
    summary.textContent = 'هنوز آزمایشی اجرا نشده است.';
    status.textContent = 'ورودی و نتایج پاک شدند.';
  });
  window.addEventListener('pagehide', stopWorker);
})();
