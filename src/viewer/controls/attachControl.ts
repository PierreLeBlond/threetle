import { ViewerData } from "@/viewer/Viewer";
import { quat } from "gl-matrix";
import { useInputActions } from "./actions/useInputActions";
import { useDirectionController } from "./useDirectionController";
import { useDragController } from "./useDragController";

export const attachControl = (data: ViewerData) => {

  const { camera, element } = data;
  
  const inputActions = useInputActions();

  const dragController = useDragController(element, camera);
  const directionController = useDirectionController();

  const rotation = quat.create();

  const update = (delta: number) => {
    const actions = inputActions.actions;

    const directionRotation = directionController.update(actions, delta)
    quat.mul(rotation, directionRotation, rotation);

    const dragRotation = dragController.update(delta);
    quat.mul(rotation, dragRotation, rotation);

    return rotation;
  }

  return {
    update
  }
};
