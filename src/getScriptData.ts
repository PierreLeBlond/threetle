import { Viewer } from "./viewer/Viewer";

export const getScriptData = (): [string, (viewer: Viewer) => void] => {
  const scripts = document.getElementsByTagName("script");
  const script = Array.from(scripts).find(
    (script) =>
      script.hasAttribute("viewer-callback") &&
      script.hasAttribute("viewer-id"),
  );

  if (!script) {
    throw new Error(
      "Couldn't find script with attribute `viewer-callback` or `viewer-id`",
    );
  }

  const viewerId = script.getAttribute("viewer-id");

  if (!viewerId) {
    throw new Error("Couldn't find `viewer-id` attribute");
  }

  const viewerCallback = script.getAttribute("viewer-callback");

  if (!viewerCallback) {
    throw new Error("Couldn't find `viewer-callback` attribute");
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
  const callback = (window as any)[viewerCallback] as (viewer: Viewer) => void;

  return [viewerId, callback];
};
