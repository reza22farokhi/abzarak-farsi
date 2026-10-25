'use strict';

const discountForm = $('discount-form');

discountForm.addEventListener('submit', event => {
  event.preventDefault();

  const priceInput = $('original-price').value.trim();
  const percentInput = $('discount-percent').value.trim();
  const result = $('discount-result');

  if (priceInput === '' || percentInput === '') {
    result.textContent = 'لطفاً قیمت اولیه و درصد تخفیف را وارد کنید.';
    return;
  }

  const price = Number(priceInput);
  const percent = Number(percentInput);

  if (!Number.isFinite(price) || !Number.isFinite(percent)) {
    result.textContent = 'لطفاً اعداد معتبر وارد کنید.';
    return;
  }

  if (price < 0) {
    result.textContent = 'قیمت اولیه نمی‌تواند منفی باشد.';
    return;
  }

  if (percent < 0 || percent > 100) {
    result.textContent = 'درصد تخفیف باید بین صفر و صد باشد.';
    return;
  }

  const discountAmount = price * percent / 100;
  const finalPrice = price - discountAmount;

  if (!Number.isFinite(discountAmount) || !Number.isFinite(finalPrice)) {
    result.textContent = 'نتیجه خارج از محدوده قابل محاسبه است.';
    return;
  }

  result.textContent =
    `مبلغ تخفیف: ${fa(discountAmount)} | ` +
    `قیمت نهایی: ${fa(finalPrice)}`;
});
