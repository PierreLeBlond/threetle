export type WebGLRendererData = {
  buffers?: {
    color: WebGLBuffer;
    index: WebGLBuffer;
    position: WebGLBuffer;
  };
  canvas: HTMLCanvasElement;
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
