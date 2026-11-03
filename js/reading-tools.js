// ============================================
// Reading Experience Suite for Blog Articles
// ============================================
(function() {
  const articleBody = document.querySelector('.article-body');
  const articleMain = document.querySelector('.article-main');
  if (!articleBody || !articleMain) return; // فقط در مقالات

  // ========================================
  // ۱. نوار پیشرفت مطالعه (Reading Progress)
  // ========================================
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress-bar';
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = progress + '%';
  }, { passive: true });

  // ========================================
  // ۲. نوار ابزار (TTS + Share)
  // ========================================
  const toolbar = document.createElement('div');
  toolbar.className = 'article-toolbar';
  toolbar.innerHTML = `
    <div class="toolbar-section">
      <button class="read-btn" id="tts-btn" title="خواندن مقاله با صدا">
        <span class="tts-icon">🔉</span>
        <span class="tts-text">خواندن مقاله</span>
      </button>
      <button class="read-btn" id="tts-stop" title="توقف" style="display:none;">
        <span>⏹</span>
      </button>
    </div>
    <div class="toolbar-divider"></div>
    <div class="toolbar-section share-buttons">
      <span style="font-size:0.85rem; color:var(--muted); margin-left:8px;">اشتراک‌گذاری:</span>
      <a class="share-btn share-wa" id="share-wa" target="_blank" rel="noopener" title="واتساپ">💬</a>
      <a class="share-btn share-tg" id="share-tg" target="_blank" rel="noopener" title="تلگرام">✈️</a>
      <a class="share-btn share-tw" id="share-tw" target="_blank" rel="noopener" title="توییتر">🐦</a>
      <button class="share-btn share-copy" id="share-copy" title="کپی لینک">📋</button>
    </div>
  `;
  const titleEl = document.querySelector('.article-main h1');
  const metaEl = document.querySelector('.article-meta');
  if (metaEl && metaEl.parentNode) {
    metaEl.parentNode.insertBefore(toolbar, metaEl.nextSibling);
  } else {
    articleBody.parentNode.insertBefore(toolbar, articleBody);
  }

  // ========================================
  // ۳. Text-to-Speech (خواندن با صدا)
  // ========================================
  const ttsBtn = document.getElementById('tts-btn');
  const ttsStopBtn = document.getElementById('tts-stop');
  const ttsIcon = ttsBtn.querySelector('.tts-icon');
  const ttsText = ttsBtn.querySelector('.tts-text');
  let isSpeaking = false;
  let isPaused = false;
  let currentUtterance = null;

  // چک پشتیبانی مرورگر
  const ttsSupported = 'speechSynthesis' in window;
  if (!ttsSupported) {
    ttsBtn.style.display = 'none';
  }

  // پیدا کردن بهترین صدای فارسی
  let persianVoice = null;
  let voiceAttempts = 0;
  function loadVoices() {
    const voices = speechSynthesis.getVoices();
    persianVoice = voices.find(v => v.lang === 'fa-IR' || v.lang === 'fa_IR') 
                || voices.find(v => v.lang.startsWith('fa'))
                || voices.find(v => v.name.toLowerCase().includes('persian'));
    
    // تلاش مجدد اگر صداها هنوز لود نشده‌اند
    if (!persianVoice && voiceAttempts < 5) {
      voiceAttempts++;
      setTimeout(loadVoices, 200);
    }
  }
  if (ttsSupported) {
    loadVoices();
    speechSynthesis.onvoiceschanged = loadVoices;
  }

  // استخراج متن مقاله
  function getArticleText() {
    let text = '';
    if (titleEl) text += titleEl.textContent + '. ';
    const paragraphs = articleBody.querySelectorAll('p, li, h2, h3, blockquote');
    paragraphs.forEach(el => {
      const t = el.textContent.trim();
      if (t) text += t + ' ';
    });
    return text.trim();
  }

  // شروع خواندن
  function startSpeaking() {
    if (!persianVoice) {
      const proceed = confirm('⚠️ مرورگر یا گوشی شما به بسته صدای فارسی (Persian TTS) مجهز نیست.\n\nاگر می‌خواهید با صدای پیش‌فرض خوانده شود دکمه تایید را بزنید.\nبرای نصب صدای فارسی، به تنظیمات گوشی > زبان و ورودی > تبدیل متن به گفتار بروید و بسته زبان فارسی را نصب کنید.');
      if (!proceed) return;
    }
    
    if (isPaused) {
      speechSynthesis.resume();
      isPaused = false;
      ttsIcon.textContent = '⏸';
      ttsText.textContent = 'توقف موقت';
      return;
    }
    
    speechSynthesis.cancel();
    const text = getArticleText();
    if (!text) return;

    // تقسیم متن به تکه‌های کوتاه (بعضی مرورگرها محدودیت طول دارن)
    const chunks = text.match(/[^.!?؟،\n]+[.!?؟،\n]?/g) || [text];
    let chunkIndex = 0;

    function speakNext() {
      if (chunkIndex >= chunks.length) {
        isSpeaking = false;
        ttsIcon.textContent = '🔉';
        ttsText.textContent = 'خواندن مقاله';
        ttsStopBtn.style.display = 'none';
        return;
      }
      
      const chunk = chunks[chunkIndex].trim();
      if (!chunk) { chunkIndex++; speakNext(); return; }
      
      currentUtterance = new SpeechSynthesisUtterance(chunk);
      currentUtterance.lang = 'fa-IR';
      currentUtterance.rate = 1.0;
      currentUtterance.pitch = 1.0;
      if (persianVoice) currentUtterance.voice = persianVoice;
      
      currentUtterance.onend = () => {
        chunkIndex++;
        speakNext();
      };
      currentUtterance.onerror = (e) => {
        if (e.error !== 'interrupted') {
          chunkIndex++;
          speakNext();
        }
      };
      
      speechSynthesis.speak(currentUtterance);
    }

    isSpeaking = true;
    isPaused = false;
    ttsIcon.textContent = '⏸';
    ttsText.textContent = 'توقف موقت';
    ttsStopBtn.style.display = 'inline-flex';
    speakNext();
  }

  ttsBtn.addEventListener('click', () => {
    if (!isSpeaking) {
      startSpeaking();
    } else if (!isPaused) {
      speechSynthesis.pause();
      isPaused = true;
      ttsIcon.textContent = '▶️';
      ttsText.textContent = 'ادامه';
    } else {
      speechSynthesis.resume();
      isPaused = false;
      ttsIcon.textContent = '⏸';
      ttsText.textContent = 'توقف موقت';
    }
  });

  ttsStopBtn.addEventListener('click', () => {
    speechSynthesis.cancel();
    isSpeaking = false;
    isPaused = false;
    ttsIcon.textContent = '🔉';
    ttsText.textContent = 'خواندن مقاله';
    ttsStopBtn.style.display = 'none';
  });

  // توقف هنگام خروج از صفحه
  window.addEventListener('beforeunload', () => {
    if (ttsSupported) speechSynthesis.cancel();
  });

  // ========================================
  // ۴. Share Buttons
  // ========================================
  const pageUrl = window.location.href;
  const pageTitle = titleEl ? titleEl.textContent : document.title;
  const shareText = encodeURIComponent(pageTitle);
  const shareUrlEncoded = encodeURIComponent(pageUrl);

  document.getElementById('share-wa').href = `https://wa.me/?text=${shareText}%20${shareUrlEncoded}`;
  document.getElementById('share-tg').href = `https://t.me/share/url?url=${shareUrlEncoded}&text=${shareText}`;
  document.getElementById('share-tw').href = `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrlEncoded}`;

  const copyBtn = document.getElementById('share-copy');
  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(pageUrl);
      copyBtn.textContent = '✅';
      setTimeout(() => copyBtn.textContent = '📋', 2000);
    } catch (e) {
      copyBtn.textContent = '❌';
      setTimeout(() => copyBtn.textContent = '📋', 2000);
    }
  });

  // ========================================
  // ۵. Back to Top Button
  // ========================================
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.title = 'بازگشت به بالا';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
