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
    duration: 2.5,
    ease: 'power2.out'
  });

  materials.forEach(mat => {
    const targetOpacity = (mat as THREE.LineBasicMaterial).type === 'LineBasicMaterial' ? 0.6 : 1.0;
    gsap.to(mat, {
      opacity: targetOpacity,
      duration: 2.5,
      ease: 'power2.out'
    });
  });
}

export function startBreathingAnimation(group: THREE.Group): { stop: () => void } {
  let animationFrameId: number;
  let shaderMaterials: THREE.ShaderMaterial[] = [];
  
  group.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material && (child.material as any).isShaderMaterial) {
      shaderMaterials.push(child.material as THREE.ShaderMaterial);
    }
  });

  function animate() {
    const time = performance.now() / 1000;
    // Slow, stately 14s breathing period
    group.rotation.y = Math.sin(time * Math.PI * 2 / 14) * 0.035;
    group.rotation.z = Math.sin(time * Math.PI * 2 / 14) * 0.017;
    
    shaderMaterials.forEach(mat => {
      if (mat.uniforms && mat.uniforms.time) {
        mat.uniforms.time.value = time;
      }
    });
    
    animationFrameId = requestAnimationFrame(animate);
  }


  animate();

  return {
    stop: () => cancelAnimationFrame(animationFrameId)
  };
}
