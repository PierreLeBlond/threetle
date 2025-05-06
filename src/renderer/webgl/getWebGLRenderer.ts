import { Renderer } from "@/renderer/Renderer";
import { addGeometry } from "@/renderer/webgl/geometry/addGeometry";

import { createSquare } from "./createSquare";
import { createTriangle } from "./createTriangle";
import { draw } from "./draw";
import { init } from "./init";
import { resize } from "./resize";

export const getWebGLRenderer = (canvas: HTMLCanvasElement): Renderer => {
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
