import { quat, vec3 } from "gl-matrix"

// TODO: Tweak with physical and understandable parameters
const DECCELERATION_FACTOR = (Math.PI / 1000) / 200;

export const useDamper = () => {

  let speed = 0.0;
  let dampingAxis = vec3.fromValues(0, 1, 0);

  let started = false;

  const damp = (delta: number) => {
    const angle = delta * speed;

    const dampRotation = quat.create();
    quat.setAxisAngle(dampRotation, dampingAxis, angle);

    speed -= delta * DECCELERATION_FACTOR;
    speed = Math.max(speed, 0.0);

    return dampRotation;
  }

  const update = (delta: number, angleSpeed: number) => {

    if (!started) {
      speed = angleSpeed
      return quat.create();
    }

    return damp(delta);
  }

  const start = (axis: vec3) => {
    dampingAxis = axis;

    started = true;
  }

  const stop = () => {
    started = false;
  }

  return {
    update,
    start,
    stop
  }
}