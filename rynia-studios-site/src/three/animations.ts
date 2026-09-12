import * as THREE from 'three';
import gsap from 'gsap';

/**
 * Play subtle ceremonial intro animation for The Rynia Artefact
 * Emerges gracefully with rim light silhouette
 */
export function playIntroAnimation(group: THREE.Group): void {
  group.position.y -= 0.15;

  const materials: THREE.Material[] = [];
  group.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments || child instanceof THREE.Line) {
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => {
            m.transparent = true;
            m.opacity = 0;
            materials.push(m);
          });
        } else {
          child.material.transparent = true;
          child.material.opacity = 0;
          materials.push(child.material);
        }
      }
    }
  });

  gsap.to(group.position, {
    y: group.position.y + 0.15,
    duration: 2.4,
    ease: 'power3.out'
  });

  materials.forEach(mat => {
    const targetOpacity = (mat as THREE.LineBasicMaterial).type === 'LineBasicMaterial' ? 0.35 : 1.0;
    gsap.to(mat, {
      opacity: targetOpacity,
      duration: 2.8,
      ease: 'power2.out'
    });
  });
}

/**
 * Slow, stately micro-oscillation
 * Strictly avoids arbitrary spinning or restless movement
 */
export function startBreathingAnimation(group: THREE.Group): { stop: () => void } {
  let animationFrameId: number;

  function animate() {
    const time = performance.now() / 1000;
    // Monumental physical weight: micro-breathing amplitude 0.02, 6-second cycle
    group.position.y = Math.sin(time * 0.9) * 0.018;

    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  return {
    stop: () => cancelAnimationFrame(animationFrameId)
  };
}
