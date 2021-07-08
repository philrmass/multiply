export function getAllQuestions() {
  const questions = [];

  for (let first = 2; first <= 12; first++) {
    for (let second = 2; second <= 12; second++) {
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

export function getHardQuestions(/*stats, count*/) {
  const questions = [];

  for (let first = 6; first <= 8; first++) {
    for (let second = 6; second <= 8; second++) {
      questions.push(createQuestion(first, second));
    }
  }

  return questions;
}
