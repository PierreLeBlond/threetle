export type WebGLRendererData = {
  canvas: HTMLCanvasElement;
  geometries: {
    buffers: {
      color: WebGLBuffer;
      index: WebGLBuffer;
      position: WebGLBuffer;
    };
    count: number;
    vao: WebGLVertexArrayObject;
  }[];
  gl: WebGL2RenderingContext;
  programInfo: {
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
