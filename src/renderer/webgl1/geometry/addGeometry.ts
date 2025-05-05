import { addBuffer } from "@/renderer/webgl1/utils/addBuffer";
import { addIndexBuffer } from "@/renderer/webgl1/utils/addIndexBuffer";
import { WebGLRendererData } from "@/renderer/webgl1/WebGLRendererData";

export const addGeometry = (data: WebGLRendererData, vertexData: {
  colors: Float32Array,
  indices: Uint32Array,
  positions: Float32Array,
}) => {
  const { gl } = data;

  const indices = new Uint16Array(vertexData.indices);

  const positionBuffer = addBuffer(gl, vertexData.positions);
  const colorBuffer = addBuffer(gl, vertexData.colors);
  const indexBuffer = addIndexBuffer(gl, indices);

  const geometry = {
    buffers: {
      color: colorBuffer,
      index: indexBuffer,
      position: positionBuffer,
    },
    count: vertexData.indices.length,
  }
  return {
    ...data,
    geometries: [...data.geometries, geometry],
  };
}