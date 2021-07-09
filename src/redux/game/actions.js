import {
  ANSWER_QUESTION,
  INIT,
  PICK_QUESTION,
  REPEAT_QUESTION,
  START,
  STOP,
  TOGGLE_STATS,
} from '../constants';

export function init(today) {
  return { type: INIT, today };
}
export function start() {
  return { type: START };
}

export function stop() {
  return { type: STOP };
}

export function pickQuestion() {
  return { type: PICK_QUESTION };
}

export function repeatQuestion() {
  return { type: REPEAT_QUESTION };
}

export function answerQuestion(value) {
  return { type: ANSWER_QUESTION, value };
}

export function toggleStats() {
  return { type: TOGGLE_STATS };
}
