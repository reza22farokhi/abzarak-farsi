'use strict';

const seoInput = document.getElementById('seo-html');
const seoMessage = document.getElementById('seo-message');
const seoResults = document.getElementById('seo-results');
const seoReport = document.getElementById('seo-report');

let lastReport = [];

function seoAdd(items, level, title, detail) {
  items.push({ level, title, detail });
}

function seoMeta(doc, name) {
  const element = doc.querySelector(
    'meta[name="' + name + '"]'
  );
  return element ? (element.getAttribute('content') || '').trim() : '';
}

function seoProperty(doc, property) {
  const element = doc.querySelector(
    'meta[property="' + property + '"]'
  );
  return element ? (element.getAttribute('content') || '').trim() : '';
}

function seoHtmlAttribute(source, name) {
  const htmlTag = source.match(/<html\b[^>]*>/i);
  if (!htmlTag) return '';

  const pattern = new RegExp(
    "(?:^|\\s)" + name +
      "\\s*=\\s*(?:\"([^\"]*)\"|'([^']*)'|([^\\s/>]+))",
    "i"
  );

  const match = htmlTag[0].match(pattern);
  return match
    ? (match[1] ?? match[2] ?? match[3] ?? '').trim()
    : '';
}

function seoAnalyze() {
  const source = seoInput.value.trim();

  if (!source) {
    seoMessage.textContent = 'ابتدا کد HTML را وارد کنید.';
    seoInput.focus();
    return;
  }

  if (source.length > 1000000) {
    seoMessage.textContent = 'حجم ورودی بیشتر از حد مجاز است.';
    return;
  }

  // Keep pasted HTML in an inert template fragment.
  // Never insert this fragment into the visible document.
  const template = document.createElement('template');
  template.innerHTML = source;
  const doc = template.content;
  const items = [];

  const title = (doc.querySelector('title')?.textContent || '').trim();

  if (!title) {
    seoAdd(items, 'error', 'عنوان صفحه وجود ندارد',
      'یک تگ title توصیفی به بخش head اضافه کنید.');
  } else {
    seoAdd(items, 'pass', 'عنوان صفحه وجود دارد',
      'طول عنوان: ' + title.length + ' نویسه.');

    if (title.length < 15 || title.length > 60) {
      seoAdd(items, 'warning', 'طول عنوان نیاز به بررسی دارد',
        'عنوان را از نظر وضوح، ارتباط با صفحه و نمایش در نتایج جست‌وجو بررسی کنید. بازه ۱۵ تا ۶۰ صرفاً راهنمای تقریبی است.');
    }
  }

  const description = seoMeta(doc, 'description');

  if (!description) {
    seoAdd(items, 'error', 'توضیحات متا وجود ندارد',
      'یک توضیح اختصاصی و مرتبط برای صفحه تعریف کنید.');
  } else {
    seoAdd(items, 'pass', 'توضیحات متا وجود دارد',
      'طول توضیحات: ' + description.length + ' نویسه.');

    if (description.length < 50 || description.length > 170) {
      seoAdd(items, 'warning', 'طول توضیحات متا را بررسی کنید',
        'توضیح را مختصر، دقیق و متناسب با محتوای صفحه بنویسید. طول مناسب به شرایط نمایش در نتایج بستگی دارد.');
    }
  }

  const h1Elements = doc.querySelectorAll('h1');

  if (h1Elements.length === 0) {
    seoAdd(items, 'error', 'تیتر H1 وجود ندارد',
      'برای عنوان اصلی محتوای صفحه یک H1 مناسب در نظر بگیرید.');
  } else if (h1Elements.length > 1) {
    seoAdd(items, 'warning', 'چند تیتر H1 پیدا شد',
      'ساختار تیترها را برای وضوح و دسترس‌پذیری بررسی کنید. وجود چند H1 به‌خودی‌خود الزاماً خطای گوگل نیست.');
  } else {
    seoAdd(items, 'pass', 'یک تیتر H1 پیدا شد',
      'متن H1: ' + h1Elements[0].textContent.trim().slice(0, 160));
  }

  const lang = seoHtmlAttribute(source, 'lang');
  const dir = seoHtmlAttribute(source, 'dir');

  if (!lang) {
    seoAdd(items, 'error', 'زبان سند مشخص نشده است',
      'ویژگی lang را روی عنصر html تنظیم کنید.');
  } else {
    seoAdd(items, 'pass', 'زبان سند مشخص است', 'lang="' + lang + '"');
  }

  if (!dir) {
    seoAdd(items, 'warning', 'جهت نوشتار مشخص نشده است',
      'برای صفحات فارسی معمولاً dir="rtl" مناسب است.');
  } else {
    seoAdd(items, 'pass', 'جهت نوشتار مشخص است', 'dir="' + dir + '"');
  }

  if (!doc.querySelector('meta[name="viewport"]')) {
    seoAdd(items, 'error', 'Viewport وجود ندارد',
      'برای نمایش مناسب در موبایل، meta viewport اضافه کنید.');
  } else {
    seoAdd(items, 'pass', 'Viewport پیدا شد',
      'تنظیمات نمایش موبایل را نیز در مرورگر واقعی آزمایش کنید.');
  }

  const canonical = doc.querySelector('link[rel="canonical"]');

  if (!canonical || !canonical.getAttribute('href')?.trim()) {
    seoAdd(items, 'warning', 'Canonical پیدا نشد',
      'در صورت نیاز، نشانی اصلی و ترجیحی صفحه را مشخص کنید.');
  } else {
    seoAdd(items, 'pass', 'Canonical تعریف شده است',
      'مقدار href: ' + canonical.getAttribute('href').trim());
  }

  const robots = seoMeta(doc, 'robots');

  if (robots) {
    if (/\bnoindex\b/i.test(robots)) {
      seoAdd(items, 'warning', 'دستور noindex وجود دارد',
        'بررسی کنید که جلوگیری از ایندکس‌شدن این صفحه عمدی باشد.');
    } else {
      seoAdd(items, 'pass', 'دستور Robots بررسی شد', robots);
    }
  } else {
    seoAdd(items, 'warning', 'متای Robots وجود ندارد',
      'نبود این تگ به‌تنهایی خطا نیست؛ رفتار پیش‌فرض موتورهای جست‌وجو را در نظر بگیرید.');
  }

  const ogTitle = seoProperty(doc, 'og:title');
  const ogDescription = seoProperty(doc, 'og:description');

  if (!ogTitle) {
    seoAdd(items, 'warning', 'og:title وجود ندارد',
      'برای کنترل عنوان پیش‌نمایش شبکه‌های اجتماعی آن را اضافه کنید.');
  } else {
    seoAdd(items, 'pass', 'og:title وجود دارد', ogTitle);
  }

  if (!ogDescription) {
    seoAdd(items, 'warning', 'og:description وجود ندارد',
      'برای بهبود پیش‌نمایش اشتراک‌گذاری، توضیحات Open Graph را بررسی کنید.');
  } else {
    seoAdd(items, 'pass', 'og:description وجود دارد', ogDescription);
  }

  const images = Array.from(doc.querySelectorAll('img'));
  const missingAlt = images.filter(img => !img.hasAttribute('alt'));

  if (missingAlt.length) {
    seoAdd(items, 'warning', 'تصاویر بدون ویژگی alt',
      missingAlt.length + ' تصویر از ' + images.length +
      ' تصویر ویژگی alt ندارند.');
  } else {
    seoAdd(items, 'pass', 'ویژگی alt تصاویر بررسی شد',
      'تعداد تصاویر: ' + images.length +
      '. مناسب‌بودن متن جایگزین نیز باید دستی بررسی شود.');
  }

  const links = Array.from(doc.querySelectorAll('a'));
  const emptyLinks = links.filter(link =>
    !link.getAttribute('href')?.trim()
  );

  if (emptyLinks.length) {
    seoAdd(items, 'warning', 'لینک‌های بدون href',
      emptyLinks.length + ' لینک از ' + links.length +
      ' لینک مقصد مشخص ندارند.');
  } else {
    seoAdd(items, 'pass', 'مقصد لینک‌ها بررسی شد',
      'تعداد لینک‌ها: ' + links.length +
      '. معتبر بودن مقصدها به‌صورت آنلاین بررسی نشده است.');
  }

  let previousLevel = 0;
  let skippedLevels = 0;

  for (const heading of doc.querySelectorAll('h1,h2,h3,h4,h5,h6')) {
    const level = Number(heading.tagName.slice(1));

    if (previousLevel && level > previousLevel + 1) {
      skippedLevels++;
    }

    previousLevel = level;
  }

  if (skippedLevels) {
    seoAdd(items, 'warning', 'پرش در ساختار تیترها',
      skippedLevels + ' مورد پرش در سطح تیتر پیدا شد. ساختار معنایی را بررسی کنید.');
  } else {
    seoAdd(items, 'pass', 'ساختار تیترها بررسی شد',
      'تعداد تیترهای دارای سطح مشخص: ' +
      doc.querySelectorAll('h1,h2,h3,h4,h5,h6').length);
  }

  // Heuristic HTML score: an internal checklist, not a Google ranking score.
  let score = 0;

  // Title: 15 points.
  score += !title ? 0 : (
    title.length >= 15 && title.length <= 60 ? 15 : 8
  );

  // Meta description: 15 points.
  score += !description ? 0 : (
    description.length >= 50 && description.length <= 170 ? 15 : 8
  );

  // H1 structure: 10 points.
  score += h1Elements.length === 1 ? 10 :
    h1Elements.length > 1 ? 5 : 0;

  // Language and writing direction: 5 points each.
  score += lang ? 5 : 0;
  score += dir ? 5 : 0;

  // Viewport: 10 points.
  score += doc.querySelector('meta[name="viewport"]') ? 10 : 0;

  // Canonical URL: 10 points when a non-empty href exists.
  score += canonical && canonical.getAttribute('href')?.trim() ? 10 : 0;

  // Open Graph title and description: 5 points each.
  score += ogTitle ? 5 : 0;
  score += ogDescription ? 5 : 0;

  // Image alt attributes: 10 points if no image lacks the attribute.
  score += missingAlt.length === 0 ? 10 : 0;

  // Heading hierarchy: 5 points if there are no detected skipped levels.
  score += skippedLevels === 0 ? 5 : 0;

  // Links: 5 points if no anchor is missing a non-empty href.
  score += emptyLinks.length === 0 ? 5 : 0;

  const scoreLabels = score >= 90
    ? 'عالی'
    : score >= 75
      ? 'خوب'
      : score >= 60
        ? 'متوسط'
        : 'نیازمند بهبود';

  document.getElementById('seo-score').textContent =
    score.toLocaleString('fa-IR');
  document.getElementById('seo-score-label').textContent =
    'وضعیت: ' + scoreLabels +
    ' — این امتیاز داخلی و تقریبی است، نه امتیاز رسمی گوگل.';

  const errors = items.filter(item => item.level === 'error').length;
  const warnings = items.filter(item => item.level === 'warning').length;
  const passes = items.filter(item => item.level === 'pass').length;

  document.getElementById('seo-errors').textContent =
    errors.toLocaleString('fa-IR');
  document.getElementById('seo-warnings').textContent =
    warnings.toLocaleString('fa-IR');
  document.getElementById('seo-passes').textContent =
    passes.toLocaleString('fa-IR');

  seoReport.replaceChildren();

  for (const item of items) {
    const li = document.createElement('li');
    const heading = document.createElement('strong');
    const detail = document.createElement('p');

    const labels = {
      error: 'خطا',
      warning: 'هشدار',
      pass: 'قابل قبول'
    };

    heading.textContent = '[' + labels[item.level] + '] ' + item.title;
    detail.textContent = item.detail;

    li.append(heading, detail);
    seoReport.appendChild(li);
  }

  lastReport = items;
  seoResults.hidden = false;
  seoMessage.textContent =
    'بررسی تمام شد. این گزارش فقط ساختار HTML ورودی را ارزیابی می‌کند.';
}

document.getElementById('seo-analyze').addEventListener('click', seoAnalyze);

document.getElementById('seo-clear').addEventListener('click', () => {
  seoInput.value = '';
  seoResults.hidden = true;
  seoReport.replaceChildren();
  lastReport = [];
  seoMessage.textContent = 'ورودی و گزارش پاک شدند.';
  seoInput.focus();
});

document.getElementById('seo-copy').addEventListener('click', async () => {
  const message = document.getElementById('seo-copy-message');

  if (!lastReport.length) {
    message.textContent = 'ابتدا بررسی را اجرا کنید.';
    return;
  }

  const report = lastReport.map(item => {
    return '[' + item.level.toUpperCase() + '] ' +
      item.title + '\n' + item.detail;
  }).join('\n\n');

  try {
    if (!navigator.clipboard?.writeText) {
      throw new Error('Clipboard unavailable');
    }

    await navigator.clipboard.writeText(report);
    message.textContent = 'گزارش کپی شد.';
  } catch {
    message.textContent =
      'کپی خودکار در دسترس نیست؛ گزارش را می‌توانید دستی انتخاب کنید.';
  }
});
