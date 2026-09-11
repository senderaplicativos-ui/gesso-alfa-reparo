/* ==========================================================================
   Gesso Alfa Reparos Goiânia — main.js
   Nav mobile, header sticky, scroll spy, contadores, FAQ, lightbox, reveal
   ========================================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Ano no rodapé ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Header sticky ---------- */
  var header = document.querySelector('.header');
  function onScroll() {
    if (header) header.classList.toggle('is-stuck', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- Menu mobile ---------- */
  var burger = document.querySelector('.burger');
  var nav = document.querySelector('.nav');

  function closeNav() {
    if (!nav || !burger) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  if (burger && nav) {
    burger.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.classList.toggle('no-scroll', open);
    });

    nav.addEventListener('click', function (e) {
      if (e.target.closest('a')) closeNav();
    });
  }

  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) closeNav();
  });

  /* ---------- Scroll spy ---------- */
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"]'));
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute('href');
      return id && id.length > 1 ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              'is-active',
              link.getAttribute('href') === '#' + entry.target.id
            );
          });
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---------- Contadores animados ---------- */
  function fmt(value, decimals) {
    return value.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  }

  function animateCounter(el) {
    var raw = el.dataset.count || '0';
    var target = parseFloat(raw);
    var decimals = raw.indexOf('.') > -1 ? 1 : 0;

    if (reduceMotion) {
      el.textContent = fmt(target, decimals);
      return;
    }

    var duration = 1900;
    var start = null;

    function step(ts) {
      if (start === null) start = ts;
      var p = Math.min((ts - start) / duration, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt(target * eased, decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = fmt(target, decimals);
    }
    requestAnimationFrame(step);
  }

  var counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    if ('IntersectionObserver' in window) {
      var cObs = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            animateCounter(entry.target);
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.45 }
      );
      counters.forEach(function (c) { cObs.observe(c); });
    } else {
      Array.prototype.forEach.call(counters, animateCounter);
    }
  }

  /* ---------- FAQ acordeão (altura via grid no CSS) ---------- */
  var qaItems = Array.prototype.slice.call(document.querySelectorAll('.qa'));
  qaItems.forEach(function (item) {
    var btn = item.querySelector('.qa__q');
    if (!btn) return;

    btn.addEventListener('click', function () {
      var willOpen = !item.classList.contains('is-open');

      qaItems.forEach(function (other) {
        other.classList.remove('is-open');
        var oBtn = other.querySelector('.qa__q');
        if (oBtn) oBtn.setAttribute('aria-expanded', 'false');
      });

      if (willOpen) {
        item.classList.add('is-open');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* ---------- Lightbox ---------- */
  var lightbox = document.querySelector('.lightbox');
  var lbImg = lightbox ? lightbox.querySelector('.lightbox__img') : null;
  var lbCap = lightbox ? lightbox.querySelector('.lightbox__cap') : null;
  var lbClose = lightbox ? lightbox.querySelector('.lightbox__close') : null;
  var lbPrev = lightbox ? lightbox.querySelector('.lightbox__nav--prev') : null;
  var lbNext = lightbox ? lightbox.querySelector('.lightbox__nav--next') : null;

  var zoomables = Array.prototype.slice.call(document.querySelectorAll('[data-zoom]'));
  var lbIndex = 0;
  var lastFocused = null;

  function showLightbox(i) {
    if (!lbImg || !zoomables.length) return;
    lbIndex = (i + zoomables.length) % zoomables.length;
    var trigger = zoomables[lbIndex];
    var img = trigger.tagName === 'IMG' ? trigger : trigger.querySelector('img');
    if (!img) return;

    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    if (lbCap) lbCap.textContent = trigger.dataset.caption || img.alt || '';
  }

  function openLightbox(i) {
    if (!lightbox) return;
    lastFocused = document.activeElement;
    showLightbox(i);
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    if (lbClose) lbClose.focus();
  }

  function closeLightbox() {
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('no-scroll');
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  zoomables.forEach(function (el, i) {
    el.addEventListener('click', function () { openLightbox(i); });
    el.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });
  });

  if (lbClose) lbClose.addEventListener('click', closeLightbox);
  if (lbPrev) lbPrev.addEventListener('click', function () { showLightbox(lbIndex - 1); });
  if (lbNext) lbNext.addEventListener('click', function () { showLightbox(lbIndex + 1); });
  if (lightbox) {
    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightbox();
    });
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeNav();
      closeLightbox();
      return;
    }
    if (!lightbox || !lightbox.classList.contains('is-open')) return;
    if (e.key === 'ArrowLeft') showLightbox(lbIndex - 1);
    if (e.key === 'ArrowRight') showLightbox(lbIndex + 1);
  });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      Array.prototype.forEach.call(reveals, function (el) { el.classList.add('is-in'); });
    } else {
      var rObs = new IntersectionObserver(
        function (entries, obs) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('is-in');
            obs.unobserve(entry.target);
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
      );
      Array.prototype.forEach.call(reveals, function (el) { rObs.observe(el); });
    }
  }

  /* ---------- Botão flutuante do WhatsApp ---------- */
  var floatBtn = document.querySelector('.wa-float');
  if (floatBtn) {
    var toggleFloat = function () {
      floatBtn.classList.toggle('is-visible', window.scrollY > 500);
    };
    toggleFloat();
    window.addEventListener('scroll', toggleFloat, { passive: true });
  }
})();
