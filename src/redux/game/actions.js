import {
  INIT,
  START,
} from '../constants';

export function init(today, total) {
  return { type: INIT, today, total };
}
export function start() {
  return { type: START };
}
