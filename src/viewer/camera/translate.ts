import { vec3 } from "gl-matrix";

import { Camera } from "./Camera";

export const translate = (camera: Camera, translation: vec3) => {
  vec3.add(camera.position, camera.position, translation);
};

