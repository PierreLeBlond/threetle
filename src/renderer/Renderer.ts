import { mat4 } from "gl-matrix";

export type Renderer = {
  addGeometry: (vertexData: {
    colors: Float32Array,
    indices: Uint32Array,
    positions: Float32Array,
  }) => string;
  createSquare: () => string;
  draw: (view: mat4, projection: mat4, geometryIds: string[]) => void;
  resize: (width: number, height: number) => void;
};
