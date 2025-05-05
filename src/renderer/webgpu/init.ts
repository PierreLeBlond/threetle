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


  return {
    canvas,
    device,
    wgpu,
  };
};
