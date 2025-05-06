import { addShaderProgram } from "@/renderer/webgl1/utils/addShaderProgram";

import { WebGLRendererData } from "./WebGLRendererData";

export const init = (): WebGLRendererData => {
  const canvas = document.createElement("canvas");

  const gl = canvas.getContext("webgl2", {
    antialias: true,
  });

  if (!gl) {
    throw new Error("Failed to create WebGL 2.0 context");
  }

  const shaderProgram = addShaderProgram(gl);

  return {
    canvas,
    geometries: [],
    gl,
    shaderProgram,
  };
};
