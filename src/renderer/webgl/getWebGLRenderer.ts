import { Renderer } from "../Renderer";
import { createTriangle } from "./createTriangle";
import { draw } from "./draw";
import { init } from "./init";

export const getWebGLRenderer = (): Renderer => {
  let data = init();

  return {
    createTriangle: () => {
      data = createTriangle(data);
    },
    draw: () => {
      draw(data);
    },
    getCanvas: () => {
      return data.canvas;
    },
  };
};
