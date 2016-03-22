import { CONSTANTS as SANDBOX_CONSTANTS } from '../../others/constants';

export function videoSize(state = { width: 300, height: 200 }, action) {
  switch (action.type) {
    case SANDBOX_CONSTANTS.SET_VIDEO_SIZE:
      return { width: action.width, height: action.height };
    default:
      return state;
  }
}

export function isWebviewReady(state = false, action) {
  switch (action.type) {
    case SANDBOX_CONSTANTS.WEBVIEW_READY:
      return true;
    default:
      return state;
  }
}
