import * as THREE from 'three';

// 1. Obsidian & Titanium Monolith Core
export function createObsidianCoreMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0x101216),
    metalness: 0.82,
    roughness: 0.32,
    clearcoat: 0.45,
    clearcoatRoughness: 0.18,
    reflectivity: 0.9
  });
}

// 2. Brushed Champagne Gold Accents & Frames
export function createChampagneGoldMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xb7a27a),
    metalness: 0.88,
    roughness: 0.24
  });
}

// 3. Inner Energy & Runic Emissive Glyphs
export function createEmissiveGlyphMaterial(): THREE.MeshBasicMaterial {
  return new THREE.MeshBasicMaterial({
    color: new THREE.Color(0xd4af37),
    transparent: true,
    opacity: 0.85
  });
}

// 4. Kinetic Orbital Rings & Precision Hairlines
export function createOrbitalRingMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0xb7a27a,
    transparent: true,
    opacity: 0.38
  });
}

// 5. Precision Hairline Wireframe
export function createEdgeMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0xf1eee8,
    opacity: 0.12,
    transparent: true
  });
}

// Backward-compatibility exports
export function createCeramicCoreMaterial(): THREE.MeshPhysicalMaterial {
  return createObsidianCoreMaterial();
}

export function createRefractiveGlassMaterial(): THREE.MeshPhysicalMaterial {
  return createObsidianCoreMaterial();
}

export function createTitaniumAccentMaterial(): THREE.MeshStandardMaterial {
  return createChampagneGoldMaterial();
}

export function createInsetMaterial(): THREE.LineBasicMaterial {
  return createOrbitalRingMaterial();
}

export function createCardMaterial(): THREE.MeshPhysicalMaterial {
  return createObsidianCoreMaterial();
}

export function createRimMaterial(): THREE.MeshStandardMaterial {
  return createChampagneGoldMaterial();
}

export function createFresnelShaderMaterial(): THREE.MeshPhysicalMaterial {
  return createObsidianCoreMaterial();
}
