import "./style.css";
import { getScriptData } from "./getScriptData";
import { getViewerElement } from "./getViewerElement";
import { getViewer } from "./viewer/getViewer";

const [id, callback] = getScriptData();
const viewerElement = getViewerElement(id);

const viewer = await getViewer(viewerElement);

callback(viewer);
