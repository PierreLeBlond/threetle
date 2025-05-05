export type WebGPURendererData = {
  buffers?: {
    index: GPUBuffer;
    vertex: GPUBuffer;
  };
  canvas: HTMLCanvasElement;
  count?: number;
  device: GPUDevice;
  multisampleTexture?: GPUTexture;
  renderPipeline?: GPURenderPipeline;
  wgpu: GPUCanvasContext;
};
