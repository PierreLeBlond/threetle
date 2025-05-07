import { Renderer } from "@/renderer/Renderer";

export const createSquare = (renderer: Renderer): string => {
  const id = renderer.createSquare();

  return id;
};
