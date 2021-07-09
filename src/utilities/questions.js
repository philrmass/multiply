import { getAverageTimes } from './stats';

export function getAllQuestions() {
  const min = 4; //2;
  const max = 6; //12;
  const questions = [];

  for (let first = min; first <= max; first++) {
    for (let second = min; second <= max; second++) {
      questions.push(createQuestion(first, second));
    }
  }

  return questions;
}

export function pickQuestion(all) {
  const index = Math.floor(all.length * Math.random());
  const start = all.slice(0, index);
  const end = all.slice(index + 1);

  const question = all[index];
  const questions = [...start, ...end];

  return { question, questions };
}

export function createQuestion(first, second) {
  return `${first}_${second}`;
}

export function parseQuestion(question) {
  if (typeof question !== 'string') {
    return {};
  }

  const parts = question.split('_');
  const first = Number(parts[0]);
  const second = Number(parts[1]);

  return { first, second };
}

export function getHardQuestions(stats, count) {
  const averages = getAverageTimes(stats);
  const selected = averages.slice(0, count);
  const questions = selected.map((item) => item.question);

  return questions;
}
