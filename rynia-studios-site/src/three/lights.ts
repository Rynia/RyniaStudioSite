import * as THREE from 'three';

/**
 * The Rynia Reliquary Atelier Studio Lighting Rig:
 * - Key Light: Front-Left-Top (grazes obsidian facets and bronze spine with warm gold specular sheen)
 * - Rim Light: Front-Right-Top (sharp metallic edge reflections)
 * - Silhouette Backlight: Rear-Right (separates dark obsidian from background void)
 * - Bounce Light: Soft cool under-fill from below
 * - Ambient Light: Deep warm graphite foundation, lifting shadows to rich bronze-charcoal
 */
export function createLights(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'LightingRig';

  // 1. Studio Key Light (Front-Left-Top)
  const keyLight = new THREE.DirectionalLight(0xf4ebe0, 3.4);
  keyLight.position.set(-3.2, 5.0, 4.2);
  group.add(keyLight);

  // 2. Front Rim Light (Front-Right metallic grazing highlight)
  const frontRim = new THREE.DirectionalLight(0xb4c2d2, 2.6);
  frontRim.position.set(4.2, 3.6, 3.8);
  group.add(frontRim);

  // 3. Silhouette Backlight (Rear-Right silhouette separation)
  const backRim = new THREE.DirectionalLight(0xd4af37, 2.4);
  backRim.position.set(3.2, 2.4, -3.2);
  group.add(backRim);

  // 4. Subtle Under-Fill Bounce Light
  const bounceLight = new THREE.DirectionalLight(0x50545c, 0.9);
  bounceLight.position.set(0.0, -3.5, 3.0);
  group.add(bounceLight);

  // 5. Rich Ambient Foundation (Elevates shadows to deep bronze-charcoal)
  const ambientLight = new THREE.AmbientLight(0x22201e, 0.75);
  group.add(ambientLight);

  return group;
}

