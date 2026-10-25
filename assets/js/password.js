'use strict';

const passwordLength = $('password-length');
const lengthValue = $('length-value');
const passwordOutput = $('password-output');
const passwordMessage = $('password-message');
const strengthResult = $('strength-result');

const characterOptions = [
  { id: 'include-uppercase', characters: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' },
  { id: 'include-lowercase', characters: 'abcdefghijklmnopqrstuvwxyz' },
  { id: 'include-digits', characters: '0123456789' },
  { id: 'include-symbols', characters: '!@#$%^&*()-_=+[]{};:,.?/~' }
];

function secureRandomIndex(max) {
  if (!Number.isSafeInteger(max) || max < 1) {
    throw new RangeError('Invalid character pool');
  }

  const range = 0x100000000;
  const limit = Math.floor(range / max) * max;
  const values = new Uint32Array(1);
  let value;

  do {
    crypto.getRandomValues(values);
    value = values[0];
  } while (value >= limit);

  return value % max;
}

function shuffleSecurely(items) {
  for (let i = items.length - 1; i > 0; i -= 1) {
    const j = secureRandomIndex(i + 1);
    [items[i], items[j]] = [items[j], items[i]];
  }

  return items;
}

function estimateStrength(length, poolSize) {
  const bits = length * Math.log2(poolSize);

  if (bits < 40) return 'ضعیف';
  if (bits < 60) return 'متوسط';
  if (bits < 80) return 'خوب';
  return 'قوی';
}

function generateSecurePassword(length, options, excludeAmbiguous) {
  if (!Number.isInteger(length) || length < 8 || length > 64) {
    throw new RangeError('Invalid password length');
  }

  const groups = options
    .filter(option => $(option.id).checked)
    .map(option => excludeAmbiguous
      ? option.characters.replace(/[O0Il1]/g, '')
      : option.characters)
    .filter(characters => characters.length > 0);

  if (groups.length === 0) {
    throw new Error('NO_CHARACTER_TYPES');
  }

  const pool = groups.join('');
  const result = groups.map(
    group => group[secureRandomIndex(group.length)]
  );

  while (result.length < length) {
    result.push(pool[secureRandomIndex(pool.length)]);
  }

  shuffleSecurely(result);

  return {
    password: result.join(''),
    poolSize: pool.length
  };
}

passwordLength.addEventListener('input', () => {
  lengthValue.textContent = fa(Number(passwordLength.value));
});

$('generate-password').addEventListener('click', () => {
  try {
    const result = generateSecurePassword(
      Number(passwordLength.value),
      characterOptions,
      $('exclude-ambiguous').checked
    );

    passwordOutput.value = result.password;
    strengthResult.textContent =
      'قدرت تقریبی رمز: ' +
      estimateStrength(result.password.length, result.poolSize);

    passwordMessage.textContent =
      'رمز در همین مرورگر تولید شد.';
  } catch (error) {
    passwordOutput.value = '';
    strengthResult.textContent = '';

    passwordMessage.textContent =
      error.message === 'NO_CHARACTER_TYPES'
        ? 'حداقل یک نوع کاراکتر را انتخاب کنید.'
        : 'تولید رمز ناموفق بود؛ مرورگر و اتصال امن صفحه را بررسی کنید.';
  }
});

$('copy-password').addEventListener('click', async () => {
  if (passwordOutput.value === '') {
    passwordMessage.textContent = 'ابتدا یک رمز تولید کنید.';
    return;
  }

  try {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      throw new Error('Clipboard unavailable');
    }

    await navigator.clipboard.writeText(passwordOutput.value);
    passwordMessage.textContent = 'رمز کپی شد.';
  } catch {
    passwordMessage.textContent =
      'کپی خودکار در دسترس نیست؛ رمز را دستی انتخاب و کپی کنید.';
  }
});

$('clear-password').addEventListener('click', () => {
  passwordOutput.value = '';
  strengthResult.textContent = '';
  passwordMessage.textContent = 'نتیجه پاک شد.';
});
