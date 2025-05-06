import { Renderer } from "@/renderer/Renderer";

export type Viewer = {
  createSquare: () => void;
  data: ViewerData;
};

export type ViewerData = {
  element: HTMLElement;
  renderer: Renderer;
};
