// دایرکتوری ریشه
const basePath = window.location.pathname.includes('/tools/') || window.location.pathname.includes('/blog/') ? '../' : './';

// کاتالوگ کامل ابزارها و مقالات
const catalog = [
  // --- ابزارها ---
  { title: "شمارشگر کلمات", url: "tools/word-counter.html", type: "tool", icon: "📝", keywords: "متن کاراکتر خط" },
  { title: "تبدیل ارقام", url: "tools/digit-converter.html", type: "tool", icon: "🔢", keywords: "فارسی انگلیسی عدد" },
  { title: "پاک‌سازی متن", url: "tools/persian-cleaner.html", type: "tool", icon: "🧹", keywords: "نیم فاصله عربی اصلاح" },
  { title: "Base64", url: "tools/base64.html", type: "tool", icon: "🔤", keywords: "انکود دیکود رمز" },
  { title: "JSON Formatter", url: "tools/json.html", type: "tool", icon: "{ }", keywords: "فرمت ولیدیتور برنامه نویسی" },
  { title: "URL Encoder", url: "tools/url-encode.html", type: "tool", icon: "🌐", keywords: "آدرس لینک" },
  { title: "مبدل تاریخ", url: "tools/date-converter.html", type: "tool", icon: "📅", keywords: "شمسی میلادی جلالی" },
  { title: "Timestamp", url: "tools/timestamp.html", type: "tool", icon: "⏱️", keywords: "یونیکس زمان" },
  { title: "اوقات شرعی", url: "tools/prayer-times.html", type: "tool", icon: "🕌", keywords: "اذان نماز تهران" },
  { title: "ساعت جهانی", url: "tools/world-clock.html", type: "tool", icon: "🌍", keywords: "زمان شهرها کشور" },
  { title: "محاسبه BMI", url: "tools/bmi-calculator.html", type: "tool", icon: "⚖️", keywords: "وزن قد توده بدنی" },
  { title: "مبدل واحد", url: "tools/unit-converter.html", type: "tool", icon: "📐", keywords: "طول وزن دما سانتی" },
  { title: "محاسبه درصد", url: "tools/percentage.html", type: "tool", icon: "％", keywords: "درصدگیری" },
  { title: "محاسبه تخفیف", url: "tools/discount.html", type: "tool", icon: "🏷️", keywords: "قیمت فروشگاه" },
  { title: "محاسبه سود", url: "tools/profit.html", type: "tool", icon: "💰", keywords: "زیان معامله" },
  { title: "محاسبه حقوق", url: "tools/salary-calculator.html", type: "tool", icon: "💵", keywords: "دستمزد مالیات بیمه" },
  { title: "محاسبه وام", url: "tools/loan-calculator.html", type: "tool", icon: "🏦", keywords: "قسط اقساط بانک" },
  { title: "محاسبه سن", url: "tools/age-calculator.html", type: "tool", icon: "🎂", keywords: "تولد اختلاف سن" },
  { title: "اعتبارسنجی کد ملی", url: "tools/national-id.html", type: "tool", icon: "🆔", keywords: "کدملی بررسی" },
  { title: "عدد به حروف", url: "tools/number-to-words.html", type: "tool", icon: "🔠", keywords: "چک فاکتور" },
  { title: "متن تستی", url: "tools/lorem-ipsum.html", type: "tool", icon: "📄", keywords: "لورم ساختگی" },
  { title: "سازنده رمز عبور", url: "tools/password-generator.html", type: "tool", icon: "🔑", keywords: "پسورد امن" },
  { title: "سازنده هش", url: "tools/hash-generator.html", type: "tool", icon: "🔒", keywords: "SHA رمزنگاری" },
  { title: "UUID Generator", url: "tools/uuid.html", type: "tool", icon: "🆔", keywords: "یکتا شناسه" },
  { title: "مبدل رنگ", url: "tools/color-converter.html", type: "tool", icon: "🎨", keywords: "HEX RGB" },
  { title: "QR Code", url: "tools/qr-generator.html", type: "tool", icon: "📱", keywords: "کیو آر کد" },
  { title: "کوتاه‌کننده لینک", url: "tools/short-link.html", type: "tool", icon: "🔗", keywords: "URL شورت" },
  { title: "Regex Tester", url: "tools/regex.html", type: "tool", icon: ".*", keywords: "عبارات منظم" },
  { title: "آنالیز SEO", url: "tools/seo-audit.html", type: "tool", icon: "📊", keywords: "سئو سایت" },
  { title: "فشرده‌ساز عکس", url: "tools/image-compressor.html", type: "tool", icon: "🖼️", keywords: "کاهش حجم تصویر" },
  { title: "تبدیل سلسیوس (°C) به فارنهایت (°F)", url: "tools/celsius-to-fahrenheit.html", type: "tool", icon: "🌡️", keywords: "تبدیل دما celsius fahrenheit" },
  { title: "تبدیل سلسیوس (°C) به کلوین (K)", url: "tools/celsius-to-kelvin.html", type: "tool", icon: "🌡️", keywords: "تبدیل دما celsius kelvin" },
  { title: "تبدیل فارنهایت (°F) به سلسیوس (°C)", url: "tools/fahrenheit-to-celsius.html", type: "tool", icon: "🌡️", keywords: "تبدیل دما fahrenheit celsius" },
  { title: "تبدیل فارنهایت (°F) به کلوین (K)", url: "tools/fahrenheit-to-kelvin.html", type: "tool", icon: "🌡️", keywords: "تبدیل دما fahrenheit kelvin" },
  { title: "تبدیل کلوین (K) به سلسیوس (°C)", url: "tools/kelvin-to-celsius.html", type: "tool", icon: "🌡️", keywords: "تبدیل دما kelvin celsius" },
  { title: "تبدیل کلوین (K) به فارنهایت (°F)", url: "tools/kelvin-to-fahrenheit.html", type: "tool", icon: "🌡️", keywords: "تبدیل دما kelvin fahrenheit" },
  { title: "تبدیل سال 1395 شمسی به میلادی", url: "tools/shamsi-1395.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1395 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1396 شمسی به میلادی", url: "tools/shamsi-1396.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1396 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1397 شمسی به میلادی", url: "tools/shamsi-1397.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1397 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1398 شمسی به میلادی", url: "tools/shamsi-1398.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1398 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1399 شمسی به میلادی", url: "tools/shamsi-1399.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1399 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1400 شمسی به میلادی", url: "tools/shamsi-1400.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1400 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1401 شمسی به میلادی", url: "tools/shamsi-1401.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1401 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1402 شمسی به میلادی", url: "tools/shamsi-1402.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1402 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1403 شمسی به میلادی", url: "tools/shamsi-1403.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1403 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1404 شمسی به میلادی", url: "tools/shamsi-1404.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1404 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1405 شمسی به میلادی", url: "tools/shamsi-1405.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1405 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1406 شمسی به میلادی", url: "tools/shamsi-1406.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1406 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1407 شمسی به میلادی", url: "tools/shamsi-1407.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1407 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1408 شمسی به میلادی", url: "tools/shamsi-1408.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1408 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1409 شمسی به میلادی", url: "tools/shamsi-1409.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1409 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1410 شمسی به میلادی", url: "tools/shamsi-1410.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1410 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1411 شمسی به میلادی", url: "tools/shamsi-1411.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1411 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1412 شمسی به میلادی", url: "tools/shamsi-1412.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1412 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1413 شمسی به میلادی", url: "tools/shamsi-1413.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1413 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1414 شمسی به میلادی", url: "tools/shamsi-1414.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1414 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1415 شمسی به میلادی", url: "tools/shamsi-1415.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1415 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1416 شمسی به میلادی", url: "tools/shamsi-1416.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1416 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1417 شمسی به میلادی", url: "tools/shamsi-1417.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1417 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1418 شمسی به میلادی", url: "tools/shamsi-1418.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1418 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1419 شمسی به میلادی", url: "tools/shamsi-1419.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1419 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 1420 شمسی به میلادی", url: "tools/shamsi-1420.html", type: "tool", icon: "📅", keywords: "تبدیل سال 1420 شمسی میلادی تاریخ" },
  { title: "تبدیل سال 2016 میلادی به شمسی", url: "tools/miladi-2016.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2016 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2017 میلادی به شمسی", url: "tools/miladi-2017.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2017 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2018 میلادی به شمسی", url: "tools/miladi-2018.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2018 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2019 میلادی به شمسی", url: "tools/miladi-2019.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2019 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2020 میلادی به شمسی", url: "tools/miladi-2020.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2020 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2021 میلادی به شمسی", url: "tools/miladi-2021.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2021 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2022 میلادی به شمسی", url: "tools/miladi-2022.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2022 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2023 میلادی به شمسی", url: "tools/miladi-2023.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2023 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2024 میلادی به شمسی", url: "tools/miladi-2024.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2024 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2025 میلادی به شمسی", url: "tools/miladi-2025.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2025 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2026 میلادی به شمسی", url: "tools/miladi-2026.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2026 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2027 میلادی به شمسی", url: "tools/miladi-2027.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2027 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2028 میلادی به شمسی", url: "tools/miladi-2028.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2028 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2029 میلادی به شمسی", url: "tools/miladi-2029.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2029 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2030 میلادی به شمسی", url: "tools/miladi-2030.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2030 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2031 میلادی به شمسی", url: "tools/miladi-2031.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2031 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2032 میلادی به شمسی", url: "tools/miladi-2032.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2032 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2033 میلادی به شمسی", url: "tools/miladi-2033.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2033 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2034 میلادی به شمسی", url: "tools/miladi-2034.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2034 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2035 میلادی به شمسی", url: "tools/miladi-2035.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2035 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2036 میلادی به شمسی", url: "tools/miladi-2036.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2036 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2037 میلادی به شمسی", url: "tools/miladi-2037.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2037 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2038 میلادی به شمسی", url: "tools/miladi-2038.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2038 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2039 میلادی به شمسی", url: "tools/miladi-2039.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2039 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2040 میلادی به شمسی", url: "tools/miladi-2040.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2040 میلادی شمسی تاریخ" },
  { title: "تبدیل سال 2041 میلادی به شمسی", url: "tools/miladi-2041.html", type: "tool", icon: "📅", keywords: "تبدیل سال 2041 میلادی شمسی تاریخ" }
  // --- مقالات ---
  { title: "مقاله: راهنمای تبدیل تاریخ", url: "blog/date-converter-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: شاخص BMI", url: "blog/what-is-bmi.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: QR Code چیست", url: "blog/qr-code-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: ساخت رمز قوی", url: "blog/strong-password.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: Base64", url: "blog/base64-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: مبدل واحدها", url: "blog/unit-conversion.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: الگوریتم کد ملی", url: "blog/national-id-algorithm.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: محاسبه حقوق ۱۴۰۵", url: "blog/salary-calculation-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: پاکسازی متن فارسی", url: "blog/persian-text-cleaner-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: فرمت JSON", url: "blog/json-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: محاسبه سن", url: "blog/age-calculation-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: کدهای رنگ HEX", url: "blog/color-codes-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: درصد و تخفیف", url: "blog/percentage-discount-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: Regex", url: "blog/regex-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: سئو تکنیکال", url: "blog/technical-seo-guide.html", type: "article", icon: "📄", keywords: "" },
  { title: "مقاله: الگوریتم هش", url: "blog/what-is-hashing.html", type: "article", icon: "📄", keywords: "" }
];

