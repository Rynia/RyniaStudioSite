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
 * Setup 5 Distinct Dramatic States for The Rynia Artefact
 * Sol Master Art Direction Pass:
 * 1. Hero: Monumental & dark silhouette (imposing upward angle).
 * 2. Systems: Chiseled industrial face & mineral veins, framed to the right.
 * 3. Thesis: Extreme macro close-up on obsidian facets & #B6422E fissure awakening.
 * 4. Pipelines: Steep architectural cross-section & rim edge profile.
 * 5. Dossier: Dramatic camera pullback into infinite dark void, revealing solitary scale.
 */
export function setupScrollCamera(
  camera: THREE.PerspectiveCamera,
  _container: HTMLElement,
  artefactGroup?: THREE.Group
): { destroy: () => void } {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    if (artefactGroup) {
      artefactGroup.rotation.y = 0.4;
    }
    return { destroy: () => {} };
  }

  const fissureMesh = artefactGroup?.getObjectByName('InternalFissure') as THREE.Mesh | undefined;
  const fissureMat = fissureMesh?.material as THREE.MeshStandardMaterial | undefined;

  const triggers: ScrollTrigger[] = [];

  // Helper to safely register section-based scroll animation
  const actArtefact = document.getElementById('act-artefact');
  const actSystems = document.getElementById('act-systems');
  const actThesis = document.getElementById('act-thesis');
  const actForge = document.getElementById('act-forge');
  const actDossier = document.getElementById('act-dossier');

  if (artefactGroup && actArtefact && actSystems && actThesis && actForge && actDossier) {
    // Initial State (Act I Hero)
    artefactGroup.position.set(0.38, -0.18, 0);
    artefactGroup.rotation.set(0.04, -0.22, 0);
    camera.position.set(0, -0.22, 4.6);
    if (fissureMat) fissureMat.emissiveIntensity = 0.0;

    // Transition Act I -> Act II (Systems: Reveal chiseled facets, move right)
    const st1 = ScrollTrigger.create({
      trigger: actSystems,
      start: 'top bottom',
      end: 'top center',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        artefactGroup.rotation.y = THREE.MathUtils.lerp(-0.22, 0.52, p);
        artefactGroup.rotation.x = THREE.MathUtils.lerp(0.04, 0.08, p);
        artefactGroup.position.x = THREE.MathUtils.lerp(0.38, 0.50, p);
        camera.position.z = THREE.MathUtils.lerp(4.6, 4.2, p);
        camera.position.y = THREE.MathUtils.lerp(-0.22, -0.14, p);
        if (fissureMat) fissureMat.emissiveIntensity = THREE.MathUtils.lerp(0.0, 0.15, p);
      }
    });
    triggers.push(st1);

    // Transition Act II -> Act III (Thesis: Macro close-up on fissure awakening)
    const st2 = ScrollTrigger.create({
      trigger: actThesis,
      start: 'top bottom',
      end: 'top center',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        artefactGroup.rotation.y = THREE.MathUtils.lerp(0.52, 1.08, p);
        artefactGroup.rotation.x = THREE.MathUtils.lerp(0.08, 0.03, p);
        artefactGroup.position.x = THREE.MathUtils.lerp(0.50, 0.18, p);
        artefactGroup.position.y = THREE.MathUtils.lerp(-0.14, -0.04, p);
        // Zoom camera in tight for macro material examination
        camera.position.z = THREE.MathUtils.lerp(4.2, 2.85, p);
        camera.position.y = THREE.MathUtils.lerp(-0.14, 0.02, p);
        // Fissure awakens with deep oxide red glow
        if (fissureMat) fissureMat.emissiveIntensity = THREE.MathUtils.lerp(0.15, 1.45, p);
      }
    });
    triggers.push(st2);

    // Transition Act III -> Act IV (Pipelines: Pull out to steep architectural edge silhouette)
    const st3 = ScrollTrigger.create({
      trigger: actForge,
      start: 'top bottom',
      end: 'top center',
      scrub: 1.2,
      onUpdate: (self) => {
        const p = self.progress;
        artefactGroup.rotation.y = THREE.MathUtils.lerp(1.08, 1.68, p);
        artefactGroup.rotation.x = THREE.MathUtils.lerp(0.03, 0.12, p);
        artefactGroup.position.x = THREE.MathUtils.lerp(0.18, 0.58, p);
        artefactGroup.position.y = THREE.MathUtils.lerp(-0.04, -0.12, p);
        camera.position.z = THREE.MathUtils.lerp(2.85, 4.8, p);
        camera.position.y = THREE.MathUtils.lerp(0.02, 0.08, p);
        if (fissureMat) fissureMat.emissiveIntensity = THREE.MathUtils.lerp(1.45, 0.35, p);
      }
    });
    triggers.push(st3);

    // Transition Act IV -> Act V (Dossier: Dramatic pullback into the void)
    const st4 = ScrollTrigger.create({
      trigger: actDossier,
      start: 'top bottom',
      end: 'center center',
      scrub: 1.4,
      onUpdate: (self) => {
        const p = self.progress;
        artefactGroup.rotation.y = THREE.MathUtils.lerp(1.68, 2.15, p); // Total rotation ~135°!
        artefactGroup.position.x = THREE.MathUtils.lerp(0.58, 0.0, p);
        artefactGroup.position.y = THREE.MathUtils.lerp(-0.12, 0.0, p);
        // Camera retreats into vast space
        camera.position.z = THREE.MathUtils.lerp(4.8, 8.2, p);
        camera.position.y = THREE.MathUtils.lerp(0.08, 0.25, p);
        // Fissure dims leaving cold dark solitary silhouette
        if (fissureMat) fissureMat.emissiveIntensity = THREE.MathUtils.lerp(0.35, 0.02, p);
      }
    });
    triggers.push(st4);
  }

  return {
    destroy: () => {
      triggers.forEach(t => t.kill());
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    }
  };
}
