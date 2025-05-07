export type WebGLRendererData = {
  geometries: Map<string, {
    buffers: {
      color: WebGLBuffer;
      index: WebGLBuffer;
      position: WebGLBuffer;
    };
    count: number;
    vao: WebGLVertexArrayObject;
  }>;
  gl: WebGL2RenderingContext;
  shaderProgram: {
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
