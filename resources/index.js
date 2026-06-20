// ── AURA PARTICLES ──────────────────────────────────────────────
(function spawnParticles() {
  const container = document.getElementById('auraParticles');
  if (!container) return;
  const count = 22;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'aura-particle';
    // spread across the lower 60% of the box, centred horizontally
    const left = 20 + Math.random() * 60;
    const bottom = 5 + Math.random() * 55;
    const dur  = (4 + Math.random() * 5).toFixed(1) + 's';
    const delay = (Math.random() * 6).toFixed(1) + 's';
    const size = (1.5 + Math.random() * 2.5).toFixed(1) + 'px';
    p.style.cssText =
      `left:${left}%;bottom:${bottom}%;` +
      `width:${size};height:${size};` +
      `--dur:${dur};--delay:${delay};`;
    container.appendChild(p);
  }
})();

// ── LIGHTBOX ─────────────────────────────────────────────────────
(function initLightbox() {
  const overlay   = document.getElementById('lightbox');
  const img       = document.getElementById('lightboxImg');
  const titleEl   = document.getElementById('lightboxTitle');
  const descEl    = document.getElementById('lightboxDesc');
  const closeBtn  = document.getElementById('lightboxClose');
  if (!overlay) return;

  function open(src, title, desc) {
    img.src = src;
    img.alt = title;
    titleEl.textContent = title;
    descEl.textContent  = desc;
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    // clear src after transition to avoid flash
    setTimeout(() => { img.src = ''; }, 300);
  }

  // Click on any project card (thumb area)
  document.querySelectorAll('[data-lightbox]').forEach(card => {
    card.addEventListener('click', e => {
      // Only trigger on thumb or the card itself, not on badges / text
      if (e.target.closest('.badge-tag')) return;
      const src   = card.dataset.lightbox;
      const title = card.dataset.title  || '';
      const desc  = card.dataset.desc   || '';
      open(src, title, desc);
    });
    card.style.cursor = 'pointer';
  });

  closeBtn.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
})();
