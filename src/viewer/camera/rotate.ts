import { quat, vec3 } from "gl-matrix";

import { Camera } from "./Camera";

export const rotate = (camera: Camera, axe: vec3, angle: number) => {
  const rotation = quat.create();
  quat.setAxisAngle(rotation, axe, angle);
  quat.mul(camera.rotation, rotation, camera.rotation);
};
