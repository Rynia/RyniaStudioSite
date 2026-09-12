import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

/**
 * Initializes Lenis smooth scrolling with unified GSAP ticker.
 * Designed specifically for butter-smooth motion on Windows mouse wheel
 * while preserving native touch responsiveness on mobile.
 */
export function initSmoothScroll(): Lenis {
  if (lenisInstance) return lenisInstance;

  lenisInstance = new Lenis({
    autoRaf: false,
    smoothWheel: true,
    syncTouch: false, // Native touch behavior on mobile devices
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
  });

  // Synchronize Lenis scroll with GSAP ScrollTrigger
  lenisInstance.on('scroll', () => {
    ScrollTrigger.update();
  });

  // Hook Lenis into GSAP's master ticker
  gsap.ticker.add((time) => {
    lenisInstance?.raf(time * 1000);
  });

  // Critical: lagSmoothing(0) prevents GSAP ticker lag compensation from fighting Lenis
  gsap.ticker.lagSmoothing(0);

  // Smooth scroll for in-page anchors
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href && href.length > 1 && !href.startsWith('#!')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          lenisInstance?.scrollTo(target as HTMLElement, {
            offset: 0,
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
          });
        }
      }
    });
  });

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}
