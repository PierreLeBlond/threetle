export const init = () => {
  const canvas = document.createElement("canvas");

  // GL 1.0 context, we'll support 2.0 soon enough
  const gl = canvas.getContext("webgl");

  // TODO: Provide a fallback, or send an error event
  if (!gl) {
    throw new Error("Failed to create WebGL context");
  }

  return {
    canvas,
    gl,
  };
};
