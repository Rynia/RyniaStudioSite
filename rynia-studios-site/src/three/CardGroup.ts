import * as THREE from 'three';
import { createCardMaterial, createEdgeMaterial, createInsetMaterial, createRimMaterial, createFresnelShaderMaterial } from './materials';

function createRoundedRectShape(width: number, height: number, radius: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -width / 2;
  const y = -height / 2;

  shape.moveTo(x, y + radius);
  shape.lineTo(x, y + height - radius);
  shape.quadraticCurveTo(x, y + height, x + radius, y + height);
  shape.lineTo(x + width - radius, y + height);
  shape.quadraticCurveTo(x + width, y + height, x + width, y + height - radius);
  shape.lineTo(x + width, y + radius);
  shape.quadraticCurveTo(x + width, y, x + width - radius, y);
  shape.lineTo(x + radius, y);
  shape.quadraticCurveTo(x, y, x, y + radius);

  return shape;
}

function createCard(isFront: boolean): THREE.Group {
  const group = new THREE.Group();
  
  const width = 1.0;
  const height = 1.4;
  const depth = 0.04;
  const radius = 0.06;
  
  const shape = createRoundedRectShape(width, height, radius);
  
  const extrudeSettings = {
    depth: depth,
    bevelEnabled: false
  };
  
  const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  geometry.center();

  const material = createCardMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  group.add(mesh);
  
  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = createEdgeMaterial();
  const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  group.add(edges);
  
  const insetWidth = 0.85;
  const insetHeight = 1.2;
  const insetShape = createRoundedRectShape(insetWidth, insetHeight, radius * 0.8);
  const insetPoints = insetShape.getPoints();
  const insetGeometry = new THREE.BufferGeometry().setFromPoints(insetPoints);
  const insetLine = new THREE.Line(insetGeometry, createInsetMaterial());
  insetLine.position.z = depth / 2 + 0.002;
  group.add(insetLine);
  
  if (isFront) {
    const circleGeometry = new THREE.CircleGeometry(0.08, 32);
    const ringGeometry = new THREE.RingGeometry(0.1, 0.13, 32);
    
    const rimMaterial = createRimMaterial();
    
    const circleMesh = new THREE.Mesh(circleGeometry, rimMaterial);
    circleMesh.position.z = depth / 2 + 0.005;
    group.add(circleMesh);
    
    const ringMesh = new THREE.Mesh(ringGeometry, rimMaterial);
    ringMesh.position.z = depth / 2 + 0.005;
    group.add(ringMesh);
  }
  
  const shellGeometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
  shellGeometry.center();
  const shellMaterial = createFresnelShaderMaterial();
  const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial);
  shellMesh.scale.set(1.02, 1.02, 1.02);
  group.add(shellMesh);
  
  return group;
}

export function createCardGroup(): THREE.Group {
  const mainGroup = new THREE.Group();
  
  const backCard = createCard(false);
  backCard.position.set(-0.6, 0.1, -0.15);
  backCard.rotation.y = -0.14;
  backCard.rotation.z = -0.105;
  mainGroup.add(backCard);
  
  const midCard = createCard(false);
  midCard.position.set(0, 0.3, 0);
  mainGroup.add(midCard);
  
  const frontCard = createCard(true);
  frontCard.position.set(0.55, -0.05, 0.15);
  frontCard.rotation.y = 0.14;
  frontCard.rotation.z = 0.087;
  mainGroup.add(frontCard);
  
  const box = new THREE.Box3().setFromObject(mainGroup);
  const center = box.getCenter(new THREE.Vector3());
  mainGroup.position.x = -center.x;
  mainGroup.position.y = -center.y;
  mainGroup.position.z = -center.z;
  
  const wrapper = new THREE.Group();
  wrapper.add(mainGroup);
  
  const shadowGeo = new THREE.PlaneGeometry(3, 3);
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 128;
  shadowCanvas.height = 128;
  const ctx = shadowCanvas.getContext('2d');
  if (ctx) {
    const gradient = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(0,0,0,0.5)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 128, 128);
  }
  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  const shadowMat = new THREE.MeshBasicMaterial({
    map: shadowTex,
    transparent: true,
    depthWrite: false,
    opacity: 0.8
  });
  const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -0.9;
  wrapper.add(shadowPlane);
  
  return wrapper;
}
