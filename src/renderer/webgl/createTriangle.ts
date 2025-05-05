import { WebGLRendererData } from "./WebGLRendererData";

export const createTriangle = (data: WebGLRendererData): WebGLRendererData => {
  const { gl, programInfo } = data;

  const positionBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  const vertices = [-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  const colors = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = [0, 1, 2];
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint32Array(indices),
    gl.STATIC_DRAW,
  );

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  // Vertex Array Object, will store calls to gl.enableVertexAttribArray, gl.vertexAttribPointer and gl.bindBuffer
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);

  // Attributes locations
  gl.enableVertexAttribArray(programInfo.attributesLocations.position);
  gl.enableVertexAttribArray(programInfo.attributesLocations.color);

  // Position
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(programInfo.attributesLocations.position, 3, gl.FLOAT, false, 0, 0);

  // Color
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(programInfo.attributesLocations.color, 3, gl.FLOAT, false, 0, 0);

  // Index
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Unbind
  gl.bindVertexArray(null);

  const geometry = {
    buffers: {
      color: colorBuffer,
      index: indexBuffer,
      position: positionBuffer,
    },
    count: indices.length,
    vao,
  }

  return {
    ...data,
    geometries: [...data.geometries, geometry],
  };
};
