/* eslint-disable no-underscore-dangle, no-param-reassign */
const separator = /[, ]+/;

// return: [result, attrsSet]
export const extraAttr = (shape, name, value) => {
  if (shape.removed) {
    return [shape];
  }

  // read all extraAttrs
  if (name == null) {
    const res = {};
    Object.keys(shape.extraAttrs)
    .forEach((a) => {
      res[a] = shape.extraAttrs[a];
    });
    return [res];
  }

  // read
  if (value == null && typeof name === 'string') {
    const names = name.split(separator);
    const out = {};
    const ii = names.length;
    for (let i = 0; i < ii; i++) {
      name = names[i];
      if (name in shape.extraAttrs) {
        out[name] = shape.extraAttrs[name];
      }
    }
    return [ii - 1 ? out : out[names[0]]];
  }
  if (value == null && Array.isArray(value)) {
    const out = {};
    const ii = name.length;
    for (let i = 0; i < ii; i++) {
      out[name[i]] = shape.extraAttr(name[i]);
    }
    return [out];
  }

  // set
  let params = {};
  if (value != null) {
    params[name] = value;
  } else if (name != null && name === Object(name)) {
    params = name;
  }
  // Object.keys(params)
  // .forEach((key) => {
  //   eve(`extraAttr.${key}.${shape.id}`, shape, params[key]); // eslint-disable-line no-undef
  // });

  Object.keys(params)
  .forEach((key) => {
    shape.extraAttrs[key] = params[key]; // eslint-disable-line no-undef
  });

  return [shape, params];
};


export const x = 1;
