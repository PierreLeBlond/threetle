import shaders from "./shaders/triangle.wgsl?raw";
import { WebGPURendererData } from "./WebGPURendererData";

export const createSquare = (
  data: WebGPURendererData,
): WebGPURendererData => {
  const { device } = data;

  const vertices = new Float32Array([
    -0.5, -0.5, 0.0, 1.0, 
    1.0, 0.0, 1.0, 1.0, 
    0.5, -0.5, 0.0, 1.0, 
    0.0, 1.0, 1.0, 1.0,
    0.5, 0.5, 0.0, 1.0, 
    1.0, 1.0, 0.0, 1.0, 
    -0.5, 0.5, 0.0, 1.0, 
    0.0, 1.0, 1.0, 1.0,
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

  const vertexBuffers = [
    {
      arrayStride: 32,
      attributes: [
        {
          format: "float32x4",
          offset: 0,
          shaderLocation: 0, // position
        },
        {
          format: "float32x4",
          offset: 16,
          shaderLocation: 1, // color
        },
      ],
      stepMode: "vertex",
    },
  ] satisfies GPUVertexBufferLayout[];

  const shaderModule = device.createShaderModule({
    code: shaders,
  }) satisfies GPUShaderModule;

  const pipelineDescriptor = {
    fragment: {
      entryPoint: "fragment_main",
      module: shaderModule,
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
      module: shaderModule,
    },
  } satisfies GPURenderPipelineDescriptor;

  const renderPipeline = device.createRenderPipeline(pipelineDescriptor);


  return {
    ...data,
    buffers: {
      index: indexBuffer,
      vertex: vertexBuffer,
    },
    count: indices.length,
    renderPipeline,
  };
};
