export function getCurrentDay() {
  const now = new Date();
  const day = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  return day.getTime();
}

export function getDateString(time) {
  const date = new Date(time);
  const options = {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  };

  return date.toLocaleDateString(undefined, options);
}

export function getSecondsString(time) {
  const msPerS = 1000;
  const seconds = time / msPerS;
  
  return `${seconds.toFixed(1)} s`;
}

export function getMinutesString(time) {
  const msPerMin = 1000 * 60;
  const minutes = time / msPerMin;
  
  return `${minutes.toFixed(1)} min`;
}
