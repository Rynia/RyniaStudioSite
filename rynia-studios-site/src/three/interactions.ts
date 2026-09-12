import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Setup pointer micro-parallax
 * Strictly locked to maximum ±1.5 degrees (0.026 rad) with refined spring damping.
 */
export function setupMouseParallax(group: THREE.Group, _container: HTMLElement): { destroy: () => void } {
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  let vx = 0;
  let vy = 0;
  let animationFrameId: number;

  const springStiffness = 0.04;
  const springDamping = 0.88;
  const maxRad = 0.026; // Exactly ±1.5 degrees

  function onMouseMove(event: MouseEvent) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    targetRotationY = mouseX * maxRad;
    targetRotationX = -mouseY * maxRad;
  }

  function animate() {
    const fx = (targetRotationX - currentRotationX) * springStiffness;
    const fy = (targetRotationY - currentRotationY) * springStiffness;
    
    vx = (vx + fx) * springDamping;
    vy = (vy + fy) * springDamping;
    
    currentRotationX += vx;
    currentRotationY += vy;
    
    group.rotation.x = currentRotationX;
    group.rotation.y = currentRotationY;
    
    animationFrameId = requestAnimationFrame(animate);
  }

  window.addEventListener('mousemove', onMouseMove, { passive: true });
  animate();

  return {
    destroy: () => {
      window.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animationFrameId);
    }
  };
}

/**
 * Setup Scroll-driven Choreography across the 5 Acts
 * - Total scroll rotation strictly 110–140 degrees (approx 2.1 rad)
 * - Act I: Rim-lit silhouette and authority
 * - Act II: Chiseled facets and mineral vein reveal
 * - Act III: Internal fissure awakens with #B6422E oxide red emissive light (up to 1.35)
 * - Act IV: Deep inspection angle
 * - Act V: Camera pulls back into the void, revealing the monolith's scale standing alone
 */
export function setupScrollCamera(
  camera: THREE.PerspectiveCamera,
  _container: HTMLElement,
  artefactGroup?: THREE.Group
): { destroy: () => void } {
  // Check if reduced motion is preferred
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (artefactGroup) {
      artefactGroup.rotation.y = 0.35;
    }
    return { destroy: () => {} };
  }

  const fissureMesh = artefactGroup?.getObjectByName('InternalFissure') as THREE.Mesh | undefined;
  const fissureMat = fissureMesh?.material as THREE.MeshStandardMaterial | undefined;

  // Master scroll timeline scrubbed through page scroll
  const masterTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: document.body,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 1.2
    }
  });

  if (artefactGroup) {
    // Initial position: optik merkezden yaklasik %8 saga ve %5 asagiya
    // Rotation starts at -0.2 rad (-11 deg) and reaches +2.0 rad (+114 deg) -> total 125 deg!
    artefactGroup.rotation.y = -0.2;

    // Scroll progression of Artefact Rotation (Total: 125 degrees)
    masterTimeline.to(artefactGroup.rotation, {
      y: 2.0, // Strictly within 110° - 140° range!
      ease: 'power1.inOut'
    }, 0);

    // Subtle pitch tilt during descent
    masterTimeline.to(artefactGroup.rotation, {
      x: 0.12,
      ease: 'sine.inOut'
    }, 0);
  }

  // Camera Pullback in Act V (Dramatic zoom out to reveal solitary monolith in void)
  // Camera moves from 4.6 to 7.8 in the final third of the page
  masterTimeline.to(camera.position, {
    z: 7.6,
    y: 0.3,
    ease: 'power2.inOut'
  }, 0.65);

  // Act III Awakening: Internal Fissure glows with Oxide Red #B6422E (intensity up to 1.35)
  // Awakens around 35%-60% scroll, then gently recedes at the end of Act V
  if (fissureMat) {
    fissureMat.emissiveIntensity = 0.0;

    const fissureTl = gsap.timeline({
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0
      }
    });

    fissureTl.to(fissureMat, {
      emissiveIntensity: 0.0,
      duration: 0.25
    });
    // Act III: Awakens
    fissureTl.to(fissureMat, {
      emissiveIntensity: 1.38,
      duration: 0.25,
      ease: 'power2.out'
    });
    // Act IV: Sustains
    fissureTl.to(fissureMat, {
      emissiveIntensity: 0.95,
      duration: 0.25
    });
    // Act V: Recedes to cold dark silhouette
    fissureTl.to(fissureMat, {
      emissiveIntensity: 0.05,
      duration: 0.25,
      ease: 'power2.in'
    });
  }

  return {
    destroy: () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  };
}
