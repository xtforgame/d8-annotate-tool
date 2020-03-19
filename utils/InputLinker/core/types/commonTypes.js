"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StateMode = exports.ExtraChildren = void 0;
const ExtraChildren = Symbol('ExtraChildren');
exports.ExtraChildren = ExtraChildren;
let StateMode;
exports.StateMode = StateMode;

(function (StateMode) {
  StateMode["State"] = "state";
  StateMode["Hook"] = "hook";
})(StateMode || (exports.StateMode = StateMode = {}));