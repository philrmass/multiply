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
  const maxTimes = 3;

  const questions = stats?.questions ?? {};
  const keys = Object.keys(questions);
  const averages = keys.map((key) => {
    const question = questions[key];
    const times = question.times.slice(0, maxTimes);

    const count = times.length || 1;
    const sum = times.reduce((sum, time) => sum + time, 0);
    const average = sum / count;

    return {
      question: key,
      average,
    };
  });

  const byReverseAverage = (a, b) => b.average - a.average;
  averages.sort(byReverseAverage);

  return averages;
}

export function getAverageTime(item) {
  const times = item.times ?? [];
  const count = times.length || 1;
  const sum = times.reduce((sum, time) => sum + time, 0);

  return sum / count;
}

export function getTotalTime(item) {
  const times = item.times ?? [];
  const sum = times.reduce((sum, time) => sum + time, 0);

  return sum;
}

export function getWrongPercent(item) {
  const wrongs = item.wrongs ?? [];
  const total = wrongs.length || 1;
  const sum = wrongs.reduce((sum, wrong) => sum + wrong, 0);

  return 100 * (sum / total);
}
