import { addRenderPipeline } from "./shaders/addRenderPipeline";
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

  const { cameraBindGroupLayout, renderPipeline } = addRenderPipeline(device);

  const cameraUniformBuffer = device.createBuffer({
    size: 2 * 16 * 4,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });

  const cameraBindGroup = device.createBindGroup({
    entries: [{ binding: 0, resource: { buffer: cameraUniformBuffer } }],
    layout: cameraBindGroupLayout,
  });

  return {
    cameraBindGroup,
    cameraUniformBuffer,
    device,
    geometries: new Map(),
    multisampleTexture,
    renderPipeline,
    wgpu,
  };
};
