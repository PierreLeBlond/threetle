import { WebGPURendererData } from "./WebGPURendererData";

export const draw = (rendererData: WebGPURendererData) => {
  const { buffers, device, renderPipeline, wgpu } = rendererData;

  const clearColor = { a: 1.0, b: 0.0, g: 0.0, r: 0.0 };

  // From https://webgpufundamentals.org/webgpu/lessons/webgpu-multisampling.html
  // Will need updates when resizing canvas
  const canvasTexture = wgpu.getCurrentTexture();

  let multisampleTexture = rendererData.multisampleTexture;

  if (!multisampleTexture) {
    multisampleTexture = device.createTexture({
      format: canvasTexture.format,
      sampleCount: 4,
    size: [canvasTexture.width, canvasTexture.height],
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  });
  } else if (multisampleTexture.width !== canvasTexture.width || multisampleTexture.height !== canvasTexture.height) {
    multisampleTexture = device.createTexture({
      format: canvasTexture.format,
      sampleCount: 4,
      size: [canvasTexture.width, canvasTexture.height],
      usage: GPUTextureUsage.RENDER_ATTACHMENT,
    });
  }

  const renderPassDescriptor = {
    colorAttachments: [
      {
        clearValue: clearColor,
        loadOp: "clear",
        resolveTarget: canvasTexture.createView(),
        storeOp: "store",
        view: multisampleTexture.createView(),
      },
    ],
  } satisfies GPURenderPassDescriptor;

  const commandEncoder = device.createCommandEncoder();

  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  if (!renderPipeline) {
    throw new Error("Render pipeline not found");
  }

  passEncoder.setPipeline(renderPipeline);

  if (!buffers) {
    throw new Error("Buffers not found");
  }

  passEncoder.setVertexBuffer(0, buffers.vertex);
  passEncoder.draw(3);
  passEncoder.end();

  device.queue.submit([commandEncoder.finish()]);
};
