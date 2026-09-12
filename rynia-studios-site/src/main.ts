// Import styles
import './styles/main.css';

// Import UI modules
import { initTheme } from './ui/theme';
import { initNav } from './ui/nav';
import { initReveal } from './ui/reveal';
import { initNewsletter } from './ui/newsletter';

// Import smooth scrolling (Lenis + GSAP unified)
import { initSmoothScroll } from './smoothScroll';

// Import i18n
import { initLanguage, bindLanguageButtons } from './i18n/i18n';

// Initialize UI when DOM is ready
function init(): void {
  // Initialize Theme immediately to prevent flash
  initTheme();

  // Initialize buttery smooth scrolling (Lenis)
  initSmoothScroll();

  // Initialize UI components immediately
  initNav();
  initReveal();
  initNewsletter();
  initNetlifyBadgeFix();

  // Initialize language (load preference & bind buttons)
  initLanguage();
  bindLanguageButtons();

  // Initialize 3D exhibition scene
  const heroContainer = document.getElementById('hero-canvas-container');
  if (!heroContainer) return;

  let heroSceneMounted = false;

  const mountHeroScene = async () => {
    if (heroSceneMounted) return;
    heroSceneMounted = true;
    try {
      const { HeroScene } = await import('./three/HeroScene');
      const scene = new HeroScene(heroContainer);
      await scene.init();
    } catch (e) {
      console.warn('The Rynia Artefact 3D fallback active:', e);
      const fallback = document.getElementById('hero-fallback');
      if (fallback) fallback.style.display = 'block';
    }
  };

  // Mount cleanly after initial DOM paint
  requestAnimationFrame(() => {
    mountHeroScene();
  });
}

function initNetlifyBadgeFix(): void {
  const cleanBadge = () => {
    const selectors = [
      'a[href*="netlify.com"]',
      'a[href*="netlify.app"]',
      '[data-netlify-badge]',
      '.netlify-badge',
      '#netlify-badge',
      'div[class*="netlify"]',
      'div[id*="netlify"]',
    ];

    selectors.forEach((sel) => {
      document.querySelectorAll<HTMLElement>(sel).forEach((el) => {
        el.style.setProperty('background', 'transparent', 'important');
        el.style.setProperty('background-color', 'transparent', 'important');
        el.style.setProperty('box-shadow', 'none', 'important');
        el.style.setProperty('border', 'none', 'important');

        let parent = el.parentElement;
        while (parent && parent !== document.body && parent !== document.documentElement) {
          parent.style.setProperty('background', 'transparent', 'important');
          parent.style.setProperty('background-color', 'transparent', 'important');
          parent.style.setProperty('box-shadow', 'none', 'important');
          parent.style.setProperty('border', 'none', 'important');
          parent = parent.parentElement;
        }
      });
    });

    document.querySelectorAll<HTMLElement>('div, a').forEach((el) => {
      const comp = window.getComputedStyle(el);
      if (comp.position === 'fixed') {
        const b = parseInt(comp.bottom, 10);
        const r = parseInt(comp.right, 10);
        if (!isNaN(b) && b < 80 && !isNaN(r) && r < 80) {
          if (el.innerHTML.toLowerCase().includes('netlify')) {
            el.style.setProperty('background', 'transparent', 'important');
            el.style.setProperty('background-color', 'transparent', 'important');
            el.style.setProperty('box-shadow', 'none', 'important');
            el.style.setProperty('border', 'none', 'important');
          }
        }
      }
    });
  };

  cleanBadge();
  setTimeout(cleanBadge, 300);
  setTimeout(cleanBadge, 1000);
  setTimeout(cleanBadge, 2500);

  if ('MutationObserver' in window) {
    const observer = new MutationObserver(() => cleanBadge());
    observer.observe(document.body, { childList: true, subtree: true });
  }
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}