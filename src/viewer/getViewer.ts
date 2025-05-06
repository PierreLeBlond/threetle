import { createSquare } from "./createSquare";
import { init } from "./init/init";
import { Viewer } from "./Viewer";

export const getViewer = async (viewerElement: HTMLElement): Promise<Viewer> => {
  const data = await init(viewerElement);

  const viewer: Viewer = {
    createSquare: () => {
      createSquare(data.renderer);
    },
    data,
  };

  return viewer;
};
