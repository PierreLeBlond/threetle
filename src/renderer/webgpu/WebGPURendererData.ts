export type WebGPURendererData = {
  buffers?: {
    vertex: GPUBuffer;
  };
  canvas: HTMLCanvasElement;
  device: GPUDevice;
  multisampleTexture?: GPUTexture;
  renderPipeline?: GPURenderPipeline;
  wgpu: GPUCanvasContext;
};
