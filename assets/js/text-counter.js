'use strict';

const counterText = $('counter-text');
const counterMessage = $('counter-message');

function updateTextStats() {
  const text = counterText.value;

  const words = text.trim() === ''
    ? 0
    : text.trim().split(/\s+/u).length;

  const characters = Array.from(text).length;
  const charactersWithoutWhitespace =
    Array.from(text.replace(/\s/gu, '')).length;

  const lines = text === '' ? 0 : text.split(/\r\n|\r|\n/u).length;

  const paragraphs = text.trim() === ''
    ? 0
    : text.trim().split(/(?:\r\n|\r|\n)\s*(?:\r\n|\r|\n)+/u)
        .filter(paragraph => paragraph.trim() !== '').length;

  $('word-count').textContent = fa(words);
  $('char-count').textContent = fa(characters);
  $('char-no-space-count').textContent =
    fa(charactersWithoutWhitespace);
  $('line-count').textContent = fa(lines);
  $('paragraph-count').textContent = fa(paragraphs);
}

counterText.addEventListener('input', () => {
  updateTextStats();
  counterMessage.textContent = '';
});

$('clear-text').addEventListener('click', () => {
  counterText.value = '';
  updateTextStats();
  counterMessage.textContent = 'متن پاک شد.';
  counterText.focus();
});

$('copy-text').addEventListener('click', async () => {
  const text = counterText.value;

  if (text === '') {
    counterMessage.textContent = 'متنی برای کپی کردن وجود ندارد.';
    return;
  }

  try {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error('Clipboard API unavailable');
    }

    await navigator.clipboard.writeText(text);
    counterMessage.textContent = 'متن با موفقیت کپی شد.';
  } catch {
    counterMessage.textContent =
      'کپی خودکار در این محیط در دسترس نیست؛ متن را انتخاب و دستی کپی کنید.';
  }
});

updateTextStats();
