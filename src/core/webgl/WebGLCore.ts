import { Core, CoreData } from "../Core";
import { createTriangle } from "./createTriangle";
import { draw } from "./draw";
import { init } from "./init";

export type WebGLCoreData = CoreData & {
  buffers?: {
    color: WebGLBuffer;
    index: WebGLBuffer;
    position: WebGLBuffer;
  };
  gl: WebGLRenderingContext;
  programInfo?: {
    attributesLocations: {
      color: number;
      position: number;
    };
    program: WebGLProgram;
    uniformsLocations: {
      projection: WebGLUniformLocation;
      view: WebGLUniformLocation;
    };
  };
};

export const WebGLCore = {
  createTriangle,
  draw,
  init,
} satisfies Core<WebGLCoreData>;
