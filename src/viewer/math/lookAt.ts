import { quat, vec3 } from "gl-matrix";

// From https://forums.ogre3d.org/viewtopic.php?t=53120
export const lookAt = (position: vec3, target: vec3) => {

  // 1 0 0
  const direction = vec3.create();
  vec3.sub(direction, target, position);
  vec3.normalize(direction, direction);

  // -1 0 0
  const right = vec3.create();
  vec3.cross(right, vec3.fromValues(0, 1, 0), direction);
  vec3.normalize(right, right);

  // 0 1 0
  const up = vec3.cross(vec3.create(), direction, right);

  const rotation = quat.create();

  quat.setAxes(rotation, direction, right, up);

  return rotation;
}