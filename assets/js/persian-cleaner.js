'use strict';

const originalText = $('original-text');
const cleanedText = $('cleaned-text');
const cleanerMessage = $('cleaner-message');

function normalizePersianText(text) {
  return text
    .replace(/ي/g, 'ی')
    .replace(/ك/g, 'ک')
    .split(/\r\n|\r|\n/u)
    .map(line => line.replace(/[^\S\r\n]+/gu, ' ').trim())
    .join('\n')
    .replace(/[ \t]*([،؛:!?؟,.])/gu, '$1')
    .replace(/([،؛:!?؟,.]){2,}/gu, '$1')
    .replace(/\n{3,}/gu, '\n\n')
    .trim();
}

$('clean-text').addEventListener('click', () => {
  if (originalText.value.trim() === '') {
    cleanedText.value = '';
    cleanerMessage.textContent = 'ابتدا متن موردنظر را وارد کنید.';
    return;
  }

  cleanedText.value = normalizePersianText(originalText.value);
  cleanerMessage.textContent = 'متن با موفقیت پاک‌سازی شد.';
});

$('clear-text').addEventListener('click', () => {
  originalText.value = '';
  cleanedText.value = '';
  cleanerMessage.textContent = 'هر دو کادر پاک شدند.';
  originalText.focus();
});

$('copy-result').addEventListener('click', async () => {
  if (cleanedText.value === '') {
    cleanerMessage.textContent = 'نتیجه‌ای برای کپی کردن وجود ندارد.';
    return;
  }

  try {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error('Clipboard API unavailable');
    }

    await navigator.clipboard.writeText(cleanedText.value);
    cleanerMessage.textContent = 'نتیجه با موفقیت کپی شد.';
  } catch {
    cleanerMessage.textContent =
      'کپی خودکار در این محیط در دسترس نیست؛ متن نتیجه را دستی کپی کنید.';
  }
});
