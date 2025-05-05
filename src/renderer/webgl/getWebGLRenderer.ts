import { Renderer } from "@/renderer/Renderer";
import { addGeometry } from "@/renderer/webgl/geometry/addGeometry";

import { createSquare } from "./createSquare";
import { createTriangle } from "./createTriangle";
import { draw } from "./draw";
import { init } from "./init";

export const getWebGLRenderer = (): Renderer => {
  let data = init();

  return {
    addGeometry: (vertexData) => {
      data = addGeometry(data, vertexData);
    },
    createSquare: () => {
      data = createSquare(data);
    },
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
