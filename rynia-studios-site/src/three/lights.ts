import * as THREE from 'three';

/**
 * The Rynia Artefact Lighting Specification (GPT-5.6 Sol Master Art Direction):
 * - Key Light: Sol-üst arkadan (horizontal -35°, vertical +48°, color #D8C7A8, intensity 3.2)
 * - Rim Light: Sağ arkadan soğuk rim (horizontal +125°, vertical +18°, color #7D8790, intensity 2.1)
 * - Fill Light: Kamera alt-sol yönünden nötr fill (-12°, color #868076, intensity 0.35)
 * - Ambient Light: Çok düşük ortam ışığı (#1B1A17, intensity 0.12)
 */
export function createLights(): THREE.Group {
  const group = new THREE.Group();
  group.name = 'LightingRig';

  // 1. Key Light (Top-Left Rear Warm Light)
  const keyLight = new THREE.DirectionalLight(0xd8c7a8, 3.2);
  keyLight.position.set(-3.8, 7.4, -5.5);
  keyLight.castShadow = true;
  group.add(keyLight);

  // 2. Rim Light (Right Rear Cold Metallic Rim)
  const rimLight = new THREE.DirectionalLight(0x7d8790, 2.1);
  rimLight.position.set(7.8, 3.1, -5.5);
  group.add(rimLight);

  // 3. Low Neutral Fill Light (Camera Bottom-Left)
  const fillLight = new THREE.DirectionalLight(0x868076, 0.35);
  fillLight.position.set(-1.6, -1.2, 5.0);
  group.add(fillLight);

  // 4. Ambient Light (Subtle Dark Obsidian Depth)
  const ambientLight = new THREE.AmbientLight(0x1b1a17, 0.12);
  group.add(ambientLight);

  return group;
}
