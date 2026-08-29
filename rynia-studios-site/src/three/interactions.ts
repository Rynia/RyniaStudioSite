import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function setupMouseParallax(group: THREE.Group, _container: HTMLElement): { destroy: () => void } {
  let targetRotationX = 0;
  let targetRotationY = 0;
  let currentRotationX = 0;
  let currentRotationY = 0;
  let vx = 0;
  let vy = 0;
  let animationFrameId: number;

  const springStiffness = 0.05;
  const springDamping = 0.84;

  function onMouseMove(event: MouseEvent) {
    const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    
    // Max 8 degrees (~0.14 rad)
    targetRotationY = mouseX * 0.14;
    targetRotationX = mouseY * -0.14;
  }

  function animate() {
    // Spring physics simulation: Force = (target - current) * stiffness
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


export function setupScrollCamera(camera: THREE.PerspectiveCamera, container: HTMLElement): { destroy: () => void } {
  const heroElement = container.closest('.hero') || container;
  
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: heroElement,
      start: "top top",
      end: "bottom top",
      scrub: 1.2
    }
  });

  tl.to(camera.position, {
    z: 3.4,
    ease: "power1.out"
  }, 0);

  tl.to(camera.rotation, {
    y: 0.04,
    ease: "power1.out"
  }, 0);

  return {
    destroy: () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    }
  };
}

