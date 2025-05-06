import fragmentShaderSource from "@/renderer/webgl1/shaders/shader.frag?raw";
import vertexShaderSource from "@/renderer/webgl1/shaders/shader.vert?raw";

export const addShaderProgram = (gl: WebGLRenderingContext) => {
   const vertexShader = gl.createShader(gl.VERTEX_SHADER);

  if (!vertexShader) {
    throw new Error("Failed to create vertex shader");
  }

  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw new Error(`Error compiling vertex shader: ${gl.getShaderInfoLog(vertexShader) ?? "Unknown error"}`);
  }

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  if (!fragmentShader) {
    throw new Error("Failed to create fragment shader");
  }

  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    throw new Error(`Error compiling fragment shader: ${gl.getShaderInfoLog(fragmentShader) ?? "Unknown error"}`);
  }

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(`Error linking program: ${gl.getProgramInfoLog(program) ?? "Unknown error"}`);
  }

  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  const positionAttributeLocation = gl.getAttribLocation(program, "position");
  const colorAttributeLocation = gl.getAttribLocation(program, "color");

  const projectionLocation = gl.getUniformLocation(program, "projection");

  if (!projectionLocation) {
    throw new Error("Failed to get projection location");
  }

  const viewLocation = gl.getUniformLocation(program, "view");

  if (!viewLocation) {
    throw new Error("Failed to get view location");
  }

  return {
    attributesLocations: {
      color: colorAttributeLocation,
      position: positionAttributeLocation,
    },
    program,
    uniformsLocations: {
      projection: projectionLocation,
      view: viewLocation,
    },
  };
};