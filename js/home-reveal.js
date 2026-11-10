document.addEventListener('DOMContentLoaded', () => {
  const revealTargets = document.querySelectorAll('[data-reveal]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || !('IntersectionObserver' in window) || revealTargets.length === 0) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.documentElement.classList.add('reveal-enabled');
  revealTargets.forEach((target) => observer.observe(target));
});
