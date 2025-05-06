import { addShaderProgram } from "@/renderer/webgl/utils/addShaderProgram";

import { WebGLRendererData } from "./WebGLRendererData";

export const init = (canvas: HTMLCanvasElement): WebGLRendererData => {

  const gl = canvas.getContext("webgl2", {
    antialias: true,
  });

  if (!gl) {
    throw new Error("Failed to create WebGL 2.0 context");
  }

  const shaderProgram = addShaderProgram(gl);

  return {
    geometries: [],
    gl,
    shaderProgram,
  };
};
