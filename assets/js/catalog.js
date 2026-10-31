'use strict';

(() => {
  const searchInput = document.getElementById('tool-search');
  const toolCards = Array.from(document.querySelectorAll('.tool-card'));
  const toolCount = document.getElementById('tool-count');
  const emptyState = document.getElementById('empty-state');
  const filterButtons = Array.from(document.querySelectorAll('[data-filter]'));
  let activeFilter = 'all';

  function normalize(value) {
    return String(value || '').toLocaleLowerCase('fa')
      .replace(/[يى]/g, 'ی').replace(/ك/g, 'ک')
      .replace(/[\u064b-\u065f\u0670\u0640]/g, '').trim();
  }

  function updateToolSearch() {
    const query = normalize(searchInput.value);
    let visibleCount = 0;
    for (const card of toolCards) {
      const searchableText = normalize(card.textContent + ' ' + (card.dataset.search || ''));
      const categoryMatches = activeFilter === 'all' || card.dataset.category === activeFilter;
      const matches = categoryMatches && searchableText.includes(query);
      card.hidden = !matches;
      if (matches) visibleCount += 1;
    }
    toolCount.textContent = visibleCount.toLocaleString('fa-IR') + ' ابزار نمایش داده می‌شود.';
    emptyState.hidden = visibleCount !== 0;
  }

  for (const button of filterButtons) {
    button.addEventListener('click', () => {
      activeFilter = button.dataset.filter || 'all';
      for (const item of filterButtons) item.setAttribute('aria-pressed', String(item === button));
      updateToolSearch();
    });
  }
  searchInput.addEventListener('input', updateToolSearch);
  updateToolSearch();
})();
