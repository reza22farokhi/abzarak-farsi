'use strict';

const profitForm = $('profit-form');

profitForm.addEventListener('submit', event => {
  event.preventDefault();

  const salesInput = $('sales-amount').value.trim();
  const costInput = $('total-cost').value.trim();
  const result = $('profit-result');

  if (salesInput === '' || costInput === '') {
    result.textContent =
      'لطفاً مبلغ فروش و مجموع هزینه‌ها را وارد کنید.';
    return;
  }

  const sales = Number(salesInput);
  const cost = Number(costInput);

  if (!Number.isFinite(sales) || !Number.isFinite(cost)) {
    result.textContent = 'لطفاً اعداد معتبر وارد کنید.';
    return;
  }

  if (sales < 0 || cost < 0) {
    result.textContent =
      'مبلغ فروش و هزینه‌ها نمی‌توانند منفی باشند.';
    return;
  }

  const profit = sales - cost;

  if (!Number.isFinite(profit)) {
    result.textContent =
      'نتیجه خارج از محدوده قابل محاسبه است.';
    return;
  }

  let status;
  let marginText;

  if (profit > 0) {
    status = 'سود';
  } else if (profit < 0) {
    status = 'زیان';
  } else {
    status = 'نقطه سربه‌سر';
  }

  if (sales > 0) {
    const margin = profit / sales * 100;

    if (!Number.isFinite(margin)) {
      result.textContent =
        'محاسبه حاشیه سود خارج از محدوده قابل نمایش است.';
      return;
    }

    marginText = `حاشیه سود: ${fa(margin)}٪`;
  } else {
    marginText = 'حاشیه سود: قابل محاسبه نیست؛ مبلغ فروش صفر است.';
  }

  result.textContent =
    `${status}: ${fa(Math.abs(profit))} | ` +
    `${marginText}`;
});
