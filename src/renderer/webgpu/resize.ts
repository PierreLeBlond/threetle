import { WebGPURendererData } from "./WebGPURendererData";

export const resize = (data: WebGPURendererData, width: number, height: number) => {
  const { device, wgpu } = data;

  const canvasTexture = wgpu.getCurrentTexture();

  data.multisampleTexture.destroy();

  data.multisampleTexture = device.createTexture({
    format: canvasTexture.format,
    sampleCount: 4,
    size: [width, height],
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });

  return data;
};
