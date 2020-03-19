export const overwrites = Symbol('overwrites');
export const defaults = Symbol('defaults');

export const normalizeValue = (d) => {
  const data = { ...d };
  if (data[defaults]) {
    Object.keys(data[defaults]).forEach((key) => {
      if (data[key] === undefined && data[defaults][key] !== undefined) {
        data[key] = data[defaults][key];
      }
    });
  }
  if (data[overwrites]) {
    Object.keys(data[overwrites]).forEach((key) => {
      data[key] = data[overwrites][key];
    });
  }
  return data;
};
