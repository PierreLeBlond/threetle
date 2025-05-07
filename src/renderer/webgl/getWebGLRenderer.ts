import { Renderer } from "@/renderer/Renderer";
import { addGeometry } from "@/renderer/webgl/geometry/addGeometry";
import { mat4 } from "gl-matrix";

import { createSquare } from "./createSquare";
import { draw } from "./draw";
import { init } from "./init";
import { resize } from "./resize";

export const getWebGLRenderer = (canvas: HTMLCanvasElement): Renderer => {
  let data = init(canvas);

  return {
    addGeometry: (vertexData) => {
      const geometry = addGeometry(data, vertexData);

      const id = crypto.randomUUID();
      data.geometries.set(id, geometry);

      return id;
    },
    createSquare: () => {
      const geometry = createSquare(data);

      const id = crypto.randomUUID();
      data.geometries.set(id, geometry);

      return id;
    },
    draw: (view: mat4, projection: mat4, geometryIds: string[]) => {
      draw(data, view, projection, geometryIds);
    },
    resize: (width: number, height: number) => {
      data = resize(data, width, height);
    }
  };
};
