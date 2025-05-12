export type Direction = "up" | "down" | "left" | "right";
export type Zoom = "zoomIn" | "zoomOut";

export type Actions = {
  [key in Direction | Zoom]: boolean;
};

export const keyboardMap: Map<string, Direction> = new Map([
  ["ArrowUp", "up"],
  ["ArrowDown", "down"],
  ["ArrowRight", "right"],
  ["ArrowLeft", "left"],
]);