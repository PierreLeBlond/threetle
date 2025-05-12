import { Actions, keyboardMap } from "./Input"

export const useInputActions = () => {
  const actions: Actions = {
    up: false,
    down: false,
    left: false,
    right: false,
    zoomIn: false,
    zoomOut: false
  }

    const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    const action = keyboardMap.get(key);
    if (!action) {
      return;
    }
    actions[action] = true;
  }

  const handleKeyUp = (event: KeyboardEvent) => {
    const { key } = event;
    const action = keyboardMap.get(key);
    if (!action) {
      return;
    }
    actions[action] = false;
  }

  document.addEventListener("keydown", handleKeyDown);
  document.addEventListener("keyup", handleKeyUp)

  return {
    get actions() {
      return actions
    }
  }
}