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
  // ۳. Text-to-Speech با Google Translate (بدون نیاز به نصب)
  // ========================================
  const ttsBtn = document.getElementById('tts-btn');
  const ttsStopBtn = document.getElementById('tts-stop');
  const ttsIcon = ttsBtn.querySelector('.tts-icon');
  const ttsText = ttsBtn.querySelector('.tts-text');

  const TTS = {
    audio: null,
    queue: [],
    currentIndex: 0,
    isPlaying: false,
    isPaused: false,
    isStopped: false,
    
    // تقسیم متن به تکه‌های ~۱۸۰ کاراکتری (محدودیت Google TTS)
    splitText(text) {
      const chunks = [];
      const sentences = text.split(/(?<=[.!?؟،\n])\s+/);
      let current = '';
      
      for (const s of sentences) {
        if (s.length > 180) {
          if (current) { chunks.push(current.trim()); current = ''; }
          // جمله خیلی بلند را هم به قطعات کوچک‌تر بشکن
          let remaining = s;
          while (remaining.length > 180) {
            let cut = remaining.lastIndexOf(' ', 180);
            if (cut === -1) cut = 180;
            chunks.push(remaining.substring(0, cut).trim());
            remaining = remaining.substring(cut).trim();
          }
          if (remaining) current = remaining;
        } else if ((current + ' ' + s).length > 180) {
          if (current) chunks.push(current.trim());
          current = s;
        } else {
          current += (current ? ' ' : '') + s;
        }
      }
      if (current) chunks.push(current.trim());
      return chunks.filter(c => c.length > 0);
    },
    
    playChunk(text) {
      return new Promise((resolve, reject) => {
        // استفاده از Google Translate TTS - رایگان و فارسی روان
        const url = 'https://translate.googleapis.com/translate_tts?ie=UTF-8&client=gtx&tl=fa&q=' + encodeURIComponent(text);
        this.audio = new Audio(url);
        this.audio.playbackRate = 1.0;
        this.audio.onended = () => resolve();
        this.audio.onerror = (e) => {
          // fallback به سرور دوم
          const url2 = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=fa&q=' + encodeURIComponent(text);
          this.audio = new Audio(url2);
          this.audio.playbackRate = 1.0;
          this.audio.onended = () => resolve();
          this.audio.onerror = () => reject(new Error('TTS failed'));
          this.audio.play().catch(reject);
        };
        this.audio.play().catch(reject);
      });
    },
    
    async speak(text) {
      this.queue = this.splitText(text);
      this.currentIndex = 0;
      this.isPlaying = true;
      this.isStopped = false;
      
      for (let i = 0; i < this.queue.length; i++) {
        if (this.isStopped) break;
        this.currentIndex = i;
        try {
          await this.playChunk(this.queue[i]);
        } catch(e) {
          console.warn('TTS chunk error:', e);
          // ادامه بده به تکه بعدی حتی اگر یکی خطا داد
        }
      }
      
      this.isPlaying = false;
      if (!this.isStopped) {
        ttsIcon.textContent = '🔉';
        ttsText.textContent = 'خواندن مقاله';
        ttsStopBtn.style.display = 'none';
      }
    },
    
    pause() {
      if (this.audio && !this.audio.paused) {
        this.audio.pause();
        this.isPaused = true;
      }
    },
    
    resume() {
      if (this.audio && this.isPaused) {
        this.audio.play();
        this.isPaused = false;
      }
    },
    
    stop() {
      this.isStopped = true;
      this.isPlaying = false;
      this.isPaused = false;
      if (this.audio) {
        this.audio.pause();
        this.audio.currentTime = 0;
        this.audio = null;
      }
    }
  };

  ttsBtn.addEventListener('click', async () => {
    if (!TTS.isPlaying) {
      // شروع خواندن
      const text = getArticleText();
      if (!text) return;
      ttsIcon.textContent = '⏸';
      ttsText.textContent = 'توقف موقت';
      ttsStopBtn.style.display = 'inline-flex';
      TTS.speak(text);
    } else if (TTS.isPaused) {
      // ادامه
      TTS.resume();
      ttsIcon.textContent = '⏸';
      ttsText.textContent = 'توقف موقت';
    } else {
      // مکث
      TTS.pause();
      ttsIcon.textContent = '▶️';
      ttsText.textContent = 'ادامه';
    }
  });

  ttsStopBtn.addEventListener('click', () => {
    TTS.stop();
    ttsIcon.textContent = '🔉';
    ttsText.textContent = 'خواندن مقاله';
    ttsStopBtn.style.display = 'none';
  });

  // توقف هنگام خروج
  window.addEventListener('beforeunload', () => TTS.stop());

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
