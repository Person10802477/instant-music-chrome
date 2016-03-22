import { CONSTANTS as SANDBOX_CONSTANTS } from '../../others/constants';

export function setVideoSize(width, height) {
  return {
    type: SANDBOX_CONSTANTS.SET_VIDEO_SIZE,
    width: width,
    height: height
  }
}

export function webviewReady() {
  return {
    type: SANDBOX_CONSTANTS.WEBVIEW_READY
  }
}
