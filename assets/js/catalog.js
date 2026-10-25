'use strict';

    const searchInput = document.getElementById('tool-search');
    const toolCards = Array.from(document.querySelectorAll('.tool-card'));
    const toolCount = document.getElementById('tool-count');
    const emptyState = document.getElementById('empty-state');

    function updateToolSearch() {
      const query = searchInput.value.trim().toLocaleLowerCase('fa');
      let visibleCount = 0;

      for (const card of toolCards) {
        const searchableText = (
          card.textContent + ' ' + (card.dataset.search || '')
        ).toLocaleLowerCase('fa');

        const matches = searchableText.includes(query);
        card.hidden = !matches;

        if (matches) {
          visibleCount += 1;
        }
      }

      toolCount.textContent =
        visibleCount.toLocaleString('fa-IR') + ' ابزار نمایش داده می‌شود.';

      emptyState.hidden = visibleCount !== 0;
    }

    searchInput.addEventListener('input', updateToolSearch);
