import { WebGLCore } from "../core/webgl/WebGLCore";

export const init = (element: HTMLElement) => {
  let data = WebGLCore.init();

  const { canvas } = data;

  element.appendChild(canvas);

  canvas.width = element.clientWidth;
  canvas.height = element.clientHeight;

  data = WebGLCore.createTriangle(data);

  const loop = () => {
    WebGLCore.draw(data);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

  return {
    element,
  };
};
