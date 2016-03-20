import { CONSTANTS } from './constants';
import { CONSTANTS as SANDBOX_CONSTANTS } from '../../others/constants';

export function toggleShuffle() {
  return {
    type: CONSTANTS.TOGGLE_SHUFFLE
  }
}

export function toggleRepeat() {
  return {
    type: CONSTANTS.TOGGLE_REPEAT
  }
}
