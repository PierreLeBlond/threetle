export type Renderer = {
  addGeometry: (vertexData: {
    colors: Float32Array,
    indices: Uint32Array,
    positions: Float32Array,
  }) => void;
  createSquare: () => void;
  createTriangle: () => void;
  draw: () => void;
  getCanvas: () => HTMLCanvasElement;
};
