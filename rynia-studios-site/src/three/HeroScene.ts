import * as THREE from 'three';
import { createLights } from './lights';
import { createCardGroup } from './CardGroup';
import { playIntroAnimation, startBreathingAnimation } from './animations';
import { setupMouseParallax, setupScrollCamera } from './interactions';
import { shouldUseFallback, showFallbackImage } from './fallback';

export class HeroScene {
  private container: HTMLElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private cardGroup!: THREE.Group;
  private animationFrameId?: number;
  private resizeObserver?: ResizeObserver;
  private intersectionObserver?: IntersectionObserver;
  private isVisible: boolean = true;
  private breathAnim?: { stop: () => void };
  private mouseParallax?: { destroy: () => void };
  private scrollCamera?: { destroy: () => void };

  constructor(container: HTMLElement) {
    this.container = container;
  }

  public async init(): Promise<void> {
    if (shouldUseFallback()) {
      showFallbackImage(this.container);
      return;
    }

    this.scene = new THREE.Scene();

    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.08;
    this.renderer.setPixelRatio(pixelRatio);
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.domElement.className = 'hero-canvas';
    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      42,
      this.container.clientWidth / this.container.clientHeight,
      0.1,
      100
    );
    this.camera.position.set(0, 0, 4.8);

    const lights = createLights();
    this.scene.add(lights);

    this.cardGroup = createCardGroup();

    const parallaxWrapper = new THREE.Group();
    const breathingWrapper = new THREE.Group();
    
    parallaxWrapper.add(breathingWrapper);
    breathingWrapper.add(this.cardGroup);
    this.scene.add(parallaxWrapper);

    this.updateLayout();

    playIntroAnimation(this.cardGroup);

    this.breathAnim = startBreathingAnimation(breathingWrapper);
    this.mouseParallax = setupMouseParallax(parallaxWrapper, this.container);
    this.scrollCamera = setupScrollCamera(this.camera, this.container);

    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.container);

    this.intersectionObserver = new IntersectionObserver((entries) => {
      this.isVisible = entries[0].isIntersecting;
    });
    this.intersectionObserver.observe(this.container);

    this.startRenderLoop();
  }

  private updateLayout(): void {
    if (!this.cardGroup || !this.camera) return;
    const width = this.container.clientWidth || window.innerWidth;
    if (width > 850) {
      this.cardGroup.position.set(0.92, 0.0, 0);
      this.cardGroup.scale.set(0.95, 0.95, 0.95);
      this.camera.position.set(0, 0, 4.4);
    } else if (width > 550) {
      this.cardGroup.position.set(0.4, 0.08, 0);
      this.cardGroup.scale.set(0.8, 0.8, 0.8);
      this.camera.position.set(0, 0, 4.8);
    } else {
      this.cardGroup.position.set(0, 0.2, 0);
      this.cardGroup.scale.set(0.68, 0.68, 0.68);
      this.camera.position.set(0, 0, 5.0);
    }
  }

  private onResize(): void {
    if (!this.camera || !this.renderer) return;
    
    this.updateLayout();
    this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
  }

  private startRenderLoop(): void {
    const render = () => {
      this.animationFrameId = requestAnimationFrame(render);
      if (this.isVisible) {
        this.renderer.render(this.scene, this.camera);
      }
    };
    render();
  }

  public dispose(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    
    if (this.breathAnim) this.breathAnim.stop();
    if (this.mouseParallax) this.mouseParallax.destroy();
    if (this.scrollCamera) this.scrollCamera.destroy();
    
    if (this.resizeObserver) this.resizeObserver.disconnect();
    if (this.intersectionObserver) this.intersectionObserver.disconnect();
    
    if (this.renderer) {
      this.renderer.dispose();
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

