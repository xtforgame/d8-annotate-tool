/* eslint-disable no-underscore-dangle, no-param-reassign */
const R = Raphael; // eslint-disable-line no-undef
const separator = /[, ]+/;
const hasOwnProperty = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

export const attr = (shape, name, value) => {
  if (shape.removed) {
    return shape;
  }

  // read all attrs
  if (name == null) {
    const res = {};
    Object.keys(shape.attrs)
    .filter(a => hasOwnProperty(shape.attrs, a))
    .forEach((a) => {
      res[a] = shape.attrs[a];
    });

    if (res.gradient && res.fill === 'none' && (res.fill = res.gradient)) { // eslint-disable-line no-cond-assign
      delete res.gradient;
    }

    res.transform = shape._.transform;
    return res;
  }

  // read
  if (value == null && R.is(name, 'string')) {
    if (name === 'fill' && shape.attrs.fill === 'none' && shape.attrs.gradient) {
      return shape.attrs.gradient;
    }
    if (name === 'transform') {
      return shape._.transform;
    }
    const names = name.split(separator);
    const out = {};
    const ii = names.length;
    for (let i = 0; i < ii; i++) {
      name = names[i];
      if (name in shape.attrs) {
        out[name] = shape.attrs[name];
      } else if (R.is(shape.paper.customAttributes[name], 'function')) {
        out[name] = shape.paper.customAttributes[name].def;
      } else {
        out[name] = R._availableAttrs[name];
      }
    }
    return ii - 1 ? out : out[names[0]];
  }
  if (value == null && R.is(name, 'array')) {
    const out = {};
    const ii = name.length;
    for (let i = 0; i < ii; i++) {
      out[name[i]] = shape.attr(name[i]);
    }
    return out;
  }

  // set
  let params = {};
  if (value != null) {
    params[name] = value;
  } else if (name != null && R.is(name, 'object')) {
    params = name;
  }
  Object.keys(params)
  .forEach((key) => {
    eve(`attr.${key}.${shape.id}`, shape, params[key]); // eslint-disable-line no-undef
  });

  Object.keys(shape.paper.customAttributes)
  .forEach((key) => {
    if (hasOwnProperty(shape.paper.customAttributes, key) && hasOwnProperty(params, key) && R.is(shape.paper.customAttributes[key], 'function')) {
      const par = shape.paper.customAttributes[key].apply(shape, [].concat(params[key]));
      shape.attrs[key] = params[key];

      Object.keys(par)
      .forEach((subkey) => {
        if (hasOwnProperty(par, subkey)) {
          params[subkey] = par[subkey];
        }
      });
    }
  });

  // setFillAndStroke(shape, params);
  return shape;
};


export const x = 1;
