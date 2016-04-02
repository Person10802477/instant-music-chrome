import { CONSTANTS } from "./constants";

export function currentContextMenu(state = null, action) {
  switch (action.type) {
    case CONSTANTS.SHOW_CONTEXT_MENU:
      return {id: action.id, mousePosition: action.mousePosition};
    case CONSTANTS.HIDE_CONTEXT_MENU:
      return null;
    default:
      return state;
  }
}
