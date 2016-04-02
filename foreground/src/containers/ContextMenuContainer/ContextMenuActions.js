import { CONSTANTS } from './constants';

export function showContextMenu(id) {
  // FIXME: DOESNT WORK FOR SONGS
  return {
    type: CONSTANTS.SHOW_CONTEXT_MENU,
    id: id
  }
}

export function hideContextMenu() {
  return {
    type: CONSTANTS.SHOW_CONTEXT_MENU,
    id: null
  }
}
