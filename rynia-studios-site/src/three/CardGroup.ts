import * as THREE from 'three';
import {
  createCeramicCoreMaterial,
  createRefractiveGlassMaterial,
  createTitaniumAccentMaterial,
  createEdgeMaterial,
  createInsetMaterial
} from './materials';

/**
 * Creates the "System Core" (Monolith Prism)
 * An industrial, physical engineering object representing the studio's system design philosophy.
 * Blends ceramic white, refractive frosted glass, and brushed titanium.
 */
export function createCardGroup(): THREE.Group {
  const root = new THREE.Group();

  // Materials
  const ceramicMat = createCeramicCoreMaterial();
  const glassMat = createRefractiveGlassMaterial();
  const titaniumMat = createTitaniumAccentMaterial();
  const edgeMat = createEdgeMaterial();
  const insetMat = createInsetMaterial();

  // 1. Central Ceramic Monolith
  const coreWidth = 1.4;
  const coreHeight = 1.9;
  const coreDepth = 0.38;
  const coreGeometry = new THREE.BoxGeometry(coreWidth, coreHeight, coreDepth, 2, 2, 2);
  const coreMesh = new THREE.Mesh(coreGeometry, ceramicMat);
  coreMesh.castShadow = true;
  coreMesh.receiveShadow = true;
  root.add(coreMesh);

  // Precision Hairline Edges for the Monolith
  const coreEdges = new THREE.LineSegments(
    new THREE.EdgesGeometry(coreGeometry),
    edgeMat
  );
  root.add(coreEdges);

  // Monolith Inset Accent Line
  const insetGeo = new THREE.BufferGeometry().setFromPoints([
    new THREE.Vector3(-0.55, 0.75, coreDepth / 2 + 0.002),
    new THREE.Vector3(0.55, 0.75, coreDepth / 2 + 0.002),
    new THREE.Vector3(0.55, -0.75, coreDepth / 2 + 0.002),
    new THREE.Vector3(-0.55, -0.75, coreDepth / 2 + 0.002),
    new THREE.Vector3(-0.55, 0.75, coreDepth / 2 + 0.002),
  ]);
  const insetLine = new THREE.Line(insetGeo, insetMat);
  root.add(insetLine);

  // 2. Outer Refractive Optical Glass Ring
  const glassTorusGeo = new THREE.TorusGeometry(1.45, 0.07, 32, 100);
  const glassRing = new THREE.Mesh(glassTorusGeo, glassMat);
  glassRing.rotation.x = Math.PI / 3;
  glassRing.rotation.y = Math.PI / 6;
  root.add(glassRing);

  // 3. Inner Titanium Precision Orbit Ring
  const titaniumRingGeo = new THREE.TorusGeometry(1.2, 0.025, 24, 80);
  const titaniumRing = new THREE.Mesh(titaniumRingGeo, titaniumMat);
  titaniumRing.rotation.x = -Math.PI / 4;
  titaniumRing.rotation.z = Math.PI / 8;
  root.add(titaniumRing);

  // 4. Orbital Floating Engineering Nodes
  const nodeGeo = new THREE.SphereGeometry(0.065, 24, 24);
  const node1 = new THREE.Mesh(nodeGeo, titaniumMat);
  node1.position.set(1.4, 0.5, 0.4);
  root.add(node1);

  const node2 = new THREE.Mesh(nodeGeo, titaniumMat);
  node2.position.set(-1.3, -0.6, -0.3);
  root.add(node2);

  const node3 = new THREE.Mesh(nodeGeo, ceramicMat);
  node3.position.set(0.2, 1.35, -0.2);
  root.add(node3);

  // Subtle tilt for dynamic 3D presentation
  root.rotation.x = 0.12;
  root.rotation.y = -0.28;

  return root;
}
