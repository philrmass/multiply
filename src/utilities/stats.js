function getDefaultDay(today, total, min) {
  return { today, total, min, times: [], wrongs: [] };
}

export function resetDay(stats, { today, total, min }) {
  const days = stats.days ?? {};
  const key = `${today}`;
  days[key] = getDefaultDay(today, total, min);

  const questions = stats.questions ?? {};

  return {
    days,
    questions,
  };
}

export function addAnswer(stats, { today, total, min, question, time, wrong }) {
  const days = stats.days ?? {};

  const key = `${today}`;
  const day = days[key] ?? getDefaultDay(today, total, min);
  day.times.push(time);
  day.wrongs.push(wrong);

  const questions = stats.questions ?? {};

  const ques = questions[question] ?? { question, times: [], wrongs: [] };
  ques.times.push(time);
  ques.wrongs.push(wrong);

  return {
    days: { ...days, [key]: day },
    questions: { ...questions, [question]: ques },
  };
}

export function getAverageTimes(stats) {
  //??? get averages and sort
  console.log('aves', stats);
}
