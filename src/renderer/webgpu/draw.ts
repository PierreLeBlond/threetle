import { mat4 } from "gl-matrix";

import { WebGPURendererData } from "./WebGPURendererData";

export const draw = (data: WebGPURendererData, view: mat4, projection: mat4, geometryIds: string[]) => {
  const { cameraBindGroup, cameraUniformBuffer, device, multisampleTexture, wgpu } = data;

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

  const cameraBuffer = device.createBuffer({
    mappedAtCreation: true,
    size: 2 * 16 * 4,
    usage: GPUBufferUsage.COPY_SRC,
  });
  {
    const map = new Float32Array(cameraBuffer.getMappedRange());
    map.set(projection);
    map.set(view, 16);
    cameraBuffer.unmap();
  }

  commandEncoder.copyBufferToBuffer(cameraBuffer, 0, cameraUniformBuffer, 0, 2 * 16 * 4);

  const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);

  passEncoder.setPipeline(data.renderPipeline);
  passEncoder.setBindGroup(0, cameraBindGroup);

  for (const id of geometryIds) {
    const geometry = data.geometries.get(id);

    if (!geometry) {
      throw new Error(`Geometry ${id} not found`);
    }

    passEncoder.setVertexBuffer(0, geometry.buffers.vertex);
    passEncoder.setIndexBuffer(geometry.buffers.index, "uint32");
    passEncoder.drawIndexed(geometry.count);
  }

  passEncoder.end();

  device.queue.submit([commandEncoder.finish()]);

  return data;
};
