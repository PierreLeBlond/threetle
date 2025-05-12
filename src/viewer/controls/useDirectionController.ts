import { quat, vec3 } from "gl-matrix"
import { Direction, Actions } from "./actions/Input"

const MAXIMUM_SPEED = Math.PI / 1000;
const ACCELERATION = MAXIMUM_SPEED / 1000;

const axisMap: Map<Direction, vec3> = new Map([
  ["up", vec3.fromValues(1, 0, 0)],
  ["down", vec3.fromValues(-1, 0, 0)],
  ["left", vec3.fromValues(0, 1, 0)],
  ["right", vec3.fromValues(0, -1, 0)],
])

export const useDirectionController = () => {

  const axis = vec3.create();

  let targetSpeed = 0.0;
  let speed = 0.0;

  const update = (actions: Actions, delta: number) => {
    const meanAxis = Array.from(axisMap.entries()).filter(([key]) => actions[key]).reduce(
      (accu, [_, axis]) => {
        return vec3.add(accu, accu, axis);
      }, vec3.create()
    )

    if (vec3.squaredLength(meanAxis) == 0) {
      targetSpeed = 0.0;
    } else {
      targetSpeed = MAXIMUM_SPEED;

      vec3.normalize(meanAxis, meanAxis);
      vec3.copy(axis, meanAxis);
    }

    speed += Math.sign(targetSpeed - speed) * delta * ACCELERATION;
    speed = Math.min(Math.max(speed, 0.0), MAXIMUM_SPEED);

    const angle = speed * delta;

    const rotation = quat.create();
    quat.setAxisAngle(rotation, axis, angle);

    return rotation;
  }

  return {
    update
  }
}