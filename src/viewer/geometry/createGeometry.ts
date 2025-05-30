export const createGeometry = () => {
const RESOLUTION = 100;
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

  return {
    colors: new Float32Array(colors),
    indices: new Uint32Array(indices),
    positions: new Float32Array(positions),
  };
};