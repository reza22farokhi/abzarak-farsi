(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const MAX_DATE_MS = 8640000000000000;
  function show(id, value) { $(id).textContent = value; }
  function localDateTimeValue(date) {
    const pad = value => String(value).padStart(2, '0');
    return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate()) +
      'T' + pad(date.getHours()) + ':' + pad(date.getMinutes()) + ':' + pad(date.getSeconds()) +
      '.' + String(date.getMilliseconds()).padStart(3, '0');
  }
  $('timestamp-convert').addEventListener('click', () => {
    const raw = $('timestamp-input').value.trim();
    if (!raw || !/^[+-]?(?:\d+\.?\d*|\.\d+)$/.test(raw)) { show('timestamp-status', 'یک Timestamp عددی معتبر وارد کنید.'); return; }
    const value = Number(raw);
    const milliseconds = $('timestamp-unit').value === 'seconds' ? value * 1000 : value;
    if (!Number.isFinite(milliseconds) || Math.abs(milliseconds) > MAX_DATE_MS) { show('timestamp-status', 'مقدار خارج از محدوده قابل پشتیبانی تاریخ است.'); return; }
    const date = new Date(milliseconds);
    if (Number.isNaN(date.getTime())) { show('timestamp-status', 'تاریخ قابل محاسبه نیست.'); return; }
    show('timestamp-local', new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full', timeStyle: 'medium' }).format(date));
    show('timestamp-utc', date.toISOString());
    show('timestamp-seconds', String(date.getTime() / 1000));
    show('timestamp-milliseconds', String(date.getTime()));
    show('timestamp-status', 'تبدیل با موفقیت انجام شد.');
    $('timestamp-date').value = localDateTimeValue(date);
  });
  $('timestamp-from-date').addEventListener('click', () => {
    const value = $('timestamp-date').value;
    if (!value) { show('timestamp-date-status', 'تاریخ و ساعت را انتخاب کنید.'); return; }
    const milliseconds = new Date(value).getTime();
    if (!Number.isFinite(milliseconds) || Math.abs(milliseconds) > MAX_DATE_MS) { show('timestamp-date-status', 'تاریخ واردشده معتبر نیست.'); return; }
    show('date-seconds', String(milliseconds / 1000));
    show('date-milliseconds', String(milliseconds));
    show('timestamp-date-status', 'تبدیل بر اساس منطقه زمانی محلی دستگاه انجام شد.');
  });
  $('timestamp-date').value = localDateTimeValue(new Date());
})();
