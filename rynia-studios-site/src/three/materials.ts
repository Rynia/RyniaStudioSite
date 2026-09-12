import * as THREE from 'three';

/**
 * 1. Monolith Obsidian & Oxidized Metal Material
 * Black oxidized metal, obsidian, mineral reflections
 */
export function createObsidianMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x0a0b0d),
    metalness: 0.86,
    roughness: 0.28,
    clearcoat: 0.5,
    clearcoatRoughness: 0.2,
    reflectivity: 0.92,
    flatShading: true // Faceted ceremonial carved monolith look
  });
}

/**
 * 2. Internal Fissure Core Material (Oxide Red #B6422E)
 * Awakens in Act III with controllable emissive intensity up to ~1.4
 */
export function createFissureMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xb6422e),
    emissive: new THREE.Color(0xb6422e),
    emissiveIntensity: 0.0, // Dormant in Act I and II
    roughness: 0.4,
    metalness: 0.2
  });
}

/**
 * 3. Faint Ivory Mineral Veins (#D6C5A2)
 */
export function createMineralVeinMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0xd6c5a2,
    transparent: true,
    opacity: 0.35,
    linewidth: 1
  });
}

/**
 * 4. Architectural Hairline Edge Material (#E8E2D6)
 */
export function createHairlineEdgeMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0xe8e2d6,
    transparent: true,
    opacity: 0.14
  });
}

// Backward compatibility exports
export function createObsidianCoreMaterial(): THREE.MeshPhysicalMaterial {
  return createObsidianMaterial();
}
export function createChampagneGoldMaterial(): THREE.MeshStandardMaterial {
  return createFissureMaterial();
}
export function createEmissiveGlyphMaterial(): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({ color: 0xb6422e, transparent: true, opacity: 0.8 });
}
export function createOrbitalRingMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({ color: 0xd6c5a2, transparent: true, opacity: 0.3 });
}
export function createEdgeMaterial(): THREE.LineBasicMaterial {
  return createHairlineEdgeMaterial();
}
