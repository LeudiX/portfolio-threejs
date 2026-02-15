export interface SceneConfig {
  canvas: {
    alpha: boolean;
    triggerCanvasOnMouseMovement: boolean;
  },
  camera: {
    fov: number;
    near: number;
    far: number;
    position: [number, number, number];
  };
  light: {
    position: [number, number, number];
  };
  controls: {
    autoRotate: boolean;
  };
  helpers: {
    grid: boolean;
  };
  model?: {
    path: string;
    yOffset: number;
    xOffset?: number;
  };
  triggerAnimationOnHover: boolean;
}