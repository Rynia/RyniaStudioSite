import * as THREE from 'three';

export function createCardMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0x222120,
    roughness: 0.7,
    metalness: 0.1
  });
}

export function createEdgeMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0xd4af37,
    opacity: 0.85,
    transparent: true
  });
}

export function createInsetMaterial(): THREE.LineBasicMaterial {
  return new THREE.LineBasicMaterial({
    color: 0xc9a968,
    opacity: 0.7,
    transparent: true
  });
}

export function createRimMaterial(): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: 0xc9a968,
    emissive: 0xc9a968,
    emissiveIntensity: 0.6,
    metalness: 0.2,
    roughness: 0.6
  });
}


export function createFresnelShaderMaterial(): THREE.ShaderMaterial {
  const vertexShader = `
    varying vec3 vViewPosition;
    varying vec3 vNormal;

    void main() {
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      vNormal = normalize(normalMatrix * normal);
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const fragmentShader = `
    uniform vec3 glowColor;
    uniform float intensity;
    uniform float time;
    
    varying vec3 vViewPosition;
    varying vec3 vNormal;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);
      
      // Fresnel calculation
      float fresnel = dot(viewDir, normal);
      fresnel = clamp(1.0 - fresnel, 0.0, 1.0);
      fresnel = pow(fresnel, 3.5);
      
      float shimmer = (sin(time * 1.5) * 0.12) + 0.88;
      
      gl_FragColor = vec4(glowColor * intensity, fresnel * intensity * shimmer);
    }
  `;

  return new THREE.ShaderMaterial({
    uniforms: {
      glowColor: { value: new THREE.Color(0xd4af37) },
      intensity: { value: 1.3 },
      time: { value: 0.0 }
    },
    vertexShader,
    fragmentShader,
    transparent: true,
    side: THREE.FrontSide,
    depthWrite: false
  });
}

