import {
  ANSWER_QUESTION,
  INIT,
  PICK_QUESTION,
  START,
  STOP,
} from '../constants';

export function init(today, total) {
  return { type: INIT, today, total };
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

export function answerQuestion(value) {
  return { type: ANSWER_QUESTION, value };
}
