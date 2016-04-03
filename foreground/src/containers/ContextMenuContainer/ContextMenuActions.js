import { CONSTANTS } from './constants';

export function showContextMenu(id, event) {
  // FIXME: DOESNT WORK FOR SONGS
  return {
    type: CONSTANTS.SHOW_CONTEXT_MENU,
    id: id,
    mousePosition: {x: event.pageX+5, y: event.pageY+5}
  }
}

export function hideContextMenu() {
  return {
    type: CONSTANTS.SHOW_CONTEXT_MENU,
    id: null
  }
}
