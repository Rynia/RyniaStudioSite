import * as THREE from 'three';

export function createLights(): THREE.Group {
  const group = new THREE.Group();
  
  // 1. Studio Key Light (Pure White with Crisp Angle)
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
  keyLight.position.set(5, 7, 5);
  group.add(keyLight);
  
  // 2. Soft Ambient Hemisphere Light (Sky White to Cool Gray)
  const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xe2e6ea, 1.3);
  group.add(hemisphereLight);
  
  // 3. Rim / Edge Contrast Light (Subtle cool titanium backlight)
  const rimLight = new THREE.DirectionalLight(0xcfd6df, 1.8);
  rimLight.position.set(-5, -3, -4);
  group.add(rimLight);

  // 4. Soft Bottom Fill for grounding
  const bottomLight = new THREE.DirectionalLight(0xf0f3f6, 0.9);
  bottomLight.position.set(0, -4, 2);
  group.add(bottomLight);
  
  return group;
}
