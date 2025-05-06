import { Renderer } from "../Renderer";
import { createSquare } from "./createSquare";
import { createTriangle } from "./createTriangle";
import { draw } from "./draw";
import { addGeometry } from "./geometry/addGeometry";
import { init } from "./init";
import { resize } from "./resize";
export const getWebGPURenderer = async (canvas: HTMLCanvasElement): Promise<Renderer> => {
  let data = await init(canvas);

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
    resize: (width: number, height: number) => {
      data = resize(data, width, height);
    }
  };
};
