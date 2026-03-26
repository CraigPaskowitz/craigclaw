/* ========================================================
   CRAIG CLAW — app.js
   Theme toggle, mobile nav, scroll reveals, hero particles,
   neural field interactive demo
   ======================================================== */

(function () {
  'use strict';

  // ——————————————————————————————————
  // THEME TOGGLE
  // ——————————————————————————————————
  const toggleBtn = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  let currentTheme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', currentTheme);
  updateToggleIcon();

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', currentTheme);
      updateToggleIcon();
    });
  }

  function updateToggleIcon() {
    if (!toggleBtn) return;
    toggleBtn.setAttribute('aria-label', 'Switch to ' + (currentTheme === 'dark' ? 'light' : 'dark') + ' mode');
    toggleBtn.innerHTML = currentTheme === 'dark'
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  }


  // ——————————————————————————————————
  // MOBILE NAV
  // ——————————————————————————————————
  const menuBtn = document.querySelector('[data-menu-toggle]');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('is-open');
      const isOpen = mobileMenu.classList.contains('is-open');
      menuBtn.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
      menuBtn.innerHTML = isOpen
        ? '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
        : '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('is-open');
        menuBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>';
      });
    });
  }


  // ——————————————————————————————————
  // SCROLL REVEAL (IntersectionObserver)
  // ——————————————————————————————————
  const revealTargets = [
    '.section__eyebrow',
    '.section__title',
    '.section__intro',
    '.ability-card',
    '.stat-card',
    '.pullquote',
    '.philosophy-content > p',
    '.principle',
    '.workflow-card',
    '.lab-canvas-wrap',
    '.hero__logo-mark',
    '.hero__eyebrow',
    '.hero__title',
    '.hero__subtitle',
    '.hero__cta'
  ];

  // Don't add reveal class to hero elements — they should animate immediately
  const heroSelectors = ['.hero__logo-mark', '.hero__eyebrow', '.hero__title', '.hero__subtitle', '.hero__cta'];

  // Add reveal class to non-hero elements
  document.querySelectorAll(revealTargets.filter(s => !heroSelectors.includes(s)).join(',')).forEach((el, i) => {
    el.classList.add('reveal');
    el.style.transitionDelay = (i % 4) * 60 + 'ms';
  });

  // Hero entrance animation
  heroSelectors.forEach((sel, i) => {
    const el = document.querySelector(sel);
    if (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transitionDelay = (200 + i * 120) + 'ms';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        });
      });
    }
  });

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }


  // ——————————————————————————————————
  // HERO CANVAS — Subtle floating particles
  // ——————————————————————————————————
  const heroCanvas = document.getElementById('hero-canvas');
  if (heroCanvas) {
    const ctx = heroCanvas.getContext('2d');
    let W, H;
    const particles = [];
    const PARTICLE_COUNT = 60;

    function resizeHero() {
      const rect = heroCanvas.parentElement.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      heroCanvas.width = W * devicePixelRatio;
      heroCanvas.height = H * devicePixelRatio;
      ctx.scale(devicePixelRatio, devicePixelRatio);
    }

    function initHeroParticles() {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.5 + 0.5,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random() * 0.3 + 0.05
        });
      }
    }

    function getAccentColor() {
      return getComputedStyle(root).getPropertyValue('--color-accent').trim();
    }

    function drawHero() {
      ctx.clearRect(0, 0, W, H);
      const accent = getAccentColor();

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150) {
            const opacity = (1 - dist / 150) * 0.08;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = accent.startsWith('#')
              ? accent + Math.round(opacity * 255).toString(16).padStart(2, '0')
              : `rgba(77, 168, 232, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = accent.startsWith('#')
          ? accent + Math.round(p.alpha * 255).toString(16).padStart(2, '0')
          : `rgba(77, 168, 232, ${p.alpha})`;
        ctx.fill();

        // Move
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });

      requestAnimationFrame(drawHero);
    }

    resizeHero();
    initHeroParticles();
    drawHero();
    window.addEventListener('resize', () => { resizeHero(); initHeroParticles(); });
  }


  // ——————————————————————————————————
  // LAB CANVAS — Interactive Neural Field
  // ——————————————————————————————————
  const labCanvas = document.getElementById('lab-canvas');
  if (labCanvas) {
    const lctx = labCanvas.getContext('2d');
    let lW, lH;
    const nodes = [];
    const NODE_COUNT = 80;
    let mouseX = -1000, mouseY = -1000;

    function resizeLab() {
      const rect = labCanvas.parentElement.getBoundingClientRect();
      lW = rect.width;
      lH = rect.height;
      labCanvas.width = lW * devicePixelRatio;
      labCanvas.height = lH * devicePixelRatio;
      lctx.scale(devicePixelRatio, devicePixelRatio);
    }

    function initNodes() {
      nodes.length = 0;
      for (let i = 0; i < NODE_COUNT; i++) {
        nodes.push({
          x: Math.random() * lW,
          y: Math.random() * lH,
          baseR: Math.random() * 2.5 + 1,
          r: 0,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          pulse: Math.random() * Math.PI * 2,
          active: false
        });
      }
    }

    function drawLab() {
      lctx.clearRect(0, 0, lW, lH);

      const accent = getComputedStyle(root).getPropertyValue('--color-accent').trim();
      const time = Date.now() * 0.001;

      // Update nodes
      nodes.forEach(n => {
        // Mouse influence
        const dx = n.x - mouseX;
        const dy = n.y - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const influence = Math.max(0, 1 - dist / 200);
        n.active = influence > 0.1;

        // Gentle repulsion from cursor
        if (dist < 200 && dist > 0) {
          n.vx += (dx / dist) * influence * 0.08;
          n.vy += (dy / dist) * influence * 0.08;
        }

        // Damping
        n.vx *= 0.995;
        n.vy *= 0.995;

        // Move
        n.x += n.vx;
        n.y += n.vy;

        // Bounce
        if (n.x < 0 || n.x > lW) n.vx *= -1;
        if (n.y < 0 || n.y > lH) n.vy *= -1;
        n.x = Math.max(0, Math.min(lW, n.x));
        n.y = Math.max(0, Math.min(lH, n.y));

        // Pulse
        n.pulse += 0.02;
        n.r = n.baseR + Math.sin(n.pulse) * 0.5 + influence * 3;
      });

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = (nodes[i].active || nodes[j].active) ? 180 : 120;
          if (dist < maxDist) {
            const opacity = (1 - dist / maxDist) * ((nodes[i].active || nodes[j].active) ? 0.35 : 0.12);
            lctx.beginPath();
            lctx.moveTo(nodes[i].x, nodes[i].y);
            lctx.lineTo(nodes[j].x, nodes[j].y);
            lctx.strokeStyle = `rgba(77, 168, 232, ${opacity})`;
            lctx.lineWidth = (nodes[i].active || nodes[j].active) ? 1.2 : 0.5;
            lctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach(n => {
        // Glow for active nodes
        if (n.active) {
          const grad = lctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r * 6);
          grad.addColorStop(0, 'rgba(77, 168, 232, 0.2)');
          grad.addColorStop(1, 'rgba(77, 168, 232, 0)');
          lctx.beginPath();
          lctx.arc(n.x, n.y, n.r * 6, 0, Math.PI * 2);
          lctx.fillStyle = grad;
          lctx.fill();
        }

        // Core
        lctx.beginPath();
        lctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        lctx.fillStyle = n.active ? 'rgba(77, 168, 232, 0.9)' : 'rgba(77, 168, 232, 0.35)';
        lctx.fill();

        // Bright center
        if (n.r > 2) {
          lctx.beginPath();
          lctx.arc(n.x, n.y, n.r * 0.4, 0, Math.PI * 2);
          lctx.fillStyle = n.active ? 'rgba(200, 225, 255, 0.8)' : 'rgba(200, 225, 255, 0.3)';
          lctx.fill();
        }
      });

      requestAnimationFrame(drawLab);
    }

    // Mouse tracking
    labCanvas.parentElement.addEventListener('mousemove', (e) => {
      const rect = labCanvas.parentElement.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    });
    labCanvas.parentElement.addEventListener('mouseleave', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    // Touch support
    labCanvas.parentElement.addEventListener('touchmove', (e) => {
      const rect = labCanvas.parentElement.getBoundingClientRect();
      const touch = e.touches[0];
      mouseX = touch.clientX - rect.left;
      mouseY = touch.clientY - rect.top;
    }, { passive: true });
    labCanvas.parentElement.addEventListener('touchend', () => {
      mouseX = -1000;
      mouseY = -1000;
    });

    function getAccentColor() {
      return getComputedStyle(root).getPropertyValue('--color-accent').trim();
    }

    resizeLab();
    initNodes();
    drawLab();
    window.addEventListener('resize', () => { resizeLab(); initNodes(); });
  }


  // ——————————————————————————————————
  // NAV SCROLL BEHAVIOR
  // ——————————————————————————————————
  const nav = document.getElementById('nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const st = window.scrollY;
    if (st > 100) {
      nav.style.borderBottomColor = 'var(--color-border)';
    } else {
      nav.style.borderBottomColor = 'var(--color-border-subtle)';
    }
    lastScroll = st;
  }, { passive: true });

})();
