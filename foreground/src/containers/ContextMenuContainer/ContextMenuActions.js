import { CONSTANTS } from './constants';

export function showContextMenu(id, event) {
  // FIXME: DOESNT WORK FOR SONGS
  return {
    type: CONSTANTS.SHOW_CONTEXT_MENU,
    id: id,
    mousePosition: {x: event.pageX, y: event.pageY}
  }
}

export function hideContextMenu() {
  return {
    type: CONSTANTS.SHOW_CONTEXT_MENU,
    id: null
  }
}
