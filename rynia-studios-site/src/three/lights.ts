import * as THREE from 'three';

export function createLights(): THREE.Group {
  const group = new THREE.Group();
  
  // 1. Studio Key Area Light (Warm Champagne & Bone White)
  const keyLight = new THREE.DirectionalLight(0xf5eedb, 2.4);
  keyLight.position.set(4, 6, 4);
  group.add(keyLight);
  
  // 2. Soft Ambient Hemisphere Light (Dark Obsidian to Bone)
  const hemisphereLight = new THREE.HemisphereLight(0x1a1d24, 0x08090a, 1.2);
  group.add(hemisphereLight);
  
  // 3. Rim / Contour Light (Sharp Cold Rim for Monolith Silhouette)
  const rimLight = new THREE.DirectionalLight(0x7a9dff, 2.2);
  rimLight.position.set(-6, 3, -5);
  group.add(rimLight);

  // 4. Subtle Champagne Fill Light from opposite quadrant
  const fillLight = new THREE.DirectionalLight(0xb7a27a, 1.4);
  fillLight.position.set(-3, -4, 3);
  group.add(fillLight);
  
  return group;
}
