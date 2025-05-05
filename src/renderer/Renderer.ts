export type Renderer = {
  createTriangle: () => void;
  draw: () => void;
  getCanvas: () => HTMLCanvasElement;
};
