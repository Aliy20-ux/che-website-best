/* ═══════════════════════════════════════
   CHE Edinburgh — main.js (index page)
   ═══════════════════════════════════════ */
(function () {
  'use strict';

  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  /* ── NAV scroll ── */
  const nav = $('#nav');
  function onScroll() {
    nav.classList.toggle('scrolled', window.scrollY > 50);
    parallaxHero();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ── Parallax hero ── */
  function parallaxHero() {
    const img = document.getElementById('heroImg');
    if (!img) return;
    img.style.transform = `translateY(${window.scrollY * 0.28}px) scale(1.04)`;
  }

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
  $('#mobClose').addEventListener('click', closeMenu);
  $$('.mob-link, .mob-btn', mob).forEach(el => el.addEventListener('click', closeMenu));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') { closeMenu(); closeLightbox(); }
  });

  /* ── Smooth scroll — only for same-page anchors ── */
  document.addEventListener('click', e => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const id = href.slice(1);
    const t = document.getElementById(id);
    if (!t) return;
    e.preventDefault();
    closeMenu();
    setTimeout(() => t.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  });

  /* ── Scroll reveal — rich animations ── */
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
    }, { threshold: 0.07, rootMargin: '0px 0px -25px 0px' });
    $$('[data-anim]').forEach(el => {
      if (!el.classList.contains('visible')) io.observe(el);
    });
  }

  /* ── Image fallback ── */
  window.imgFallback = function(img) {
    img.style.background = 'linear-gradient(135deg,#1c1c1c,#2a1209)';
    img.removeAttribute('src');
  };

  /* ── LIGHTBOX ── */
  const GALLERY = [
    { src: 'images/shawarma.jpg',        name: 'Chicken Shawarma Wrap',    price: '£13.00' },
    { src: 'images/campagnol_pizza.jpg', name: 'Stone-Baked Pizza',        price: 'from £11.50' },
    { src: 'images/falafel_wrap.jpg',    name: 'Falafel Wrap',             price: '£11.50' },
    { src: 'images/loaded_chips.jpg',    name: 'Chips, Cheese & Meat',     price: '~£6.00' },
    { src: 'images/mix_shawarma.jpg',    name: 'Mix Shawarma Wrap',        price: '£14.00' },
  ];
  let currentIdx = 0;
  const lb     = document.getElementById('lightbox');
  const lbImg  = document.getElementById('lb-img');
  const lbName = document.getElementById('lb-name');
  const lbPrice= document.getElementById('lb-price');

  window.openGallery = function(idx) {
    currentIdx = idx;
    const item = GALLERY[idx];
    lbImg.src = item.src;
    lbName.textContent = item.name;
    lbPrice.textContent = item.price;
    lb.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  window.closeLightbox = function(e) {
    if (e && e.target !== lb && !e.target.classList.contains('lb-backdrop') && !e.target.classList.contains('lb-close')) return;
    lb.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { if (lbImg) lbImg.src = ''; }, 400);
  };

  window.shiftGallery = function(dir) {
    currentIdx = (currentIdx + dir + GALLERY.length) % GALLERY.length;
    const item = GALLERY[currentIdx];
    lbImg.style.opacity = '0';
    setTimeout(() => {
      lbImg.src = item.src;
      lbName.textContent = item.name;
      lbPrice.textContent = item.price;
      lbImg.style.opacity = '1';
    }, 180);
  };

  if (lbImg) lbImg.style.transition = 'opacity .18s';

  document.addEventListener('keydown', e => {
    if (!lb || !lb.classList.contains('open')) return;
    if (e.key === 'ArrowRight') shiftGallery(1);
    if (e.key === 'ArrowLeft')  shiftGallery(-1);
  });

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    observeReveal();
    if (window.scrollY > 50) nav.classList.add('scrolled');
  });

})();
