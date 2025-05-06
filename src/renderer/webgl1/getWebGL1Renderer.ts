import { Renderer } from "../Renderer";
import { createSquare } from "./createSquare";
import { createTriangle } from "./createTriangle";
import { draw } from "./draw";
import { addGeometry } from "./geometry/addGeometry";
import { init } from "./init";
import { resize } from "./resize";

export const getWebGL1Renderer = (canvas: HTMLCanvasElement): Renderer => {
  let data = init(canvas);

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
    resize: (width: number, height: number) => {
      data = resize(data, width, height);
    }
  };
};
