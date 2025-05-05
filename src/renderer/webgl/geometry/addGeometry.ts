import { addBuffer } from "@/renderer/webgl1/utils/addBuffer";
import { addIndexBuffer } from "@/renderer/webgl/utils/addIndexBuffer";
import { WebGLRendererData } from "@/renderer/webgl/WebGLRendererData";

export const addGeometry = (data: WebGLRendererData, vertexData: {
  colors: Float32Array,
  indices: Uint32Array,
  positions: Float32Array,
}) => {
  const { gl, programInfo } = data;

  const positionBuffer = addBuffer(gl, vertexData.positions);
  const colorBuffer = addBuffer(gl, vertexData.colors);
  const indexBuffer = addIndexBuffer(gl, vertexData.indices);
  
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

  return {  
    ...data,
    geometries: [...data.geometries, {
      buffers: {
        color: colorBuffer,
        index: indexBuffer,
        position: positionBuffer,
      },
      count: vertexData.indices.length,
      vao,
    }],
  }
}