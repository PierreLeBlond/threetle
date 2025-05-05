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

  return {
    canvas,
    geometries: [],
    gl,
  };
};
