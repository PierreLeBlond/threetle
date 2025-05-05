import { getRenderer } from "./getRenderer";

export const init = async (element: HTMLElement) => {
  const renderer = await getRenderer();

  const canvas = renderer.getCanvas();

  element.appendChild(canvas);

  canvas.width = element.clientWidth;
  canvas.height = element.clientHeight;

  renderer.createSquare();
  renderer.createTriangle();

  const RESOLUTION = 10;
  const RADIUS = 0.3;
  const indices = [];
  const positions = [0, 0, 0];
  const colors = [1, 0, 1];
  for (let i = 0; i <= RESOLUTION; i++) {
    const angle = (i / RESOLUTION) * Math.PI * 2;
    const x = Math.cos(angle) * RADIUS;
    const y = Math.sin(angle) * RADIUS;

    indices.push(0, i, i + 1);
    positions.push(x, y, 0);
    colors.push(1, 1, 0);
  }

  renderer.addGeometry({
    colors: new Float32Array(colors),
    indices: new Uint32Array(indices),
    positions: new Float32Array(positions),
  });

  const loop = () => {
    renderer.draw();

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

  return {
    element,
  };
};
