import { mat4, quat, vec3 } from "gl-matrix";

export type Camera = {
  position: vec3;
  projection: mat4;
  rotation: quat;
};
