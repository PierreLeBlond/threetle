import { mat4 } from "gl-matrix";

import { WebGLRendererData } from "./WebGLRendererData";

export const draw = (rendererData: WebGLRendererData) => {
  const { canvas, geometries, gl, programInfo } = rendererData;

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);

  const projectionMatrix = mat4.create();
  const viewMatrix = mat4.create();

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformsLocations.projection,
    false,
    projectionMatrix,
  );

  gl.uniformMatrix4fv(programInfo.uniformsLocations.view, false, viewMatrix);

  geometries.forEach((geometry) => {
    gl.bindVertexArray(geometry.vao);
    gl.drawElements(gl.TRIANGLES, geometry.count, gl.UNSIGNED_INT, 0);
  });

  gl.useProgram(null);

  gl.bindVertexArray(null);
};
