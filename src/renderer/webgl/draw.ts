import { mat4 } from "gl-matrix";

import { WebGLRendererData } from "./WebGLRendererData";

export const draw = (rendererData: WebGLRendererData) => {
  const { canvas, count, gl, programInfo, vao } = rendererData;

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);

  const projectionMatrix = mat4.create();
  const viewMatrix = mat4.create();

  if (!vao || !programInfo) {
    throw new Error("VAO or programInfo not found");
  }

  gl.bindVertexArray(vao);
  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformsLocations.projection,
    false,
    projectionMatrix,
  );

  gl.uniformMatrix4fv(programInfo.uniformsLocations.view, false, viewMatrix);

  if (!count) {
    throw new Error("Count not found");
  }

  gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_SHORT, 0);

  gl.useProgram(null);

  gl.bindVertexArray(null);
};
