document.addEventListener('DOMContentLoaded', () => {
  const fontSizeScript = document.createElement('script');
  fontSizeScript.src = 'js/font-size-controls.js';
  document.head.append(fontSizeScript);

  document.querySelectorAll('#search-box').forEach((form) => {
    form.addEventListener('submit', (event) => event.preventDefault());
  });

  const menuButton = document.getElementById('menu');
  const nav = document.getElementById('primary-navigation');
  const searchBox = document.getElementById('search-box');
  const searchToggle = document.querySelector('.search-toggle');
  const dropdownButtons = document.querySelectorAll('.dropdown .dropbtn');

  const closeDropdowns = (currentButton = null) => {
    dropdownButtons.forEach((button) => {
      const parent = button.closest('.dropdown');
      const isCurrent = button === currentButton;
      button.setAttribute('aria-expanded', String(isCurrent && true));
      parent?.classList.toggle('open', isCurrent);
      if (!isCurrent) {
        button.setAttribute('aria-expanded', 'false');
        parent?.classList.remove('open');
      }
    });
  };

  const setMenuState = (isOpen) => {
    if (!menuButton || !nav) return;
    menuButton.classList.toggle('fa-times', isOpen);
    menuButton.classList.toggle('fa-bars', !isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    nav.classList.toggle('nav-toggle', isOpen);
  };

  const setSearchState = (isOpen) => {
    if (!searchBox || !searchToggle) return;
    searchBox.classList.toggle('active', isOpen);
    searchToggle.setAttribute('aria-expanded', String(isOpen));
    if (isOpen) searchBox.querySelector('input[type="search"]')?.focus();
  };

  menuButton?.addEventListener('click', () => {
    setMenuState(menuButton.getAttribute('aria-expanded') !== 'true');
  });

  searchToggle?.addEventListener('click', () => {
    setSearchState(searchToggle.getAttribute('aria-expanded') !== 'true');
  });

  dropdownButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      closeDropdowns(isOpen ? null : button);
    });
  });

  document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown') && !event.target.closest('#menu') && !event.target.closest('.search-toggle')) {
      closeDropdowns();
      setMenuState(false);
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 991) setMenuState(false);
  });
});
