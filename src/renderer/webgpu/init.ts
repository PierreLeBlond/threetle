import shaders from "./shaders/triangle.wgsl?raw";
import { WebGPURendererData } from "./WebGPURendererData";

export const init = async (): Promise<WebGPURendererData> => {
  const gpu = navigator.gpu as GPU | null;

  if (!gpu) {
    throw Error("WebGPU not supported.");
  }

  const adapter = await gpu.requestAdapter();
  if (!adapter) {
    throw Error("Couldn't request WebGPU adapter.");
  }

  const device = await adapter.requestDevice();

  const canvas = document.createElement("canvas");

  // GL 1.0 context, we'll support 2.0 soon enough
  const wgpu = canvas.getContext("webgpu");

  // TODO: Provide a fallback, or send an error event
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
    canvas,
    device,
    multisampleTexture,
    renders: [],
    shaderModule,
    wgpu,
  };
};
