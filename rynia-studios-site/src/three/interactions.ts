import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export interface ReliquaryController {
  update: (dt: number) => void;
  updateLayout: (width: number) => void;
  destroy: () => void;
}

/**
 * High-performance interaction controller for The Rynia Reliquary:
 * - Exponential damping on camera, reliquary body, and internal mechanical parts.
 * - Single-clock frame updates with tab-switch delta clamping.
 * - Five distinct, dramatic compositional acts.
 * - Constrained pointer micro-parallax (strictly clamped to ±1.5 degrees with spring physics).
 */
export function createReliquaryController(
  camera: THREE.PerspectiveCamera,
  reliquaryGroup: THREE.Group,
  container: HTMLElement
): ReliquaryController {
  // 1. Identify sub-components of the Reliquary
  const shellLeft = reliquaryGroup.getObjectByName('ShellLeftWing') as THREE.Mesh | undefined;
  const shellRight = reliquaryGroup.getObjectByName('ShellRightProw') as THREE.Mesh | undefined;
  const fissureMesh = reliquaryGroup.getObjectByName('InternalFissure') as THREE.Mesh | undefined;
  const fissureMat = fissureMesh?.material as THREE.MeshStandardMaterial | undefined;

  const lamellas: (THREE.Mesh | undefined)[] = [
    reliquaryGroup.getObjectByName('Lamella_0') as THREE.Mesh | undefined,
    reliquaryGroup.getObjectByName('Lamella_1') as THREE.Mesh | undefined,
    reliquaryGroup.getObjectByName('Lamella_2') as THREE.Mesh | undefined,
    reliquaryGroup.getObjectByName('Lamella_3') as THREE.Mesh | undefined
  ];
  const baseLamellaZ = [-0.15, -0.05, 0.05, 0.15];
  const baseLamellaY = 0.12;

  // Responsive position multiplier
  let layoutScale = 1.0;
  let layoutOffsetY = 0.0;

  function calcLayoutOffsets(width: number) {
    if (width > 900) {
      layoutScale = 1.0;
      layoutOffsetY = 0.0;
    } else if (width > 600) {
      layoutScale = 0.55;
      layoutOffsetY = -0.05;
    } else {
      layoutScale = 0.0; // Centered on mobile
      layoutOffsetY = -0.16; // Lower down to avoid colliding with text
    }
  }

  calcLayoutOffsets(container.clientWidth || window.innerWidth);

  // Targets (updated by ScrollTrigger)
  const targets = {
    camX: 0,
    camY: -0.22,
    camZ: 4.6,
    groupX: 1.35 * layoutScale,
    groupY: -0.16 + layoutOffsetY,
    rotX: 0.04,
    rotY: -0.22,
    shellOpen: 0.0,      // 0.0 = closed, 1.0 = open
    lamellaTier: 0.0,    // 0.0 = docked, 1.0 = tiered, 2.0 = rack
    fissureGlow: 0.0
  };

  // Current interpolated values
  const current = {
    camX: 0,
    camY: -0.22,
    camZ: 4.6,
    groupX: 1.35 * layoutScale,
    groupY: -0.16 + layoutOffsetY,
    rotX: 0.04,
    rotY: -0.22,
    shellOpen: 0.0,
    lamellaTier: 0.0,
    fissureGlow: 0.0
  };

  // Pointer micro-parallax state (clamped to ±1.5 deg = 0.026 rad)
  const MAX_PARALLAX_RAD = 0.026;
  let targetParallaxX = 0;
  let targetParallaxY = 0;
  let currentParallaxX = 0;
  let currentParallaxY = 0;
  let pVelX = 0;
  let pVelY = 0;

  const onMouseMove = (e: MouseEvent) => {
    const nx = (e.clientX / window.innerWidth) * 2 - 1;
    const ny = -(e.clientY / window.innerHeight) * 2 + 1;
    targetParallaxY = nx * MAX_PARALLAX_RAD;
    targetParallaxX = -ny * MAX_PARALLAX_RAD;
  };

  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Act sections
  const actSystems = document.getElementById('act-systems');
  const actThesis = document.getElementById('act-thesis');
  const actForge = document.getElementById('act-forge');
  const actDossier = document.getElementById('act-dossier');

  const triggers: ScrollTrigger[] = [];

  const updateTargets = () => {
    // Determine progress through the 4 transition stages
    const p1 = st1?.progress ?? 0;
    const p2 = st2?.progress ?? 0;
    const p3 = st3?.progress ?? 0;
    const p4 = st4?.progress ?? 0;

    // Base Act I values: Framed majestically to the right flank
    let gx = 1.35 * layoutScale;
    let gy = -0.16 + layoutOffsetY;
    let rx = 0.04;
    let ry = -0.22;
    let cz = 4.6;
    let cy = -0.22;
    let sOpen = 0.0;
    let lTier = 0.0;
    let fGlow = 0.0;

    // Transition 1: Act I -> Act II (Systems: Unlocking, tactical tiering)
    if (p1 > 0) {
      gx = THREE.MathUtils.lerp(gx, 1.45 * layoutScale, p1);
      gy = THREE.MathUtils.lerp(gy, -0.14 + layoutOffsetY, p1);
      rx = THREE.MathUtils.lerp(rx, 0.08, p1);
      ry = THREE.MathUtils.lerp(ry, 0.52, p1);
      cz = THREE.MathUtils.lerp(cz, 4.3, p1);
      cy = THREE.MathUtils.lerp(cy, -0.14, p1);
      sOpen = THREE.MathUtils.lerp(sOpen, 1.0, p1);
      lTier = THREE.MathUtils.lerp(lTier, 1.0, p1);
      fGlow = THREE.MathUtils.lerp(fGlow, 0.20, p1);
    }

    // Transition 2: Act II -> Act III (Thesis: Architectural macro close-up)
    if (p2 > 0) {
      gx = THREE.MathUtils.lerp(1.45 * layoutScale, 1.10 * layoutScale, p2);
      gy = THREE.MathUtils.lerp(-0.14 + layoutOffsetY, -0.04 + layoutOffsetY, p2);
      rx = THREE.MathUtils.lerp(0.08, 0.03, p2);
      ry = THREE.MathUtils.lerp(0.52, 1.08, p2);
      cz = THREE.MathUtils.lerp(4.3, 3.6, p2); // Elegant macro inspection
      cy = THREE.MathUtils.lerp(-0.14, 0.02, p2);
      sOpen = THREE.MathUtils.lerp(1.0, 0.5, p2);
      lTier = THREE.MathUtils.lerp(1.0, 0.2, p2);
      fGlow = THREE.MathUtils.lerp(0.20, 0.70, p2); // Controlled warm ember glow
    }

    // Transition 3: Act III -> Act IV (Forge: Architectural cross-section & rack)
    if (p3 > 0) {
      gx = THREE.MathUtils.lerp(1.10 * layoutScale, 1.40 * layoutScale, p3);
      gy = THREE.MathUtils.lerp(-0.04 + layoutOffsetY, -0.12 + layoutOffsetY, p3);
      rx = THREE.MathUtils.lerp(0.03, 0.12, p3);
      ry = THREE.MathUtils.lerp(1.08, 1.68, p3);
      cz = THREE.MathUtils.lerp(3.6, 4.8, p3);
      cy = THREE.MathUtils.lerp(0.02, 0.08, p3);
      sOpen = THREE.MathUtils.lerp(0.5, 0.35, p3);
      lTier = THREE.MathUtils.lerp(0.2, 2.0, p3);
      fGlow = THREE.MathUtils.lerp(0.70, 0.25, p3);
    }

    // Transition 4: Act IV -> Act V (Dossier: Void pullback & ceremonial lock)
    if (p4 > 0) {
      gx = THREE.MathUtils.lerp(1.40 * layoutScale, 0.0, p4);
      gy = THREE.MathUtils.lerp(-0.12 + layoutOffsetY, 0.0, p4);
      rx = THREE.MathUtils.lerp(0.12, 0.02, p4);
      ry = THREE.MathUtils.lerp(1.68, 2.20, p4);
      cz = THREE.MathUtils.lerp(4.8, 8.2, p4);
      cy = THREE.MathUtils.lerp(0.08, 0.30, p4);
      sOpen = THREE.MathUtils.lerp(0.35, 0.0, p4);
      lTier = THREE.MathUtils.lerp(2.0, 0.0, p4);
      fGlow = THREE.MathUtils.lerp(0.25, 0.01, p4);
    }

    targets.groupX = gx;
    targets.groupY = gy;
    targets.rotX = rx;
    targets.rotY = ry;
    targets.camZ = cz;
    targets.camY = cy;
    targets.shellOpen = sOpen;
    targets.lamellaTier = lTier;
    targets.fissureGlow = fGlow;
  };

  let st1: ScrollTrigger | undefined;
  let st2: ScrollTrigger | undefined;
  let st3: ScrollTrigger | undefined;
  let st4: ScrollTrigger | undefined;

  if (actSystems && actThesis && actForge && actDossier) {
    st1 = ScrollTrigger.create({
      trigger: actSystems,
      start: 'top bottom',
      end: 'top center',
      scrub: 1.0,
      onUpdate: updateTargets
    });
    triggers.push(st1);

    st2 = ScrollTrigger.create({
      trigger: actThesis,
      start: 'top bottom',
      end: 'top center',
      scrub: 1.0,
      onUpdate: updateTargets
    });
    triggers.push(st2);

    st3 = ScrollTrigger.create({
      trigger: actForge,
      start: 'top bottom',
      end: 'top center',
      scrub: 1.0,
      onUpdate: updateTargets
    });
    triggers.push(st3);

    st4 = ScrollTrigger.create({
      trigger: actDossier,
      start: 'top bottom',
      end: 'center center',
      scrub: 1.2,
      onUpdate: updateTargets
    });
    triggers.push(st4);
  }

  // Elapsed time for physical micro-breathing
  let totalTime = 0;

  // Exponential damping helper: factor = 1 - exp(-lambda * dt)
  function expDamp(curr: number, targ: number, lambda: number, dt: number): number {
    return curr + (targ - curr) * (1 - Math.exp(-lambda * dt));
  }

  return {
    update: (dt: number) => {
      totalTime += dt;

      // 1. Spring micro-parallax physics
      const springStiffness = 120.0;
      const springDamping = 16.0;
      const fx = (targetParallaxX - currentParallaxX) * springStiffness;
      const fy = (targetParallaxY - currentParallaxY) * springStiffness;
      pVelX = (pVelX + fx * dt) * Math.max(0, 1.0 - springDamping * dt);
      pVelY = (pVelY + fy * dt) * Math.max(0, 1.0 - springDamping * dt);
      currentParallaxX += pVelX * dt;
      currentParallaxY += pVelY * dt;

      // 2. Exponential damping on Camera (lambda = 9.0)
      current.camY = expDamp(current.camY, targets.camY, 9.0, dt);
      current.camZ = expDamp(current.camZ, targets.camZ, 9.0, dt);
      camera.position.y = current.camY;
      camera.position.z = current.camZ;

      // 3. Stately micro-breathing (amplitude 0.015, ~6s cycle)
      const breathingY = Math.sin(totalTime * 0.95) * 0.015;

      // 4. Exponential damping on Reliquary Body (lambda = 6.0)
      current.groupX = expDamp(current.groupX, targets.groupX, 6.0, dt);
      current.groupY = expDamp(current.groupY, targets.groupY, 6.0, dt);
      current.rotX = expDamp(current.rotX, targets.rotX, 6.0, dt);
      current.rotY = expDamp(current.rotY, targets.rotY, 6.0, dt);

      reliquaryGroup.position.x = current.groupX;
      reliquaryGroup.position.y = current.groupY + breathingY;
      reliquaryGroup.rotation.x = current.rotX + currentParallaxX;
      reliquaryGroup.rotation.y = current.rotY + currentParallaxY;

      // 5. Exponential damping on Mechanical Parts (lambda = 5.0)
      current.shellOpen = expDamp(current.shellOpen, targets.shellOpen, 5.0, dt);
      current.lamellaTier = expDamp(current.lamellaTier, targets.lamellaTier, 5.0, dt);
      current.fissureGlow = expDamp(current.fissureGlow, targets.fissureGlow, 3.5, dt);

      // Articulate Outer Shell
      if (shellLeft) {
        shellLeft.position.x = -0.15 * current.shellOpen;
      }
      if (shellRight) {
        shellRight.position.x = 0.15 * current.shellOpen;
      }

      // Articulate 4 Internal Tactical Lamellas
      const lt = current.lamellaTier;
      if (lt <= 1.0) {
        // Tiered progressive exhibition (Act II)
        const offsets = [
          { z: 0.10, y: 0.06 },
          { z: 0.20, y: 0.02 },
          { z: 0.30, y: -0.02 },
          { z: 0.40, y: -0.06 }
        ];
        lamellas.forEach((lamella, i) => {
          if (lamella) {
            lamella.position.z = baseLamellaZ[i] + offsets[i].z * lt;
            lamella.position.y = baseLamellaY + offsets[i].y * lt;
          }
        });
      } else {
        // Assembly Rack mode (Act IV)
        const rackProgress = THREE.MathUtils.clamp(lt - 1.0, 0, 1);
        const rackOffsetsZ = [-0.18, -0.06, 0.06, 0.18];
        lamellas.forEach((lamella, i) => {
          if (lamella) {
            lamella.position.z = THREE.MathUtils.lerp(baseLamellaZ[i], rackOffsetsZ[i], rackProgress);
            lamella.position.y = baseLamellaY;
          }
        });
      }

      // Glow the Internal Fissure
      if (fissureMat) {
        fissureMat.emissiveIntensity = current.fissureGlow;
      }
    },

    updateLayout: (width: number) => {
      calcLayoutOffsets(width);
      updateTargets();
    },

    destroy: () => {
      window.removeEventListener('mousemove', onMouseMove);
      triggers.forEach(t => t.kill());
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  };
}
