import { getRenderer } from "../getRenderer";
import { resize } from "../resize";
export const init = async (element: HTMLElement) => {
  const canvas = document.createElement("canvas");
  element.appendChild(canvas);

  const renderer = await getRenderer(canvas);

  const loop = () => {
    renderer.draw();

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

  element.addEventListener("resize", () => {
    resize(canvas, renderer, element.clientWidth, element.clientHeight);
  });
  resize(canvas, renderer, element.clientWidth, element.clientHeight);

  return {
    element,
    renderer,
  };
};
