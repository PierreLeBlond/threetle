export type WebGPURendererData = {
  cameraBindGroup: GPUBindGroup;
  cameraUniformBuffer: GPUBuffer;
  device: GPUDevice;
  geometries: Map<string, {
    buffers: {
      index: GPUBuffer;
      vertex: GPUBuffer;
    };
    count: number;
  }>;
  multisampleTexture: GPUTexture;
  renderPipeline: GPURenderPipeline;
  wgpu: GPUCanvasContext;
};
