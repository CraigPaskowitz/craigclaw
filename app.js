(function () {
  'use strict';

  const root = document.documentElement;
  const themeToggle = document.querySelector('[data-theme-toggle]');
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const navMenu = document.getElementById('nav-menu');
  const yearTarget = document.getElementById('year');

  const storedTheme = localStorage.getItem('craigclaw-theme');
  if (storedTheme === 'dark' || storedTheme === 'light') {
    root.setAttribute('data-theme', storedTheme);
  }

  function updateThemeLabel() {
    if (!themeToggle) return;
    const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    themeToggle.textContent = root.getAttribute('data-theme') === 'dark' ? 'Light' : 'Dark';
    themeToggle.setAttribute('aria-label', `Switch to ${nextTheme} mode`);
  }

  if (themeToggle) {
    updateThemeLabel();
    themeToggle.addEventListener('click', function () {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      localStorage.setItem('craigclaw-theme', next);
      updateThemeLabel();
    });
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function () {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      navMenu.classList.toggle('open');
    });

    navMenu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMenu.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  if (yearTarget) {
    yearTarget.textContent = String(new Date().getFullYear());
  }
})();