// --- سیستم مدیریت داده (localStorage) ---
const DB = {
  getFavs: () => JSON.parse(localStorage.getItem('abzarak_favs') || '[]'),
  saveFavs: (f) => localStorage.setItem('abzarak_favs', JSON.stringify(f)),
  toggleFav: (url) => {
    let favs = DB.getFavs();
    if (favs.includes(url)) favs = favs.filter(f => f !== url);
    else favs.push(url);
    DB.saveFavs(favs);
    return favs.includes(url);
  },
  getHistory: () => JSON.parse(localStorage.getItem('abzarak_hist') || '[]'),
  addHistory: (url) => {
    if(url === 'index.html' || url === './' || url === '') return;
    let hist = DB.getHistory().filter(h => h !== url);
    hist.unshift(url);
    hist = hist.slice(0, 5); // حداکثر ۵ مورد
    localStorage.setItem('abzarak_hist', JSON.stringify(hist));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  // ثبت تاریخچه در صفحات ابزار
  if (window.location.pathname.includes('/tools/')) {
    const pageName = window.location.pathname.split('/').pop();
    DB.addHistory('tools/' + pageName);
  }

  // --- ۱) تزریق ستاره علاقه‌مندی به کارت‌ها ---
  const toolCards = document.querySelectorAll('.tool-card');
  toolCards.forEach(card => {
    const url = card.getAttribute('href');
    if(!url) return;
    
    const isFav = DB.getFavs().includes(url);
    const star = document.createElement('div');
    star.className = 'fav-star';
    star.innerHTML = isFav ? '★' : '☆';
    if (isFav) star.style.color = '#f59e0b';
    
    star.onclick = (e) => {
      e.preventDefault(); // جلوگیری از رفتن به صفحه
      e.stopPropagation();
      const nowFav = DB.toggleFav(url);
      star.innerHTML = nowFav ? '★' : '☆';
      star.style.color = nowFav ? '#f59e0b' : 'var(--muted)';
    };
    card.appendChild(star);
  });

  // --- ۲) ساخت و مدیریت Command Palette ---
  const cpHTML = `
    <div id="cp-overlay" class="cp-overlay">
      <div class="cp-modal">
        <div class="cp-search-wrap">
          <span class="cp-icon">🔍</span>
          <input type="text" id="cp-input" placeholder="جستجوی ابزار یا مقاله... (Esc برای بستن)" autocomplete="off">
        </div>
        <div class="cp-results" id="cp-results"></div>
      </div>
    </div>
    <button id="cp-fab" class="cp-fab" title="جستجو (Ctrl+K)">🔍</button>
  `;
  document.body.insertAdjacentHTML('beforeend', cpHTML);

  const overlay = document.getElementById('cp-overlay');
  const input = document.getElementById('cp-input');
  const results = document.getElementById('cp-results');
  const fab = document.getElementById('cp-fab');

  function openCP() {
    overlay.style.display = 'flex';
    input.value = '';
    renderResults('');
    setTimeout(() => input.focus(), 50);
  }

  function closeCP() {
    overlay.style.display = 'none';
  }

  function renderResults(query) {
    const q = query.toLowerCase().trim();
    const filtered = catalog.filter(item => 
      item.title.toLowerCase().includes(q) || item.keywords.includes(q) || item.type.includes(q)
    );
    
    if (filtered.length === 0) {
      results.innerHTML = '<div class="cp-empty">نتیجه‌ای یافت نشد.</div>';
      return;
    }

    results.innerHTML = filtered.map((item, index) => `
      <a href="${basePath}${item.url}" class="cp-item" data-index="${index}">
        <span class="cp-item-icon">${item.icon}</span>
        <span class="cp-item-title">${item.title}</span>
        <span class="cp-item-type">${item.type === 'tool' ? 'ابزار' : 'مقاله'}</span>
      </a>
    `).join('');
  }

  input.addEventListener('input', (e) => renderResults(e.target.value));
  
  // کیبورد نویگیشن
  input.addEventListener('keydown', (e) => {
    const items = results.querySelectorAll('.cp-item');
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter') {
      let activeIdx = Array.from(items).findIndex(el => el.classList.contains('active'));
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (activeIdx < items.length - 1) activeIdx++;
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (activeIdx > 0) activeIdx--;
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (activeIdx > -1) items[activeIdx].click();
        return;
      }
      items.forEach(el => el.classList.remove('active'));
      if (items[activeIdx]) {
        items[activeIdx].classList.add('active');
        items[activeIdx].scrollIntoView({ block: 'nearest' });
      }
    }
  });

  // ایونت‌های باز و بسته شدن
  fab.addEventListener('click', openCP);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closeCP(); });
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openCP();
    }
    if (e.key === 'Escape') closeCP();
  });

  // --- ۳) ساخت داشبورد در صفحه اصلی ---
  if (window.location.pathname.endsWith('/') || window.location.pathname.endsWith('index.html')) {
    const favs = DB.getFavs();
    const hist = DB.getHistory();
    
    if (favs.length > 0 || hist.length > 0) {
      const dash = document.createElement('section');
      dash.className = 'container dashboard-widgets';
      
      let html = '';
      
      if (favs.length > 0) {
        const favItems = catalog.filter(c => favs.includes(c.url));
        html += `<h2 class="section-title" style="margin-top:20px; font-size:1.2rem;">⭐ ابزارهای منتخب شما</h2>
                 <div class="tools-grid" style="margin-bottom:30px;">`;
        favItems.forEach(item => {
          html += `<a href="${item.url}" class="tool-card mini-card">
                     <div class="icon" style="width:40px; height:40px; font-size:1.2rem;">${item.icon}</div>
                     <h3>${item.title}</h3>
                   </a>`;
        });
        html += `</div>`;
      }
      
      if (hist.length > 0) {
        const histItems = catalog.filter(c => hist.includes(c.url));
        html += `<h2 class="section-title" style="margin-top:20px; font-size:1.2rem;">🕒 اخیراً استفاده شده</h2>
                 <div class="tools-grid" style="margin-bottom:30px;">`;
        histItems.forEach(item => {
          html += `<a href="${item.url}" class="tool-card mini-card" style="opacity:0.8;">
                     <div class="icon" style="width:40px; height:40px; font-size:1.2rem;">${item.icon}</div>
                     <h3>${item.title}</h3>
                   </a>`;
        });
        html += `</div>`;
      }
      
      dash.innerHTML = html;
      
      // قرار دادن داشبورد بعد از بخش Hero
      const hero = document.querySelector('.hero');
      if (hero) hero.parentNode.insertBefore(dash, hero.nextSibling);
    }
  }
});
