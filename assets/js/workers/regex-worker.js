'use strict';
self.addEventListener('message', event => {
  const data = event.data || {};
  try {
    const { pattern, flags, text } = data;
    if (typeof pattern !== 'string' || typeof text !== 'string' || pattern.length > 512 || text.length > 50000) {
      throw new Error('ورودی از محدودیت مجاز بیشتر است.');
    }
    const regex = new RegExp(pattern, flags.includes('g') ? flags : flags + 'g');
    const matches = [];
    const maxMatches = 200;
    let match;
    while ((match = regex.exec(text)) !== null) {
      matches.push({
        value: String(match[0]).slice(0, 500),
        index: match.index,
        groups: match.slice(1).map(value => value === undefined ? null : String(value).slice(0, 300))
      });
      if (matches.length > maxMatches) break;
      if (match[0] === '') {
        const point = text.codePointAt(regex.lastIndex);
        regex.lastIndex += point > 0xffff ? 2 : 1;
      }
    }
    const truncated = matches.length > maxMatches;
    if (truncated) matches.length = maxMatches;
    self.postMessage({ matches, truncated });
  } catch (error) {
    self.postMessage({ error: error.message });
  }
});
