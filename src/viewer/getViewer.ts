import { getView } from "./camera/getView";
import { attachControl } from "./controls/attachControl";
import { createSquare } from "./createSquare";
import { init } from "./init/init";
import { Viewer } from "./Viewer";

export const getViewer = async (viewerElement: HTMLElement): Promise<Viewer> => {
  const data = await init(viewerElement);

  const control = attachControl(data);

  let lastTime = Date.now();
  const loop = () => {
    const now = Date.now();
    const delta = now - lastTime;
    lastTime = now;

    data.camera.rotation = control.update(delta);

    const view = getView(data.camera);
    data.renderer.draw(view, data.camera.projection, data.geometryIds);

    requestAnimationFrame(loop);
  };

  requestAnimationFrame(loop);

  const viewer: Viewer = {
    createSquare: () => {
      const id = createSquare(data.renderer);
      data.geometryIds.push(id);
    },
    data,
  };

  return viewer;
};
