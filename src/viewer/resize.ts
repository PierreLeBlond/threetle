import { Renderer } from "@/renderer/Renderer";

export const resize = (canvas: HTMLCanvasElement, renderer: Renderer, width: number, height: number) => {
  canvas.width = width;
  canvas.height = height;

  renderer.resize(width, height);
};
