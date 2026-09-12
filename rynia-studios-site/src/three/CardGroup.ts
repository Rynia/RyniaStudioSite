import * as THREE from 'three';
import {
  createObsidianMaterial,
  createFissureMaterial,
  createMineralVeinMaterial,
  createHairlineEdgeMaterial,
  createAgedBronzeMaterial,
  createTacticalLamellaMaterial
} from './materials';

/**
 * Creates "The Rynia Reliquary" (Atölye Üretim Kalıbı)
 * A monolithic physical ceremonial vessel:
 * - 3 Interlocking Asymmetrical Obsidian Facets (The Outer Shell)
 * - Aged Dark Bronze Structural Spine (forms an implicit architectural "R" silhouette in negative space)
 * - 4 Precision-Machined Internal Tactical Lamellas (Draft, Evolution, Position, Clash / Raw to System)
 * - Internal Oxide Red (#B6422E) Fissure channel
 */
export function createCardGroup(): THREE.Group {
  return createReliquary();
}

export function createArtefact(): THREE.Group {
  return createReliquary();
}

export function createReliquary(): THREE.Group {
  const root = new THREE.Group();
  root.name = 'RyniaReliquary';

  const obsidianMat = createObsidianMaterial();
  const bronzeMat = createAgedBronzeMaterial();
  const lamellaMat = createTacticalLamellaMaterial();
  const fissureMat = createFissureMaterial();
  const mineralMat = createMineralVeinMaterial();
  const hairlineMat = createHairlineEdgeMaterial();

  // ========================================================
  // 1. AGED BRONZE STRUCTURAL SPINE (Implicit "R" Monogram)
  // ========================================================
  const spineGroup = new THREE.Group();
  spineGroup.name = 'BronzeSpine';

  // Vertical Spine Stem (Height: 3.2, Width: 0.22, Depth: 0.45)
  const stemGeo = new THREE.BoxGeometry(0.20, 3.2, 0.48);
  const stemMesh = new THREE.Mesh(stemGeo, bronzeMat);
  stemMesh.position.set(-0.24, 0, 0);
  stemMesh.castShadow = true;
  stemMesh.receiveShadow = true;
  spineGroup.add(stemMesh);

  // Upper Beveled Loop of the "R" (Interlocking Bronze Arch)
  const loopGeo = new THREE.BoxGeometry(0.55, 0.95, 0.40);
  const loopMesh = new THREE.Mesh(loopGeo, bronzeMat);
  loopMesh.position.set(0.12, 0.65, 0.05);
  loopMesh.rotation.z = -0.08;
  loopMesh.castShadow = true;
  spineGroup.add(loopMesh);

  // Lower Diagonal Brace / Leg of the "R" (Tactical Strut)
  const legGeo = new THREE.BoxGeometry(0.22, 1.25, 0.42);
  const legMesh = new THREE.Mesh(legGeo, bronzeMat);
  legMesh.position.set(0.18, -0.62, 0.04);
  legMesh.rotation.z = -0.48; // Architectural diagonal thrust
  legMesh.castShadow = true;
  spineGroup.add(legMesh);

  // Structural Spine Edges
  [stemMesh, loopMesh, legMesh].forEach((part) => {
    const partEdges = new THREE.EdgesGeometry(part.geometry, 25);
    const edgeLines = new THREE.LineSegments(partEdges, hairlineMat);
    part.add(edgeLines);
  });

  root.add(spineGroup);

  // ========================================================
  // 2. 4 INTERNAL TACTICAL LAMELLAS (Precision Machined Core)
  // ========================================================
  const lamellasGroup = new THREE.Group();
  lamellasGroup.name = 'TacticalLamellas';

  const lamellaWidth = 0.58;
  const lamellaHeight = 1.05;
  const lamellaDepth = 0.045;
  const lamellaGeo = new THREE.BoxGeometry(lamellaWidth, lamellaHeight, lamellaDepth);
  const lamellaEdgesGeo = new THREE.EdgesGeometry(lamellaGeo);

  // 4 Tactical Core Plates sitting inside the reliquary's chamber
  const plateZOffsets = [-0.15, -0.05, 0.05, 0.15];
  for (let i = 0; i < 4; i++) {
    const lamella = new THREE.Mesh(lamellaGeo, lamellaMat);
    lamella.name = `Lamella_${i}`;
    lamella.position.set(0.08, 0.12, plateZOffsets[i]);
    lamella.castShadow = true;

    // Edge wireframe outlining each plate's tactical boundary
    const lEdges = new THREE.LineSegments(lamellaEdgesGeo, hairlineMat);
    lamella.add(lEdges);

    lamellasGroup.add(lamella);
  }

  root.add(lamellasGroup);

  // ========================================================
  // 3. ASYMMETRICAL OBSIDIAN OUTER SHELL (3 Interlocking Facets)
  // ========================================================
  const shellGroup = new THREE.Group();
  shellGroup.name = 'OuterShell';

  // Facet A: Left Chiseled Wing (Armor flank)
  const leftWingGeo = createChiseledFacetGeometry([
    [-0.82, -1.55,  0.38],
    [-0.30, -1.55,  0.42],
    [-0.30,  1.55,  0.32],
    [-0.68,  1.42,  0.22],
    [-0.78, -1.55, -0.38],
    [-0.30, -1.55, -0.42],
    [-0.30,  1.55, -0.32],
    [-0.64,  1.42, -0.22]
  ]);
  const leftWing = new THREE.Mesh(leftWingGeo, obsidianMat);
  leftWing.name = 'ShellLeftWing';
  leftWing.castShadow = true;
  leftWing.receiveShadow = true;
  shellGroup.add(leftWing);

  // Facet B: Right Sloped Prow (Faceted angular face)
  const rightProwGeo = createChiseledFacetGeometry([
    [ 0.28, -1.55,  0.42],
    [ 0.72, -1.55,  0.36],
    [ 0.58,  1.45,  0.24],
    [ 0.28,  1.55,  0.30],
    [ 0.28, -1.55, -0.42],
    [ 0.68, -1.55, -0.36],
    [ 0.54,  1.45, -0.24],
    [ 0.28,  1.55, -0.30]
  ]);
  const rightProw = new THREE.Mesh(rightProwGeo, obsidianMat);
  rightProw.name = 'ShellRightProw';
  rightProw.castShadow = true;
  rightProw.receiveShadow = true;
  shellGroup.add(rightProw);

  // Facet C: Lower Base Keystone
  const baseKeyGeo = new THREE.BoxGeometry(1.48, 0.45, 0.88);
  const baseKey = new THREE.Mesh(baseKeyGeo, obsidianMat);
  baseKey.name = 'ShellBaseKey';
  baseKey.position.set(0, -1.62, 0);
  baseKey.castShadow = true;
  shellGroup.add(baseKey);

  // Wireframe edges on shell facets
  [leftWing, rightProw, baseKey].forEach((part) => {
    const pEdges = new THREE.EdgesGeometry(part.geometry, 18);
    const pLines = new THREE.LineSegments(pEdges, hairlineMat);
    part.add(pLines);
  });

  root.add(shellGroup);

  // ========================================================
  // 4. CONTROLLED INTERNAL FISSURE (#8A2416 Recessed Core Seam)
  // ========================================================
  const fissureGeo = new THREE.BoxGeometry(0.014, 2.4, 0.03);
  const fissureMesh = new THREE.Mesh(fissureGeo, fissureMat);
  fissureMesh.name = 'InternalFissure';
  fissureMesh.position.set(-0.06, 0.05, 0.02);
  fissureMesh.rotation.z = -0.04;
  root.add(fissureMesh);

  // Mineral micro-veins along the seam
  const veinPoints = [
    new THREE.Vector3(-0.42, -1.2, 0.22),
    new THREE.Vector3(-0.28, -0.3, 0.24),
    new THREE.Vector3(-0.16,  0.4, 0.20),
    new THREE.Vector3(-0.08,  1.1, 0.16),
    new THREE.Vector3( 0.02,  1.5, 0.12)
  ];
  const veinGeo = new THREE.BufferGeometry().setFromPoints(veinPoints);
  const veinLine = new THREE.Line(veinGeo, mineralMat);
  veinLine.name = 'MineralVein';
  root.add(veinLine);

  return root;
}

/**
 * Builds faceted wedge/prism geometries from coordinate rings
 */
function createChiseledFacetGeometry(coords: number[][]): THREE.BufferGeometry {
  const vertices = new Float32Array(coords.flat());
  const indices = [
    // Front face
    0, 1, 2,   0, 2, 3,
    // Right face
    1, 5, 6,   1, 6, 2,
    // Back face
    5, 4, 7,   5, 7, 6,
    // Left face
    4, 0, 3,   4, 3, 7,
    // Top face
    3, 2, 6,   3, 6, 7,
    // Bottom face
    4, 5, 1,   4, 1, 0
  ];

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}
