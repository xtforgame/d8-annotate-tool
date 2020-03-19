"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = echo;

function echo(data, err) {
  return new Promise((resolve, reject) => {
    if (err) {
      return reject(err);
    }

    return resolve(data);
  });
}