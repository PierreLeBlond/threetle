import { mat4 } from "gl-matrix";

import { Camera } from "./Camera";

export const getView = (camera: Camera) => {
  const view = mat4.create();
  mat4.fromRotationTranslation(view, camera.rotation, camera.position);

  return view;
};
