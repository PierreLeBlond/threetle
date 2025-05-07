import { mat4 } from "gl-matrix";

import { WebGLRendererData } from "./WebGLRendererData";

export const draw = (rendererData: WebGLRendererData, view: mat4, projection: mat4, geometryIds: string[]) => {
  const { gl, shaderProgram } = rendererData;

  gl.clearColor(0, 0, 0, 1);
  gl.clear(gl.COLOR_BUFFER_BIT);

  gl.useProgram(shaderProgram.program);

  gl.uniformMatrix4fv(
    shaderProgram.uniformsLocations.projection,
    false,
    projection,
  );

  gl.uniformMatrix4fv(shaderProgram.uniformsLocations.view, false, view);

  geometryIds.forEach((id) => {
    const geometry = rendererData.geometries.get(id);

    if (!geometry) {
      throw new Error(`Geometry ${id} not found`);
    }

    const { count, vao } = geometry;

    gl.bindVertexArray(vao);
    gl.drawElements(gl.TRIANGLES, count, gl.UNSIGNED_INT, 0);
  });

  gl.useProgram(null);

  gl.bindVertexArray(null);
};
