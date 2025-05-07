import shaders from "./wgsl/shader.wgsl?raw";

export const addRenderPipeline = (device: GPUDevice) => {
  const shaderModule = device.createShaderModule({
    code: shaders,
  }) satisfies GPUShaderModule;

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

    const cameraBindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        buffer: {
          type: "uniform",
        },
        visibility: GPUShaderStage.VERTEX,
      },
    ],
  });

  const renderPipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [cameraBindGroupLayout],
  });

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
    layout: renderPipelineLayout,
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
    cameraBindGroupLayout,
    renderPipeline,
  };
};
