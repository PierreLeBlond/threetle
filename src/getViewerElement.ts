export const getViewerElement = (id: string) => {
  const element = document.getElementById(id);
  if (!element) {
    throw new Error(`Couldn't find element with id ${id}`);
  }
  return element;
};
