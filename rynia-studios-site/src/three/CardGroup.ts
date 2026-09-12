import * as THREE from 'three';
import {
  createObsidianMaterial,
  createFissureMaterial,
  createMineralVeinMaterial,
  createHairlineEdgeMaterial
} from './materials';

/**
 * Creates "The Rynia Artefact"
 * A single monumental, carved, ceremonial asymmetrical monolith (Three.js).
 * Materials: Obsidian / black oxidized metal with faceted chiseled surfaces,
 * faint ivory mineral veins, and an internal fissure that awakens in Act III.
 */
export function createCardGroup(): THREE.Group {
  return createArtefact();
}

export function createArtefact(): THREE.Group {
  const root = new THREE.Group();
  root.name = 'RyniaArtefact';

  const obsidianMat = createObsidianMaterial();
  const fissureMat = createFissureMaterial();
  const mineralMat = createMineralVeinMaterial();
  const hairlineMat = createHairlineEdgeMaterial();

  // 1. Asymmetrical Ceremonial Monolith Geometry
  // We construct a faceted polygonal monolith with deliberate asymmetrical chisel angles.
  const monolithGeo = createMonolithGeometry();
  const monolithMesh = new THREE.Mesh(monolithGeo, obsidianMat);
  monolithMesh.name = 'MonolithCore';
  monolithMesh.castShadow = true;
  monolithMesh.receiveShadow = true;
  root.add(monolithMesh);

  // Hairline edge contours outlining the ceremonial facets
  const edgesGeo = new THREE.EdgesGeometry(monolithGeo, 20);
  const edgesMesh = new THREE.LineSegments(edgesGeo, hairlineMat);
  edgesMesh.name = 'MonolithEdges';
  root.add(edgesMesh);

  // 2. Internal Fissure (The Core Awakens in Act III with Oxide Red #B6422E)
  // A narrow vertical fissure carved into the monolith's front-right facet
  const fissureGroup = new THREE.Group();
  fissureGroup.name = 'FissureGroup';

  const fissureWidth = 0.038;
  const fissureHeight = 1.95;
  const fissureDepth = 0.12;
  const fissureGeo = new THREE.BoxGeometry(fissureWidth, fissureHeight, fissureDepth);
  const fissureMesh = new THREE.Mesh(fissureGeo, fissureMat);
  fissureMesh.name = 'InternalFissure';
  fissureMesh.position.set(0.18, -0.05, 0.42);
  fissureMesh.rotation.z = -0.04;
  fissureGroup.add(fissureMesh);

  // Faint inner fracture branches
  const branchGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(0.18, 0.45, 0.42),
    new THREE.Vector3(0.29, 0.72, 0.40),
    new THREE.Vector3(0.35, 0.88, 0.38)
  ]);
  const branchLine = new THREE.Line(branchGeo, mineralMat);
  branchLine.name = 'FissureBranch';
  fissureGroup.add(branchLine);

  root.add(fissureGroup);

  // 3. Faint Ivory Mineral Veins running across the monolithic facets
  const veinPoints = [
    new THREE.Vector3(-0.62, -1.2, 0.38),
    new THREE.Vector3(-0.48, -0.4, 0.44),
    new THREE.Vector3(-0.35, 0.35, 0.41),
    new THREE.Vector3(-0.15, 0.95, 0.36),
    new THREE.Vector3(0.05, 1.45, 0.32)
  ];
  const veinGeo = new THREE.BufferGeometry().setFromPoints(veinPoints);
  const veinLine = new THREE.Line(veinGeo, mineralMat);
  veinLine.name = 'MineralVeinPrimary';
  root.add(veinLine);

  // Secondary transverse micro-vein
  const secVeinPoints = [
    new THREE.Vector3(-0.48, -0.4, 0.44),
    new THREE.Vector3(-0.12, -0.22, 0.46),
    new THREE.Vector3(0.18, -0.15, 0.42)
  ];
  const secVeinGeo = new THREE.BufferGeometry().setFromPoints(secVeinPoints);
  const secVeinLine = new THREE.Line(secVeinGeo, mineralMat);
  secVeinLine.name = 'MineralVeinSecondary';
  root.add(secVeinLine);

  return root;
}

/**
 * Builds an asymmetrical ceremonial monolithic geometry
 * with clean chiseled facets, non-uniform profile, and ceremonial taper.
 */
function createMonolithGeometry(): THREE.BufferGeometry {
  // 14 carefully crafted vertices defining an imposing, carved ceremonial monolith
  // Height: ~3.3, Base width: ~1.4, Top width: ~1.0, Depth: ~0.84
  const vertices = new Float32Array([
    // Base ring (y = -1.65)
    -0.72, -1.65,  0.42,  // 0: base front-left
     0.68, -1.65,  0.40,  // 1: base front-right
     0.64, -1.65, -0.42,  // 2: base back-right
    -0.65, -1.65, -0.40,  // 3: base back-left

    // Mid waist ring (y = 0.15) — slightly asymmetrical shift
    -0.68,  0.15,  0.48,  // 4: mid front-left
     0.62,  0.15,  0.44,  // 5: mid front-right
     0.58,  0.15, -0.44,  // 6: mid back-right
    -0.62,  0.15, -0.42,  // 7: mid back-left

    // Shoulder ring (y = 1.35)
    -0.54,  1.35,  0.38,  // 8: shoulder front-left
     0.48,  1.35,  0.34,  // 9: shoulder front-right
     0.44,  1.35, -0.36,  // 10: shoulder back-right
    -0.50,  1.35, -0.34,  // 11: shoulder back-left

    // Ceremonial Crown / Asymmetrical Beveled Apex (y = 1.75 to 1.62)
    -0.42,  1.72,  0.18,  // 12: crown left apex (higher)
     0.36,  1.58,  0.14,  // 13: crown right apex (sloped lower)
     0.28,  1.55, -0.20,  // 14: crown back-right
    -0.38,  1.68, -0.18   // 15: crown back-left
  ]);

  // Triangular facets composing the monolithic obsidian block
  const indices = [
    // Bottom cap
    0, 2, 1,   0, 3, 2,

    // Lower body facets (0..3 to 4..7)
    0, 1, 5,   0, 5, 4, // front lower
    1, 2, 6,   1, 6, 5, // right lower
    2, 3, 7,   2, 7, 6, // back lower
    3, 0, 4,   3, 4, 7, // left lower

    // Mid to shoulder facets (4..7 to 8..11)
    4, 5, 9,   4, 9, 8, // front mid
    5, 6, 10,  5, 10, 9, // right mid
    6, 7, 11,  6, 11, 10, // back mid
    7, 4, 8,   7, 8, 11, // left mid

    // Shoulder to ceremonial apex (8..11 to 12..15)
    8, 9, 13,   8, 13, 12, // front crown
    9, 10, 14,  9, 14, 13, // right crown
    10, 11, 15, 10, 15, 14, // back crown
    11, 8, 12,  11, 12, 15, // left crown

    // Top crown cap
    12, 13, 14,  12, 14, 15
  ];

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();

  return geometry;
}
