import shaders from "./shaders/shader.wgsl?raw";
import { WebGPURendererData } from "./WebGPURendererData";

export const init = async (canvas: HTMLCanvasElement): Promise<WebGPURendererData> => {
  const gpu = navigator.gpu as GPU | null;
  if (!gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const device = await adapter.requestDevice();

  const wgpu = canvas.getContext("webgpu");
  if (!wgpu) {
    throw new Error("Failed to create WebGPU context");
  }

  wgpu.configure({
    alphaMode: "premultiplied",
    device: device,
    format: navigator.gpu.getPreferredCanvasFormat(),
  });

  const canvasTexture = wgpu.getCurrentTexture();

  const multisampleTexture = device.createTexture({
    format: canvasTexture.format,
    sampleCount: 4,
    size: [canvasTexture.width, canvasTexture.height],
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });

  const shaderModule = device.createShaderModule({
    code: shaders,
  }) satisfies GPUShaderModule;

  return {
    device,
    multisampleTexture,
    renders: [],
    shaderModule,
    wgpu,
  };
};
