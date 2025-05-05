import { Renderer } from "@/renderer/Renderer";
import { getWebGL1Renderer } from "@/renderer/webgl1/getWebGL1Renderer";
import { getWebGLRenderer } from "@/renderer/webgl/getWebGLRenderer";
import { getWebGPURenderer } from "@/renderer/webgpu/getWebGPURenderer";

export const getRenderer = async (): Promise<Renderer> => {
  try {
    const renderer = await getWebGPURenderer();
    console.info("Using WebGPU renderer");
    return renderer;
  } catch {
    try {
      const renderer = getWebGLRenderer();
      console.info("Using WebGL renderer");
      return renderer;
    } catch {
      const renderer = getWebGL1Renderer();
      console.info("Using WebGL 1.0 renderer");
      return renderer;
    }
  }
};
