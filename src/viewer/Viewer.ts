import { Renderer } from "@/renderer/Renderer";

import { Camera } from "./camera/Camera";

export type Viewer = {
  createSquare: () => void;
  data: ViewerData;
};

export type ViewerData = {
  camera: Camera;
  element: HTMLElement;
  geometryIds: string[];
  renderer: Renderer;
};
