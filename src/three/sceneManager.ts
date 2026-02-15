import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { SceneConfig } from './config/sceneConfig.d';

export class SceneManager {

  public needsRender = true;
  public isPaused = false;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private loader: GLTFLoader;
  private light: THREE.DirectionalLight;
  private mixer?: THREE.AnimationMixer;
  private clock: THREE.Clock;
  private config: SceneConfig;
  private canvas: HTMLCanvasElement;

  constructor(canvas: HTMLCanvasElement, config: SceneConfig) {
    this.canvas = canvas;
    this.config = config;

    // Scene
    this.scene = new THREE.Scene();

    // Camera
    const { fov, near, far, position } = config.camera;
    this.camera = new THREE.PerspectiveCamera(fov, window.innerWidth / window.innerHeight, near, far);
    this.camera.position.set(...position);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Renderer 
    const alpha = config.canvas.alpha;
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha, powerPreference: 'low-power', precision: 'mediump' });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

    // On mobile devices, decrease pixel ratio
    if (window.innerWidth < 768) this.renderer.setPixelRatio(1);

    // Lights
    // Adding directional light (Main illumination)
    this.light = new THREE.DirectionalLight(0xffffff, 2.5); //Increased intensity
    this.light.position.set(...config.light.position);
    this.scene.add(this.light)
    this.setupSecondaryLights()

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = config.controls.autoRotate;

    // Helpers
    if (config.helpers.grid) {
      const gridHelper = new THREE.GridHelper(10, 10);
      this.scene.add(gridHelper);
    }

    // Loader
    this.loader = new GLTFLoader();

    // Clock
    this.clock = new THREE.Clock();

    // Load model
    this.loadModel();
  }

  private setupSecondaryLights() {

    // Adding soft ambient light (Eliminates pures ambient shadows)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambientLight);
  }

  private loadModel() {
    this.loader.load(
      this.config.model.path,
      (gltf) => {
        const model = gltf.scene;
        const animations = gltf.animations;

        // Compute bounding box to center model
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // Reposition model so it’s centered at origin
        model.position.sub(center);

        // Slightly lower the model so the camera shows full body
        if (this.config.model.yOffset) {
          model.position.y += this.config.model.yOffset;
        }

        if (this.config.model.xOffset) {
          model.position.x += this.config.model.xOffset;
        }

        // Optional: scale model to fit camera nicely
        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 2.5 / maxDim; // tweak for your scene
        model.scale.setScalar(scaleFactor);

        // Apply animations if available
        if (animations.length > 0) {
          this.mixer = new THREE.AnimationMixer(model);
          this.mixer.clipAction(animations[0]).play();
        }
        this.scene.add(model);
        this.renderOnce(); // ensuring the model appears immediately
      },
      undefined,
      (error) => console.error('Error loading GLB model:', error)
    );
  }

  public pause() {
    this.isPaused = true;
  }

  public resume() {
    this.isPaused = false;
    this.clock.getDelta(); //reseting delta timer so no jump
  }

  public update() {
    if (this.isPaused) return; // stopping rendering when off-screen

    const deltaTime = this.clock.getDelta();
    let shouldRender = false;

    // If an animation mixer exists, render each frame
    if (this.mixer) {
      this.mixer.update(deltaTime);
      shouldRender = true;
    }

    // Only render if necessary
    if (shouldRender || this.needsRender) {
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.needsRender = false;
    }
  }
  public renderOnce() {
    this.renderer.render(this.scene, this.camera);
    this.needsRender = false;
  }

  public resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public dispose() {
    this.controls.dispose();
    this.renderer.dispose();
    this.scene.traverse((obj: THREE.Object3D) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) {
        mesh.geometry.dispose(); // Free GPU related resources for this intance
      }

      const material = (mesh.material as THREE.Material) || null;
      if (material) {
        if (Array.isArray(material)) {
          material.forEach((m) => m.dispose());
        } else {
          material.dispose();
        }
      }
    });
  }

  public renderFrame() {
    if (this.isPaused) return;
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    this.needsRender = false;
  }
}
