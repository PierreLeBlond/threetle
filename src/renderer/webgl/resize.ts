import { WebGLRendererData } from "./WebGLRendererData";

export const resize = (data: WebGLRendererData, width: number, height: number) => {
  data.gl.viewport(0, 0, width, height);
  return data;
};
