import "./style.css";
import { getScriptData } from "./getScriptData";
import { getViewerElement } from "./getViewerElement";
import { init } from "./viewer/init";
import { Viewer } from "./viewer/Viewer";

const [id, callback] = getScriptData();
const viewerElement = getViewerElement(id);

const data = await init(viewerElement);

const viewer: Viewer = {
  createSquare: () => {
    data.renderer.createSquare();
  },
  data,
};

callback(viewer);
