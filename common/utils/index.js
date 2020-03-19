"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaultToPromiseFunc = defaultToPromiseFunc;
exports.toSeqPromise = toSeqPromise;
exports.promiseReduce = promiseReduce;
exports.promiseWait = promiseWait;
exports.capitalizeFirstLetter = exports.toUnderscore = exports.toCamel = void 0;

function defaultToPromiseFunc(_, value) {
  return Promise.resolve(value);
}

function toSeqPromise(inArray, toPrmiseFunc = defaultToPromiseFunc) {
  return inArray.reduce((prev, curr, index, array) => prev.then(() => toPrmiseFunc(prev, curr, index, array)), Promise.resolve());
}

function promiseReduce(inArray, toPrmiseFunc = defaultToPromiseFunc, startValue) {
  return inArray.reduce((prev, curr, index, array) => prev.then(result => toPrmiseFunc(result, curr, index, array)), Promise.resolve(startValue));
}

function promiseWait(waitMillisec) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, waitMillisec);
  });
}

const toCamel = str => str.replace(/_([a-z])/g, g => g[1].toUpperCase());

exports.toCamel = toCamel;

const toUnderscore = str => str.replace(/([A-Z])/g, g => `_${g.toLowerCase()}`);

exports.toUnderscore = toUnderscore;

const capitalizeFirstLetter = str => str.charAt(0).toUpperCase() + str.slice(1);

exports.capitalizeFirstLetter = capitalizeFirstLetter;