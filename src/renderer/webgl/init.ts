import fragmentShaderSource from "./shaders/triangle.frag?raw";
import vertexShaderSource from "./shaders/triangle.vert?raw";
import { WebGLRendererData } from "./WebGLRendererData";

export const init = (): WebGLRendererData => {
  const canvas = document.createElement("canvas");

  // GL 1.0 context, we'll support 2.0 soon enough
  const gl = canvas.getContext("webgl2", {
    antialias: true,
  });

  // TODO: Provide a fallback, or send an error event
  if (!gl) {
    throw new Error("Failed to create WebGL 2.0 context");
  }

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
    canvas,
    geometries: [],
    gl,
    programInfo: {
      attributesLocations: {
        color: colorAttributeLocation,
        position: positionAttributeLocation,
      },
      program,
      uniformsLocations: {
        projection: projectionLocation,
        view: viewLocation,
      },
    },
  };
};
