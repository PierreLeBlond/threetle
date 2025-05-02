import fragmentShaderSource from "./shaders/triangle.frag?raw";
import vertexShaderSource from "./shaders/triangle.vert?raw";
import { WebGLCoreData } from "./WebGLCore";

export const createTriangle = (data: WebGLCoreData): WebGLCoreData => {
  const { gl } = data;

  const vertexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  const vertices = [-0.5, -0.5, 0.0, 0.5, -0.5, 0.0, 0.0, 0.5, 0.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);

  const colors = [1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0];
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  const indices = [0, 1, 2];
  gl.bufferData(
    gl.ELEMENT_ARRAY_BUFFER,
    new Uint16Array(indices),
    gl.STATIC_DRAW,
  );

  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);

  const vertexShader = gl.createShader(gl.VERTEX_SHADER);

  if (!vertexShader) {
    throw new Error("Failed to create vertex shader");
  }

  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    throw new Error(
      `Error compiling vertex shader: ${gl.getShaderInfoLog(vertexShader) ?? "Unknown error"}`,
    );
  }

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);

  if (!fragmentShader) {
    throw new Error("Failed to create fragment shader");
  }

  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    throw new Error(
      `Error compiling fragment shader: ${gl.getShaderInfoLog(fragmentShader) ?? "Unknown error"}`,
    );
  }

  const program = gl.createProgram();

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(
      `Error linking program: ${gl.getProgramInfoLog(program) ?? "Unknown error"}`,
    );
  }

  gl.useProgram(program);

  const positionAttributeLocation = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(positionAttributeLocation);

  const colorAttributeLocation = gl.getAttribLocation(program, "color");
  gl.enableVertexAttribArray(colorAttributeLocation);

  const projectionLocation = gl.getUniformLocation(program, "projection");

  if (!projectionLocation) {
    throw new Error("Failed to get projection location");
  }

  const viewLocation = gl.getUniformLocation(program, "view");

  if (!viewLocation) {
    throw new Error("Failed to get view location");
  }

  gl.useProgram(null);

  return {
    ...data,
    buffers: {
      color: colorBuffer,
      index: indexBuffer,
      position: vertexBuffer,
    },
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
