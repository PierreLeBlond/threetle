export type WebGPURendererData = {
  device: GPUDevice;
  multisampleTexture: GPUTexture;
  renders: {
    buffers: {
      index: GPUBuffer;
      vertex: GPUBuffer;
    };
    count: number;
    pipeline: GPURenderPipeline;
  }[];
  shaderModule: GPUShaderModule;
  wgpu: GPUCanvasContext;
};
