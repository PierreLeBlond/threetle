export type Core<T extends CoreData> = {
  createTriangle: (coreData: T) => T;
  draw: (coreData: T) => void;
  init: () => T;
};

export type CoreData = {
  canvas: HTMLCanvasElement;
};
