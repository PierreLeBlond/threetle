import { Renderer } from "../renderer/Renderer";
import { getWebGLRenderer } from "../renderer/webgl/getWebGLRenderer";
import { getWebGPURenderer } from "../renderer/webgpu/getWebGPURenderer";

export const getRenderer = async (): Promise<Renderer> => {
  try {
    const renderer = await getWebGPURenderer();
    return renderer;
  } catch {
    const renderer = getWebGLRenderer();
    return renderer;
  }
};
