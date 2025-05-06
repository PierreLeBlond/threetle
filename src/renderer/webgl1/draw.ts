import { mat4 } from "gl-matrix";

import { WebGLRendererData } from "./WebGLRendererData";

export const draw = (rendererData: WebGLRendererData) => {
  const { canvas, geometries, gl, shaderProgram } = rendererData;

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.viewport(0, 0, canvas.clientWidth, canvas.clientHeight);

  const projectionMatrix = mat4.create();
  const viewMatrix = mat4.create();

  gl.useProgram(shaderProgram.program);

  gl.uniformMatrix4fv(
    shaderProgram.uniformsLocations.projection,
    false,
    projectionMatrix,
  );

  gl.uniformMatrix4fv(shaderProgram.uniformsLocations.view, false, viewMatrix);

  geometries.forEach((geometry) => {

    // Since we are not using a vao, we need to call gl.vertexAttribPointer each frame
    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.buffers.position);
    gl.vertexAttribPointer(
      shaderProgram.attributesLocations.position,
      3,
      gl.FLOAT,
      false,
      0,
      0,
    );

    gl.bindBuffer(gl.ARRAY_BUFFER, geometry.buffers.color);
    gl.vertexAttribPointer(
      shaderProgram.attributesLocations.color,
      3,
      gl.FLOAT,
      false,
      0,
      0,
    );

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, geometry.buffers.index);
    gl.drawElements(gl.TRIANGLES, geometry.count, gl.UNSIGNED_SHORT, 0);
  });

  gl.useProgram(null);

  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
};
