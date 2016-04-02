import { CONSTANTS } from "./constants";

export function currentContextMenu(state = null, action) {
  switch (action.type) {
    case CONSTANTS.SHOW_CONTEXT_MENU:
      return action.id;
    case CONSTANTS.HIDE_CONTEXT_MENU:
      return null;
    default:
      return state;
  }
}
