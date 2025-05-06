import { Renderer } from "@/renderer/Renderer";
import { getWebGLRenderer } from "@/renderer/webgl/getWebGLRenderer";
import { getWebGPURenderer } from "@/renderer/webgpu/getWebGPURenderer";

export const getRenderer = async (canvas: HTMLCanvasElement): Promise<Renderer> => {
  try {
    const renderer = await getWebGPURenderer(canvas);
    console.info("Using WebGPU renderer");
    return renderer;
  } catch {
    const renderer = getWebGLRenderer(canvas);
    console.info("Using WebGL renderer");
    return renderer;
  }
};
