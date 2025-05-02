import "./style.css";
import { getScriptData } from "./getScriptData";
import { getViewerElement } from "./getViewerElement";
import { Viewer } from "./viewer/Viewer";

import logo from "/logo.svg";

const [id, callback] = getScriptData();
const viewerElement = getViewerElement(id);

viewerElement.innerHTML = `<img src="${logo}" class="logo" alt="threetle logo" />`;

const viewer: Viewer = {
  element: viewerElement,
  id,
};

callback(viewer);
