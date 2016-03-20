import { CONSTANTS as SANDBOX_CONSTANTS } from '../../others/constants';

export function currentVolume(state = 100, action) {
  switch (action.type) {
    case SANDBOX_CONSTANTS.SET_VOLUME:
      return action.volume;
    default:
      return state;
  }
}
