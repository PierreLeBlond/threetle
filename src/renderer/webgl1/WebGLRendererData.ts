export type WebGLRendererData = {
  canvas: HTMLCanvasElement;
  geometries: {
    buffers: {
      color: WebGLBuffer;
      index: WebGLBuffer;
      position: WebGLBuffer;
    };
    count: number;
  }[];
  gl: WebGLRenderingContext;
  programInfo?: {
    attributesLocations: {
      color: number;
      position: number;
    };
    program: WebGLProgram;
    uniformsLocations: {
      projection: WebGLUniformLocation;
      view: WebGLUniformLocation;
    };
  };
};
