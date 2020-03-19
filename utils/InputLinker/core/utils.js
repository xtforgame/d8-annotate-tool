"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConverter = exports.mwDynamicNonPropsFilter = exports.toArray = void 0;

const toArray = value => Array.isArray(value) ? value : [value].filter(i => i);

exports.toArray = toArray;
const mwDynamicNonProps = ['component', 'shouldRender'];

const mwDynamicNonPropsFilter = (nonProps, dist = {}) => {
  mwDynamicNonProps.forEach(key => {
    if (key in nonProps) {
      dist[key] = nonProps[key];
    }
  });
  return dist;
};

exports.mwDynamicNonPropsFilter = mwDynamicNonPropsFilter;

const createConverter = converter => ({
  fromView: converter && converter.fromView || (([event]) => event.target.value),
  toView: converter && converter.toView || (value => value != null ? value : ''),
  toOutput: converter && converter.toOutput || (value => value),
  normalize: converter && converter.normalize || (v => v)
});

exports.createConverter = createConverter;