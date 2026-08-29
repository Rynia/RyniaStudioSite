// Import styles
import './styles/main.css';

// Import UI modules
import { initNav } from './ui/nav';
import { initReveal } from './ui/reveal';
import { initNewsletter } from './ui/newsletter';

// Import i18n
import { initLanguage, bindLanguageButtons } from './i18n/i18n';

// Initialize UI when DOM is ready
function init(): void {
  // Initialize UI components immediately
  initNav();
  initReveal();
  initNewsletter();

  // Initialize language (load saved preference & bind buttons)
  initLanguage();
  bindLanguageButtons();

  // Initialize 3D hero scene with lazy dynamic import
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
      console.warn('HeroScene 3D init fallback:', e);
      const fallback = document.getElementById('hero-fallback');
      if (fallback) fallback.style.display = 'block';
    }
  };

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => {
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => mountHeroScene(), { timeout: 2500 });
              } else {
                mountHeroScene();
              }
            }, 1000);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(heroContainer);
  } else {
    setTimeout(mountHeroScene, 1200);
  }
}

// Start
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}