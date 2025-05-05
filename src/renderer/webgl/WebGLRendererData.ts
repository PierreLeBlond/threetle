export type WebGLRendererData = {
  buffers?: {
    color: WebGLBuffer;
    index: WebGLBuffer;
    position: WebGLBuffer;
  };
  canvas: HTMLCanvasElement;
  count?: number;
  gl: WebGL2RenderingContext;
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
  vao?: WebGLVertexArrayObject;
};
