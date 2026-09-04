import * as THREE from 'three';

// Ceramic White Core Material (Apple / Teenage Engineering Industrial Look)
export function createCeramicCoreMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xf6f7fa),
    roughness: 0.22,
    metalness: 0.06,
    clearcoat: 0.65,
    clearcoatRoughness: 0.12,
    reflectivity: 0.85
  });
}

// Refractive Frosted Glass Material (High Transmission & IOR)
export function createRefractiveGlassMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(0xffffff),
    transmission: 0.92,
    opacity: 0.95,
    transparent: true,
    roughness: 0.08,
    ior: 1.52,
    thickness: 1.2,
    specularIntensity: 1.0,
    specularColor: new THREE.Color(0xffffff)
  });
}

// Brushed Titanium & Platinum Material
export function createTitaniumAccentMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: new THREE.Color(0xbcc2cb),
    metalness: 0.88,
    roughness: 0.22
  });
}

// Hairline Wireframe & Precision Lines
export function createEdgeMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0x0d0d11,
    opacity: 0.18,
    transparent: true
  });
}

export function createInsetMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0xb08d57,
    opacity: 0.5,
    transparent: true
  });
}

// Backward compatibility exports so no existing references break
export function createCardMaterial(): THREE.MeshPhysicalMaterial {
  return createCeramicCoreMaterial();
}

export function createRimMaterial(): THREE.MeshStandardMaterial {
  return createTitaniumAccentMaterial();
}

export function createFresnelShaderMaterial(): THREE.MeshPhysicalMaterial {
  return createRefractiveGlassMaterial();
}
