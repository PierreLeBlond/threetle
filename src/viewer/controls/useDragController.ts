import { mat4, quat, vec3 } from "gl-matrix";
import { useDamper } from "./useDamper";
import { Camera } from "@/viewer/camera/Camera";

export const useDragController = (element: HTMLElement, camera: Camera) => {

  const lockedRay = vec3.create();

  // rotation when not dragging
  const rotation = quat.create();

  const damper = useDamper();

  // Last rotation axis to compute damping
  const axis = vec3.fromValues(0, 1, 0);

  let lastDragTime = Date.now();
  let angleSpeed = 0;
  let angle = 0;

  // Mouse cursor to world front plane
  // Assuming target is (0, 0, 0)
  const screenToScene = (x: number, y: number) => {

    const ray = vec3.create();
    ray[0] = (x * 2) / element.clientWidth - 1;
    ray[1] = -(y * 2) / element.clientHeight + 1;

    // from https://raw.org/code/trackball-rotation-using-quaternions/
    const squaredProjectedLength = ray[0]*ray[0] + ray[1]*ray[1];

    ray[2] = squaredProjectedLength <= 0.5 
      ? Math.sqrt(1 - squaredProjectedLength) 
      : 0.5/Math.sqrt(squaredProjectedLength);

    const inverse = mat4.invert(mat4.create(), camera.projection);
    vec3.transformMat4(ray, ray, inverse);
    vec3.normalize(ray, ray);

    return ray
  }

  const lock = (event: MouseEvent) => {
    damper.stop();

    const x = event.clientX;
    const y = event.clientY;

    vec3.copy(lockedRay, screenToScene(x, y));

    lastDragTime = Date.now();

    element.addEventListener("mousemove", drag);
  }

  const drag = (event: MouseEvent) => {
    const x = event.clientX;
    const y = event.clientY;

    const ray = screenToScene(x, y);

    const dot = vec3.dot(lockedRay, ray);

    const lastAngle = angle;

    angle = Math.acos(Math.max(Math.min(dot, 1.0), -1.0));

    const delta = Date.now() - lastDragTime;
    angleSpeed = Math.abs(lastAngle - angle) / delta;
    lastDragTime = Date.now();

    vec3.copy(axis, vec3.cross(vec3.create(), ray, lockedRay));
    vec3.normalize(axis, axis);

    const dragRotation = quat.create();
    quat.setAxisAngle(dragRotation, axis, angle);

    quat.mul(rotation, dragRotation, rotation);

    vec3.copy(lockedRay, ray)
  }

  const release = () => {
    damper.start(axis);

    element.removeEventListener("mousemove", drag);
  }

  element.addEventListener("mousedown", lock);
  element.addEventListener("mouseup", release);
  element.addEventListener("mouseleave", release);

  const update = (delta: number) => {

    const finalRotation = quat.create();

    quat.mul(finalRotation, rotation, finalRotation);
    quat.identity(rotation);

    const dampRotation = damper.update(delta, angleSpeed)
    quat.mul(finalRotation, dampRotation, finalRotation);

    return finalRotation;
  }

  return {
    update
  }
}