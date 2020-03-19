"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.arrayUpdate = exports.arrayDelete = exports.arrayMove = void 0;

const arrayMove = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

exports.arrayMove = arrayMove;

const arrayDelete = (list, index) => {
  const result = Array.from(list);
  result.splice(index, 1);
  return result;
};

exports.arrayDelete = arrayDelete;

const arrayUpdate = (list, index, newItem) => {
  const result = Array.from(list);
  result.splice(index, 1, newItem);
  return result;
};

exports.arrayUpdate = arrayUpdate;