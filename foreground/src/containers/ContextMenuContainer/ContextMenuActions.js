import { CONSTANTS } from './constants';

export function showContextMenu(id) {
  return {
    type: CONSTANTS.SHOW_CONTEXT_MENU,
    id: id
  }
}

export function hideContextMenu(id) {
  return {
    type: CONSTANTS.SHOW_CONTEXT_MENU,
    id: null
  }
}
