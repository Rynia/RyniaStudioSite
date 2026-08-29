import * as THREE from 'three';

export function createLights(): THREE.Group {
  const group = new THREE.Group();
  
  // Warm golden key light (intense studio spotlight)
  const directionalLight = new THREE.DirectionalLight(0xffe6cc, 2.8);
  directionalLight.position.set(4, 5, 4);
  group.add(directionalLight);
  
  // Soft cool ambient fill
  const hemisphereLight = new THREE.HemisphereLight(0xe8e4df, 0x181818, 0.3);
  group.add(hemisphereLight);
  
  // Intense Bronze rim/back light for edge definition
  const pointLight1 = new THREE.PointLight(0xc9a968, 2.8, 12);
  pointLight1.position.set(-2.5, 3, -1);
  group.add(pointLight1);

  // Soft cool blue back accent
  const pointLight2 = new THREE.PointLight(0xaaccff, 1.4, 10);
  pointLight2.position.set(3, -2, -2);
  group.add(pointLight2);
  
  return group;
}


