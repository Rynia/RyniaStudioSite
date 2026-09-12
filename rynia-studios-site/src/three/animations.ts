import * as THREE from 'three';
import gsap from 'gsap';

export function playIntroAnimation(group: THREE.Group): void {
  group.scale.set(0.85, 0.85, 0.85);
  
  const materials: THREE.Material[] = [];
  group.traverse((child) => {
    if (child instanceof THREE.Mesh || child instanceof THREE.LineSegments || child instanceof THREE.Line) {
      if (child.material) {
        if (Array.isArray(child.material)) {
          child.material.forEach(m => {
            if ((m as any).isShaderMaterial) return;
            m.transparent = true;
            m.opacity = 0;
            materials.push(m);
          });
        } else {
          if ((child.material as any).isShaderMaterial) return;
          child.material.transparent = true;
          child.material.opacity = 0;
          materials.push(child.material);
        }
      }
    }
  });

  gsap.to(group.scale, {
    x: 1,
    y: 1,
    z: 1,
    duration: 2.2,
    ease: 'power2.out'
  });

  materials.forEach(mat => {
    const targetOpacity = (mat as THREE.LineBasicMaterial).type === 'LineBasicMaterial' ? 0.45 : 1.0;
    gsap.to(mat, {
      opacity: targetOpacity,
      duration: 2.2,
      ease: 'power2.out'
    });
  });
}

export function startBreathingAnimation(group: THREE.Group): { stop: () => void } {
  let animationFrameId: number;

  const primaryRing = group.getObjectByName('PrimaryRing');
  const secondaryRing = group.getObjectByName('SecondaryRing');
  const gameNode = group.getObjectByName('GameNode');
  const utilityNode = group.getObjectByName('UtilityNode');
  const systemsNode = group.getObjectByName('SystemsNode');
  const sigil = group.getObjectByName('EmissiveSigil');

  function animate() {
    const time = performance.now() / 1000;

    // Slow, stately breathing oscillation for the monolith base
    group.position.y = Math.sin(time * 0.8) * 0.04;

    // Counter-rotating kinetic rings
    if (primaryRing) {
      primaryRing.rotation.z = time * 0.15;
    }
    if (secondaryRing) {
      secondaryRing.rotation.y = -time * 0.22;
    }

    // Satellite orbital oscillations
    if (gameNode) {
      gameNode.position.y = 0.45 + Math.sin(time * 1.2) * 0.08;
      gameNode.rotation.y = time * 0.6;
    }
    if (utilityNode) {
      utilityNode.position.y = -0.55 + Math.cos(time * 1.1) * 0.08;
      utilityNode.rotation.x = time * 0.5;
    }
    if (systemsNode) {
      systemsNode.position.x = 0.18 + Math.sin(time * 0.9) * 0.06;
      systemsNode.rotation.z = time * 0.7;
    }

    // Emissive Sigil pulse
    if (sigil && (sigil as THREE.Mesh).material) {
      const mat = (sigil as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.7 + Math.sin(time * 2.0) * 0.2;
    }
    
    animationFrameId = requestAnimationFrame(animate);
  }

  animate();

  return {
    stop: () => cancelAnimationFrame(animationFrameId)
  };
}
