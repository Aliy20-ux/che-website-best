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
  const mobOverlay = $('#mobOverlay');
  let mOpen = false;
  function closeMenu() {
    mOpen = false;
    ham.classList.remove('open');
    mob.classList.remove('open');
    mobOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  ham.addEventListener('click', () => {
    mOpen = !mOpen;
    ham.classList.toggle('open', mOpen);
    mob.classList.toggle('open', mOpen);
    mobOverlay.classList.toggle('open', mOpen);
    document.body.style.overflow = mOpen ? 'hidden' : '';
  });
  mobOverlay.addEventListener('click', closeMenu);
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

  /* ── Scroll progress bar ── */
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.prepend(progressBar);
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });

  /* ── Cursor spotlight (desktop only) ── */
  if (window.matchMedia('(hover: hover)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    document.addEventListener('mousemove', e => {
      glow.style.left = e.clientX + 'px';
      glow.style.top  = e.clientY + 'px';
    });
  }

  /* ── Letter split hero title ── */
  function splitHeroTitle() {
    const title = document.querySelector('.hero-title');
    if (!title) return;
    // Split CHE text node and em separately
    title.childNodes.forEach(node => {
      if (node.nodeType === 3) { // text node "CHE"
        const chars = node.textContent.trim().split('');
        const frag = document.createDocumentFragment();
        chars.forEach((ch, i) => {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = ch === ' ' ? ' ' : ch;
          span.style.animationDelay = (i * 80 + 200) + 'ms';
          frag.appendChild(span);
        });
        node.replaceWith(frag);
      }
    });
  }

  /* ── Word split for section titles ── */
  function splitSectionTitles() {
    $$('.section-title').forEach(el => {
      // Don't re-process
      if (el.querySelector('.split-word')) return;
      el.innerHTML = el.innerHTML.replace(/(<em>.*?<\/em>|[^\s<]+)/g, (match) => {
        return `<span class="split-word"><span class="word-inner">${match}</span></span>`;
      });
    });
  }

  /* ── Counting numbers ── */
  function animateCount(el) {
    // Grab the text node (not the <sup>)
    const textNode = Array.from(el.childNodes).find(n => n.nodeType === 3);
    if (!textNode) return;
    const raw = textNode.textContent.trim();
    const num = parseFloat(raw);
    if (isNaN(num)) return;
    const isDecimal = raw.includes('.');
    const duration = 1400;
    const start = performance.now();
    el.classList.add('counting');
    function step(now) {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = isDecimal ? (num * ease).toFixed(1) : Math.round(num * ease);
      textNode.textContent = val;
      if (p < 1) requestAnimationFrame(step);
      else { textNode.textContent = isDecimal ? num.toFixed(1) : String(num); el.classList.remove('counting'); }
    }
    requestAnimationFrame(step);
  }

  function observeStats() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const numEl = e.target.querySelector('.stat-num');
        if (numEl) animateCount(numEl);
        io.unobserve(e.target);
      });
    }, { threshold: 0.5 });
    $$('.stat').forEach(el => io.observe(el));
  }

  /* ── Init ── */
  document.addEventListener('DOMContentLoaded', () => {
    splitHeroTitle();
    splitSectionTitles();
    observeReveal();
    observeStats();
    if (window.scrollY > 50) nav.classList.add('scrolled');
  });

})();
