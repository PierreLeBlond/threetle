import { WebGLRendererData } from "@/renderer/webgl/WebGLRendererData";

import { addBuffer } from "./addBuffer";
import { addIndexBuffer } from "./addIndexBuffer";

export const addGeometry = (data: WebGLRendererData, vertexData: {
  colors: Float32Array,
  indices: Uint32Array,
  positions: Float32Array,
}) => {
  const { gl, shaderProgram } = data;

  const positionBuffer = addBuffer(gl, vertexData.positions);
  const colorBuffer = addBuffer(gl, vertexData.colors);
  const indexBuffer = addIndexBuffer(gl, vertexData.indices);
  
  const vao = gl.createVertexArray();

  gl.bindVertexArray(vao);

  // Attributes locations
  gl.enableVertexAttribArray(shaderProgram.attributesLocations.position);
  gl.enableVertexAttribArray(shaderProgram.attributesLocations.color);

  // Position
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
  gl.vertexAttribPointer(shaderProgram.attributesLocations.position, 3, gl.FLOAT, false, 0, 0);

  // Color
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.vertexAttribPointer(shaderProgram.attributesLocations.color, 3, gl.FLOAT, false, 0, 0);

  // Index
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // Unbind
  gl.bindVertexArray(null);

  return {
    buffers: {
      color: colorBuffer,
      index: indexBuffer,
      position: positionBuffer,
    },
    count: vertexData.indices.length,
    vao,
  };
};
