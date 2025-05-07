import { WebGPURendererData } from "../WebGPURendererData";

export const addGeometry = (data: WebGPURendererData, vertexData: {
  colors: Float32Array,
  indices: Uint32Array,
  positions: Float32Array,
}) => {
  const { device } = data;

  const vertices = new Float32Array(vertexData.positions.length + vertexData.colors.length);
  for (let i = 0; i < vertexData.positions.length / 3; i++) {
    vertices.set(vertexData.positions.slice(i * 3, i * 3 + 3), i * 6);
    vertices.set(vertexData.colors.slice(i * 3, i * 3 + 3), i * 6 + 3);
  }

  const positionBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(positionBuffer, 0, vertices, 0, vertices.length);

  const indexBuffer = device.createBuffer({
    size: vertexData.indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(indexBuffer, 0, vertexData.indices, 0, vertexData.indices.length);

  return {
    buffers: {
      index: indexBuffer,
      vertex: positionBuffer,
    },
    count: vertexData.indices.length,
  };
}