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
