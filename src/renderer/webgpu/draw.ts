import { WebGPURendererData } from "./WebGPURendererData";

export const draw = (data: WebGPURendererData) => {
  const { device, renders, wgpu } = data;

  const clearColor = { a: 1.0, b: 0.0, g: 0.0, r: 0.0 };

  // From https://webgpufundamentals.org/webgpu/lessons/webgpu-multisampling.html
  // Will need updates when resizing canvas
  const canvasTexture = wgpu.getCurrentTexture();

  let multisampleTexture = data.multisampleTexture;
    
  if (multisampleTexture.width !== canvasTexture.width || multisampleTexture.height !== canvasTexture.height) {
    console.log("multisampleTexture", multisampleTexture.width, canvasTexture.width);
    multisampleTexture.destroy();
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

  for (const render of renders) {
    passEncoder.setPipeline(render.pipeline);
    passEncoder.setVertexBuffer(0, render.buffers.vertex);
    passEncoder.setIndexBuffer(render.buffers.index, "uint32");
    passEncoder.drawIndexed(render.count);
  }

  passEncoder.end();

  device.queue.submit([commandEncoder.finish()]);

  return {
    ...data,
    multisampleTexture,
  };
};
