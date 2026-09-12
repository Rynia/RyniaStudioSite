import * as THREE from 'three';

/**
 * 1. Monolith Obsidian & Oxidized Metal Material
 * Black oxidized metal, obsidian, mineral reflections
 */
export function createObsidianMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x16181e),
    metalness: 0.82,
    roughness: 0.25,
    flatShading: true // Faceted ceremonial carved monolith look
  });
}

/**
 * 2. Internal Fissure Core Material (Oxide Red #9E2F1E)
 * Awakens with subtle smoldering core glow
 */
export function createFissureMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x8a2416),
    emissive: new THREE.Color(0xa63220),
    emissiveIntensity: 0.0, // Controlled by interactions
    roughness: 0.35,
    metalness: 0.4
  });
}

/**
 * 3. Faint Ivory Mineral Veins (#D6C5A2)
 */
export function createMineralVeinMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0xd6c5a2,
    transparent: true,
    opacity: 0.4,
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
    opacity: 0.22
  });
}

/**
 * 5. Aged Bronze Structural Spine Material (#6E553C)
 * Deep aged ceremonial bronze with warm metallic reflection
 */
export function createAgedBronzeMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x6e553c),
    metalness: 0.88,
    roughness: 0.32,
    flatShading: true
  });
}

/**
 * 6. Tactical Lamella Core Plate Material
 * Precision-machined dark obsidian/titanium plates
 */
export function createTacticalLamellaMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0x1a1c22),
    metalness: 0.92,
    roughness: 0.20,
    flatShading: true
  });
}

// Backward compatibility exports
export function createObsidianCoreMaterial(): THREE.MeshStandardMaterial {
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
