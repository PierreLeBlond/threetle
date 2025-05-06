import { addShaderProgram } from "./utils/addShaderProgram";
import { WebGLRendererData } from "./WebGLRendererData";

export const init = (): WebGLRendererData => {
  const canvas = document.createElement("canvas");

  const gl = canvas.getContext("webgl", {
    antialias: true,
  });

  // TODO: Provide a fallback, or send an error event
  if (!gl) {
    throw new Error("Failed to create WebGL context");
  }

  const shaderProgram = addShaderProgram(gl);

  gl.enableVertexAttribArray(shaderProgram.attributesLocations.position);
  gl.enableVertexAttribArray(shaderProgram.attributesLocations.color);

  return {
    canvas,
    geometries: [],
    gl,
    shaderProgram,
  };
};
