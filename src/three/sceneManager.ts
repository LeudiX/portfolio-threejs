import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import type { SceneConfig } from './config/sceneConfig.d';

export class SceneManager {

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
    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Light
    this.light = new THREE.DirectionalLight(0xffffff, 1);
    this.light.position.set(...config.light.position);
    this.scene.add(this.light);

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
      },
      undefined,
      (error) => console.error('Error loading GLB model:', error)
    );
  }

  public update() {
    const deltaTime = this.clock.getDelta();
    if (this.mixer) this.mixer.update(deltaTime);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  public resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  public dispose() {
    this.controls.dispose();
    this.renderer.dispose();
  }

  public renderFrame() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
