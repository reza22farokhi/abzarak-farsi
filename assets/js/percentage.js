'use strict';

const percentageForm = $('percentage-form');

percentageForm.addEventListener('submit', event => {
  event.preventDefault();

  const percentInput = $('percent').value.trim();
  const amountInput = $('amount').value.trim();
  const result = $('percent-result');

  if (percentInput === '' || amountInput === '') {
    result.textContent = 'لطفاً درصد و عدد اصلی را وارد کنید.';
    return;
  }

  const percent = Number(percentInput);
  const amount = Number(amountInput);

  if (!Number.isFinite(percent) || !Number.isFinite(amount)) {
    result.textContent = 'لطفاً اعداد معتبر وارد کنید.';
    return;
  }

  const answer = percent / 100 * amount;

  if (!Number.isFinite(answer)) {
    result.textContent = 'نتیجه خارج از محدوده قابل محاسبه است.';
    return;
  }

  result.textContent =
    `${fa(percent)}٪ از ${fa(amount)} برابر است با ${fa(answer)}`;
});
