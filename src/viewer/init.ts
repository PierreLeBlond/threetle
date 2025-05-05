import { getRenderer } from "./getRenderer";

export const init = async (element: HTMLElement) => {
  const renderer = await getRenderer();

  const canvas = renderer.getCanvas();

  element.appendChild(canvas);

  canvas.width = element.clientWidth;
  canvas.height = element.clientHeight;

  renderer.createTriangle();

  const loop = () => {
    renderer.draw();

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

  return {
    element,
  };
};
