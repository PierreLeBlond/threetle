import { lookAt } from "@/viewer/math/lookAt";
import { mat4, vec3 } from "gl-matrix";

export const createCamera = () => {

  const projection = mat4.create();
  mat4.perspective(projection, 45, 1, 0.1, 100);

  const rotation = lookAt(vec3.fromValues(0, 0, -1.0), vec3.fromValues(0, 0, 0));

  return  {
    position: vec3.fromValues(0, 0, -1.0),
    projection,
    rotation,
  };
}