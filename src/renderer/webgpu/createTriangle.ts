import { WebGPURendererData } from "./WebGPURendererData";

export const createTriangle = (
  data: WebGPURendererData,
): WebGPURendererData => {
  const { device } = data;

  const vertices = new Float32Array([
    -0.5, -0.5, 0.0,
    1.0, 0.0, 0.0,
    0.5, -0.5, 0.0,
    0.0, 1.0, 0.0,
    0.0, 0.5, 0.0,
    0.0, 0.0, 1.0,
  ]);
  const vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(vertexBuffer, 0, vertices, 0, vertices.length);

  // We could use a Uint16Array, but we then must use a multiple of 4 bytes
  const indices = new Uint32Array([0, 1, 2]);
  const indexBuffer = device.createBuffer({
    size: indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  });
  device.queue.writeBuffer(indexBuffer, 0, indices, 0, indices.length);

  const vertexBuffers = [
    {
      arrayStride: 24,
      attributes: [
        {
          format: "float32x3",
          offset: 0,
          shaderLocation: 0, // position
        },
        {
          format: "float32x3",
          offset: 12,
          shaderLocation: 1, // color
        },
      ],
      stepMode: "vertex",
    },
  ] satisfies GPUVertexBufferLayout[];

  const pipelineDescriptor = {
    fragment: {
      entryPoint: "fragment_main",
      module: data.shaderModule,
      targets: [
        {
          format: navigator.gpu.getPreferredCanvasFormat(),
        },
      ],
    },
    layout: "auto",
    multisample: {
      count: 4,
    },
    primitive: {
      topology: "triangle-list",
    },
    vertex: {
      buffers: vertexBuffers,
      entryPoint: "vertex_main",
      module: data.shaderModule,
    },
  } satisfies GPURenderPipelineDescriptor;

  const renderPipeline = device.createRenderPipeline(pipelineDescriptor);

  const render = {
    buffers: {
      index: indexBuffer,
      vertex: vertexBuffer,
    },
    count: indices.length,
    pipeline: renderPipeline,
  };

  return {
    ...data,
    renders: [...data.renders, render]
  };
};
