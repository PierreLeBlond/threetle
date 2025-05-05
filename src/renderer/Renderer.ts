export type Renderer = {
  createSquare: () => void;
  createTriangle: () => void;
  draw: () => void;
  getCanvas: () => HTMLCanvasElement;
};
