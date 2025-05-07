import { createCamera } from "@/viewer/camera/createCamera";
import { ViewerData } from "@/viewer/Viewer";

import { getRenderer } from "./getRenderer";
import { resize } from "./resize";

export const init = async (element: HTMLElement): Promise<ViewerData> => {
  const canvas = document.createElement("canvas");
  element.appendChild(canvas);

  const renderer = await getRenderer(canvas);

  element.addEventListener("resize", () => {
    resize(canvas, renderer, element.clientWidth, element.clientHeight);
  });
  resize(canvas, renderer, element.clientWidth, element.clientHeight);

  const camera = createCamera();

  return {
    camera,
    element,
    geometryIds: [],
    renderer,
  };
};
