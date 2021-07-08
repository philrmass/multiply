export function saveItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function loadItem(key, defaultValue) {
  const str = localStorage.getItem(key);

  try {
    const value = JSON.parse(str);
    return value ?? defaultValue;
  } catch (err) {
    return defaultValue;
  }
}
