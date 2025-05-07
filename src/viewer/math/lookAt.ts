import { quat, vec3 } from "gl-matrix";

// From https://forums.ogre3d.org/viewtopic.php?t=53120
export const lookAt = (position: vec3, target: vec3) => {
  const direction = vec3.sub(vec3.create(), target, position);
  vec3.normalize(direction, direction);

  // 90 degree rotation, swap x and z
  // We don't use roll, so y is 0
  const right = vec3.fromValues(direction[2], 0, -direction[0]);
  vec3.normalize(right, right);

  const up = vec3.cross(vec3.create(), direction, right);

  const rotation = quat.create();
  quat.setAxes(rotation, direction, right, up);

  return rotation;
}