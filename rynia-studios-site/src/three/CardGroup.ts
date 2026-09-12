import * as THREE from 'three';
import {
  createObsidianCoreMaterial,
  createChampagneGoldMaterial,
  createEmissiveGlyphMaterial,
  createOrbitalRingMaterial,
  createEdgeMaterial
} from './materials';

/**
 * Creates "The Rynia Core" — A Kinetic Monolithic Artifact
 * Represents the independent studio's craft: games, intelligent tools & digital systems.
 * Engineered with faceted obsidian, brushed champagne gold, and runic emissive glyphs.
 */
export function createCardGroup(): THREE.Group {
  const root = new THREE.Group();
  root.name = 'RyniaCore';

  // Materials
  const obsidianMat = createObsidianCoreMaterial();
  const goldMat = createChampagneGoldMaterial();
  const emissiveMat = createEmissiveGlyphMaterial();
  const orbitMat = createOrbitalRingMaterial();
  const edgeMat = createEdgeMaterial();

  // 1. Central Faceted Obsidian Monolith
  const coreWidth = 1.35;
  const coreHeight = 1.95;
  const coreDepth = 0.42;
  const coreGeometry = new THREE.BoxGeometry(coreWidth, coreHeight, coreDepth, 2, 2, 2);
  const coreMesh = new THREE.Mesh(coreGeometry, obsidianMat);
  coreMesh.name = 'MonolithCore';
  coreMesh.castShadow = true;
  coreMesh.receiveShadow = true;
  root.add(coreMesh);

  // Precision Hairline Edges for the Monolith
  const coreEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(coreGeometry),
    edgeMat
  );
  root.add(coreEdges);

  // 2. Runic Center Sigil (Emissive Gold Glyphs)
  const sigilGeo = new THREE.RingGeometry(0.28, 0.34, 32);
  const sigilMesh = new THREE.Mesh(sigilGeo, emissiveMat);
  sigilMesh.position.z = coreDepth / 2 + 0.003;
  sigilMesh.name = 'EmissiveSigil';
  root.add(sigilMesh);

  // Back face sigil
  const sigilBack = sigilMesh.clone();
  sigilBack.position.z = -coreDepth / 2 - 0.003;
  sigilBack.rotation.y = Math.PI;
  root.add(sigilBack);

  // Monolith Architectural Inset Accent Lines (Champagne Gold Hairlines)
  const insetGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.52, 0.78, coreDepth / 2 + 0.002),
    new THREE.Vector3(0.52, 0.78, coreDepth / 2 + 0.002),
    new THREE.Vector3(0.52, -0.78, coreDepth / 2 + 0.002),
    new THREE.Vector3(-0.52, -0.78, coreDepth / 2 + 0.002),
    new THREE.Vector3(-0.52, 0.78, coreDepth / 2 + 0.002),
  ]);
  const insetLine = new THREE.Line(insetGeo, orbitMat);
  root.add(insetLine);

  // 3. Primary Champagne Gold Orbital Kinetic Ring
  const primaryRingGeo = new THREE.TorusGeometry(1.48, 0.045, 24, 96);
  const primaryRing = new THREE.Mesh(primaryRingGeo, goldMat);
  primaryRing.name = 'PrimaryRing';
  primaryRing.rotation.x = Math.PI / 3.2;
  primaryRing.rotation.y = Math.PI / 6;
  root.add(primaryRing);

  // 4. Secondary Counter-Rotating Kinetic Ring
  const secondaryRingGeo = new THREE.TorusGeometry(1.24, 0.022, 16, 80);
  const secondaryRing = new THREE.Mesh(secondaryRingGeo, goldMat);
  secondaryRing.name = 'SecondaryRing';
  secondaryRing.rotation.x = -Math.PI / 3.8;
  secondaryRing.rotation.z = Math.PI / 7;
  root.add(secondaryRing);

  // 5. Kinetic Artifact Satellite Nodes (The Forge & Systems Nodes)
  const nodeGeo = new THREE.OctahedronGeometry(0.08, 0);
  const node1 = new THREE.Mesh(nodeGeo, goldMat);
  node1.name = 'GameNode';
  node1.position.set(1.42, 0.45, 0.35);
  root.add(node1);

  const node2 = new THREE.Mesh(nodeGeo, goldMat);
  node2.name = 'UtilityNode';
  node2.position.set(-1.32, -0.55, -0.3);
  root.add(node2);

  const node3 = new THREE.Mesh(nodeGeo, emissiveMat);
  node3.name = 'SystemsNode';
  node3.position.set(0.18, 1.38, -0.2);
  root.add(node3);

  // Subtle initial tilt for dynamic 3D posture
  root.rotation.x = 0.14;
  root.rotation.y = -0.32;

  return root;
}
