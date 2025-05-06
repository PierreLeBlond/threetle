import { Renderer } from "../Renderer";
import { createSquare } from "./createSquare";
import { createTriangle } from "./createTriangle";
import { draw } from "./draw";
import { addGeometry } from "./geometry/addGeometry";
import { init } from "./init";

export const getWebGPURenderer = async (): Promise<Renderer> => {
  let data = await init();

  return {
    addGeometry: (geometry) => {
      data = addGeometry(data, geometry);
    },
    createSquare: () => {
      data = createSquare(data);
    },
    createTriangle: () => {
      data = createTriangle(data);
    },
    draw: () => {
      data = draw(data);
    },
    getCanvas: () => {
      return data.canvas;
    },
  };
};
