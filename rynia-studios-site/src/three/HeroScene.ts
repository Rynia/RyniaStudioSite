import * as THREE from 'three';
import gsap from 'gsap';
import { createLights } from './lights';
import { createCardGroup } from './CardGroup';
import { playIntroAnimation } from './animations';
import { createReliquaryController, ReliquaryController } from './interactions';
import { shouldUseFallback, showFallbackImage } from './fallback';

export class HeroScene {
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private cardGroup!: THREE.Group;
  private controller?: ReliquaryController;
  private clock: THREE.Clock = new THREE.Clock();
  private isVisible: boolean = true;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public async init(): Promise<void> {
    if (shouldUseFallback()) {
      showFallbackImage(this.container);
      return;
    }

    this.scene = new THREE.Scene();

    // Cap devicePixelRatio at 1.5 to maintain stable 60/120fps across Windows high-DPI displays
    const pixelRatio = Math.min(window.devicePixelRatio, 1.5);
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.domElement.className = 'hero-canvas';
    this.container.appendChild(this.renderer.domElement);

    // 35mm lens feel (~38° FOV), camera looking slightly upward
    this.camera = new THREE.PerspectiveCamera(
      38,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(0, -0.22, 4.6);
    this.camera.lookAt(0, 0.12, 0);

    const lights = createLights();
    this.scene.add(lights);

    this.cardGroup = createCardGroup();
    this.scene.add(this.cardGroup);

    const width = this.container.clientWidth || window.innerWidth;
    this.updateScale(width);

    playIntroAnimation(this.cardGroup);

    // Initialize unified Reliquary interaction controller
    this.controller = createReliquaryController(this.camera, this.cardGroup, this.container);

    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.container);

    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.isVisible = entries[0].isIntersecting;
    });
    this.intersectionObserver.observe(this.container);

    // Unified Master Clock: hook render and damping directly into GSAP ticker
    this.clock.start();
    gsap.ticker.add(this.onTick);
  }

  private onTick = (): void => {
    if (!this.isVisible) return;
    // Delta clamping: 50ms cap prevents teleportation on tab switch
    const rawDt = this.clock.getDelta();
    const dt = Math.min(rawDt, 0.05);

    this.controller?.update(dt);
    this.renderer.render(this.scene, this.camera);
  };

  private updateScale(width: number): void {
    if (!this.cardGroup) return;
    if (width > 900) {
      this.cardGroup.scale.set(1.08, 1.08, 1.08);
    } else if (width > 600) {
      this.cardGroup.scale.set(0.85, 0.85, 0.85);
    } else {
      this.cardGroup.scale.set(0.72, 0.72, 0.72);
    }
  }

  private onResize(): void {
    if (!this.camera || !this.renderer) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.updateScale(width);
    this.controller?.updateLayout(width);

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    this.renderer.setSize(width, height);
  }

  public dispose(): void {
    gsap.ticker.remove(this.onTick);

    if (this.controller) this.controller.destroy();
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();

    if (this.renderer) {
      this.renderer.dispose();
      if (this.renderer.domElement.parentElement === this.container) {
        this.container.removeChild(this.renderer.domElement);
      }
    }
  }
}
