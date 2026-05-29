/* ═══════════════════════════════════════
   CHE Edinburgh — menu-page.js
   Separate menu page JS
   ═══════════════════════════════════════ */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ── NAV ── */
  const nav = $('#nav');

  /* ── Hamburger ── */
  const ham = $('#ham');
  const mob = $('#mobMenu');
  let mOpen = false;
  function closeMenu() {
    mOpen = false;
    ham.classList.remove('open');
    mob.classList.remove('open');
    document.body.style.overflow = '';
  }
  ham.addEventListener('click', () => {
    mOpen = !mOpen;
    ham.classList.toggle('open', mOpen);
    mob.classList.toggle('open', mOpen);
    document.body.style.overflow = mOpen ? 'hidden' : '';
  });
  const mc = $('#mobClose');
  if (mc) mc.addEventListener('click', closeMenu);
  $$('.mob-link').forEach(el => el.addEventListener('click', closeMenu));

  /* ── TAG MAP ── */
  const TAG_MAP = {
    halal: ['tag-halal','Halal'],
    veg:   ['tag-veg','Vegetarian'],
    vegan: ['tag-vegan','Vegan'],
    pop:   ['tag-pop','Popular'],
    top:   ['tag-top','⭐ Top Rated'],
    best:  ['tag-best','Bestseller'],
    sig:   ['tag-sig','Signature'],
    cult:  ['tag-cult','Cult Classic'],
    must:  ['tag-must','Must Try'],
    hot:   ['tag-hot','🌶 Spicy'],
  };

  /* ── Build menu cards ── */
  function buildMenuCards() {
    const data = window.MENU_DATA;
    if (!data) return;

    Object.entries(data).forEach(([cat, items]) => {
      const grid = document.getElementById('cards-' + cat);
      if (!grid) return;

      items.forEach((item, idx) => {
        const card = document.createElement('div');
        card.className = 'menu-card';
        card.setAttribute('data-anim', 'fade-up');
        card.setAttribute('data-delay', String(idx * 60));

        const tagHTML = (item.tags || []).map(t => {
          const m = TAG_MAP[t];
          return m ? `<span class="tag ${m[0]}">${m[1]}</span>` : '';
        }).join('');

        const imgSrc = `https://images.unsplash.com/${item.photo}?auto=format&fit=crop&w=600&h=400&q=82&fm=jpg`;
        const lbSrc  = `https://images.unsplash.com/${item.photo}?auto=format&fit=crop&w=1200&q=90&fm=jpg`;

        card.innerHTML = `
          <div class="menu-card-img" onclick="openMenuLightbox('${lbSrc}','${item.name}','${item.price}')">
            <img src="${imgSrc}" alt="${item.name}" loading="lazy" decoding="async" onerror="imgFallback(this)">
            <div class="menu-card-img-overlay"></div>
            ${tagHTML ? `<div class="menu-card-tags">${tagHTML}</div>` : ''}
          </div>
          <div class="menu-card-body">
            <div class="menu-card-name">${item.name}</div>
            <div class="menu-card-desc">${item.desc}</div>
            <div class="menu-card-footer">
              <div>
                <div class="menu-card-price">${item.price}</div>
                ${item.badge ? `<div class="menu-card-badge">✓ ${item.badge}</div>` : ''}
              </div>
              <a href="https://www.ubereats.com/gb/store/che-takeaway/v60_GKCqQgy2SAcvM6nmnQ?diningMode=DELIVERY&sc=SEARCH_SUGGESTION" target="_blank" class="menu-card-order">Order →</a>
            </div>
          </div>
        `;

        grid.appendChild(card);
      });
    });

    observeReveal();
  }

  /* ── Sticky category nav highlight ── */
  function initCatNav() {
    const catNav = $('#catNav');
    if (!catNav) return;

    const sections = $$('.menu-cat');
    const buttons  = $$('.cat-btn', catNav);

    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.id.replace('cat-', '');
        buttons.forEach(b => b.classList.toggle('active', b.dataset.cat === id));
        const active = catNav.querySelector('.cat-btn.active');
        if (active) active.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      });
    }, { rootMargin: '-20% 0px -60% 0px' });

    sections.forEach(s => io.observe(s));

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const sec = document.getElementById('cat-' + btn.dataset.cat);
        if (sec) sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  /* ── Scroll reveal ── */
  function observeReveal() {
    if (!('IntersectionObserver' in window)) {
      $$('[data-anim]').forEach(el => el.classList.add('visible'));
      return;
    }
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const delay = parseInt(e.target.dataset.delay || '0', 10);
        setTimeout(() => e.target.classList.add('visible'), delay);
        io.unobserve(e.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -20px 0px' });

    $$('[data-anim]').forEach(el => {
      if (!el.classList.contains('visible')) io.observe(el);
    });
  }

  /* ── Lightbox ── */
  const lb    = document.getElementById('lightbox');
  const lbImg  = document.getElementById('lb-img');
  const lbName = document.getElementById('lb-name');
  const lbPrice= document.getElementById('lb-price');

  window.openMenuLightbox = function(src, name, price) {
    lbImg.src = src;
    lbName.textContent = name;
    lbPrice.textContent = price;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function() {
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { lbImg.src = ''; }, 350);
  };

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
  });

  /* ── Image fallback ── */
  window.imgFallback = function(img) {
    img.style.background = 'linear-gradient(135deg,#1c1c1c,#2a1209)';
    img.removeAttribute('src');
  };

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    buildMenuCards();
    initCatNav();
    observeReveal();
  });

})();
