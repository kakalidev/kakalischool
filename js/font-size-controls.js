(() => {
  const storageKey = 'kakali-text-scale';
  const minimumScale = 0.8;
  const maximumScale = 1.5;
  const step = 0.1;
  const textSelector = 'h1, h2, h3, h4, h5, h6, p, a, button, li, td, th, label, input, textarea, select, blockquote, .parallaxContent';
  let fontDefaults = new WeakMap();
  const trackedElements = new Set();
  let scale = 1;

  try {
    const storedScale = localStorage.getItem(storageKey);
    if (storedScale !== null) {
      const savedScale = Number(storedScale);
      if (Number.isFinite(savedScale)) {
        scale = Math.min(maximumScale, Math.max(minimumScale, savedScale));
      }
    }
  } catch {
    scale = 1;
  }

  const setScale = (nextScale) => {
    scale = Math.min(maximumScale, Math.max(minimumScale, Math.round(nextScale * 10) / 10));

    try {
      localStorage.setItem(storageKey, String(scale));
    } catch {
      // Font scaling still works when storage is unavailable.
    }

    applyScale();
  };

  const applyScale = () => {
    const textElements = [...document.querySelectorAll(textSelector)]
      .filter((element) => !element.closest('.font-size-controls'));

    textElements.forEach((element) => {
      if (fontDefaults.has(element)) return;
      const fontSize = Number.parseFloat(getComputedStyle(element).fontSize);
      fontDefaults.set(element, Number.isFinite(fontSize) ? fontSize : 16);
      trackedElements.add(element);
    });

    textElements.forEach((element) => {
      element.style.fontSize = `${fontDefaults.get(element) * scale}px`;
    });

    document.querySelectorAll('.font-size-status').forEach((status) => {
      status.textContent = `Text size ${Math.round(scale * 100)} percent`;
    });
    document.querySelectorAll('.font-size-decrease').forEach((button) => {
      button.disabled = scale <= minimumScale;
    });
    document.querySelectorAll('.font-size-increase').forEach((button) => {
      button.disabled = scale >= maximumScale;
    });
  };

  const createButton = (label, accessibleName, className, action) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = className;
    button.textContent = label;
    button.setAttribute('aria-label', accessibleName);
    button.title = accessibleName;
    button.addEventListener('click', action);
    return button;
  };

  const initialize = () => {
    document.querySelectorAll('header').forEach((header) => {
      if (header.querySelector('.font-size-controls')) return;

      const controls = document.createElement('div');
      controls.className = 'font-size-controls';
      controls.setAttribute('role', 'group');
      controls.setAttribute('aria-label', 'Text size controls');
      controls.append(
        createButton('A-', 'Decrease text size', 'font-size-decrease', () => setScale(scale - step)),
        createButton('A', 'Reset text size', 'font-size-reset', () => setScale(1)),
        createButton('A+', 'Increase text size', 'font-size-increase', () => setScale(scale + step))
      );

      const status = document.createElement('span');
      status.className = 'sr-only font-size-status';
      status.setAttribute('role', 'status');
      status.setAttribute('aria-live', 'polite');
      controls.append(status);

      const menuButton = header.querySelector('#menu');
      const logo = header.querySelector('.logo');
      if (menuButton) menuButton.insertAdjacentElement('afterend', controls);
      else if (logo) logo.insertAdjacentElement('afterend', controls);
      else header.append(controls);
    });

    applyScale();

    window.addEventListener('resize', () => {
      trackedElements.forEach((element) => element.style.removeProperty('font-size'));
      trackedElements.clear();
      fontDefaults = new WeakMap();
      applyScale();
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
