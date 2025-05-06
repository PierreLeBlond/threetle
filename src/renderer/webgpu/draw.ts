import { WebGPURendererData } from "./WebGPURendererData";

export const draw = (data: WebGPURendererData) => {
  const { device, multisampleTexture, renders, wgpu } = data;

  const clearColor = { a: 1.0, b: 0.0, g: 0.0, r: 0.0 };

  // From https://webgpufundamentals.org/webgpu/lessons/webgpu-multisampling.html
  // Will need updates when resizing canvas
  const canvasTexture = wgpu.getCurrentTexture();

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

  return data;
};
