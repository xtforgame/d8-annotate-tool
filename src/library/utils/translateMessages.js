export default function translateMessages(t, keys, values = {}) {
  const result = { ...values };
  if (Array.isArray(keys)) {
    keys.forEach((key) => {
      result[key] = t(key, {
        ...result,
      });
    });
    return result;
  }
  const key = keys;
  return t(key, values);
}
