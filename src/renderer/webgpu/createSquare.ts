import { WebGPURendererData } from "./WebGPURendererData";

export const createSquare = (
  data: WebGPURendererData,
) => {
  const { device } = data;

  const vertices = new Float32Array([
    -0.5, -0.5, 0.0, 
    1.0, 0.0, 1.0, 
    0.5, -0.5, 0.0, 
    0.0, 1.0, 1.0, 
    0.5, 0.5, 0.0, 
    1.0, 1.0, 0.0, 
    -0.5, 0.5, 0.0, 
    0.0, 1.0, 1.0,
  ]);
  const vertexBuffer = device.createBuffer({
    size: vertices.byteLength, // make it big enough to store vertices in
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, vertices, 0, vertices.length);

  const indices = new Uint32Array([0, 1, 2, 0, 2, 3]);
  const indexBuffer = device.createBuffer({
    size: indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(indexBuffer, 0, indices, 0, indices.length);

  const render = {
    buffers: {
      index: indexBuffer,
      vertex: vertexBuffer,
    },
    count: indices.length,
  };

  return render;
};
