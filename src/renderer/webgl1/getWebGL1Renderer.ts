import { Renderer } from "../Renderer";
import { createSquare } from "./createSquare";
import { createTriangle } from "./createTriangle";
import { draw } from "./draw";
import { addGeometry } from "./geometry/addGeometry";
import { init } from "./init";

export const getWebGL1Renderer = (): Renderer => {
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
