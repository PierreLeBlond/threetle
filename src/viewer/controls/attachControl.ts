import { ViewerData } from "@/viewer/Viewer";
import { mat4, quat, vec3 } from "gl-matrix";

export const attachControl = (data: ViewerData) => {

  const { camera, element } = data;

  const lockedRotation = quat.create();
  const lockedRay = vec3.create();

  // Last rotation axis to compute damping
  const axis = vec3.fromValues(0, 1, 0);
  let angle = 0;

  const rotation = quat.create();
  quat.copy(rotation, camera.rotation);

  let lastAngle = 0.0;
  let dampingAngle = 0.0;
  const dampingDuration = 1000;
  let dampingFactor = 1.0;

  // Mouse cursor to world front plane
  // Assuming target is (0, 0, 0)
  const screenToScene = (x: number, y: number) => {

    const ray = vec3.create();
    ray[0] = (x * 2) / element.clientWidth - 1;
    ray[1] = -(y * 2) / element.clientHeight + 1;
    ray[2] = 1;

    const inverse = mat4.invert(mat4.create(), camera.projection);
    vec3.transformMat4(ray, ray, inverse);
    vec3.normalize(ray, ray);

    return ray
  }

  let locked = false;
  const lock = (event: MouseEvent) => {
    locked = true;

    dampingFactor = 0.0;
    dampingAngle = 0.0;

    const x = event.clientX;
    const y = event.clientY;

    quat.copy(lockedRotation, rotation);
    vec3.copy(lockedRay, screenToScene(x, y));

    element.addEventListener("mousemove", drag);
  }

  const drag = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    const ray = screenToScene(x, y);

    const dot = vec3.dot(lockedRay, ray);
    angle = Math.acos(dot);

    dampingAngle = angle - lastAngle;
    lastAngle = angle;

    const dragRotation = quat.create();
    quat.setAxisAngle(dragRotation, axis, angle);

    quat.mul(rotation, dragRotation, lockedRotation);

    vec3.copy(axis, vec3.cross(vec3.create(), ray, lockedRay));
    vec3.normalize(axis, axis);
  }

  const damp = (delta: number) => {
    const easedOutDampingFactor = Math.pow(dampingFactor, 3);
    angle = dampingAngle * easedOutDampingFactor;

    const dampRotation = quat.create();
    quat.setAxisAngle(dampRotation, axis, angle);

    quat.mul(rotation, dampRotation, rotation);

    dampingFactor -= delta / dampingDuration;
  }

  const release = () => {
    if (!locked) {
      return;
    }

    locked = false;

    dampingFactor = 1.0;
    quat.copy(lockedRotation, rotation);

    element.removeEventListener("mousemove", drag);
  }

  const update = (delta: number) => {
    if (dampingFactor > 0) {
      damp(delta);
    }

    return rotation;
  }

  element.addEventListener("mousedown", lock);
  element.addEventListener("mouseup", release);
  element.addEventListener("mouseleave", release);

  return {
    update
  }
};
