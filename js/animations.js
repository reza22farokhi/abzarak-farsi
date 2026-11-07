(function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  function applyScrollReveal() {
    const selectors = [
      '.hero h1', '.hero p', '.hero .search-box',
      '.section-title', '.tool-card', '.blog-card',
      '.article-cta', '.article-body h2', '.article-body h3', '.article-body blockquote'
    ];
    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(el => {
        if (!el.classList.contains('scroll-reveal')) {
          el.classList.add('scroll-reveal');
          observer.observe(el);
        }
      });
    });
  }

  function applyStagger() {
    document.querySelectorAll('.tools-grid, .blog-grid').forEach(grid => {
      Array.from(grid.children).forEach((child, i) => {
        child.style.transitionDelay = Math.min(i * 0.06, 0.6) + 's';
      });
    });
  }

  function init() {
    applyScrollReveal();
    applyStagger();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
