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
  
  const vertexBuffers = [
    {
      arrayStride: 24,
      attributes: [
        {
          format: "float32x3", 
          offset: 0,
          shaderLocation: 0,
        },
        {
          format: "float32x3",
          offset: 12,
          shaderLocation: 1,
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
      vertex: positionBuffer,
    },
    count: vertexData.indices.length,
    pipeline: renderPipeline,
  };

  return {
    ...data,
    renders: [...data.renders, render],
  };
}