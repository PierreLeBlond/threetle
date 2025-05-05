import { mat4 } from "gl-matrix";

import { WebGLRendererData } from "./WebGLRendererData";

export const draw = (rendererData: WebGLRendererData) => {
  const { buffers, canvas, gl, programInfo } = rendererData;

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);

  const projectionMatrix = mat4.create();
  const viewMatrix = mat4.create();

  if (!buffers || !programInfo) {
    return;
  }

  //gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.index);

  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformsLocations.projection,
    false,
    projectionMatrix,
  );

  gl.uniformMatrix4fv(programInfo.uniformsLocations.view, false, viewMatrix);

  gl.drawArrays(gl.TRIANGLES, 0, 3);

  gl.useProgram(null);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
};
