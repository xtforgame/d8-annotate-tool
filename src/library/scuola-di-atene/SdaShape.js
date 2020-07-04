/* eslint-disable no-underscore-dangle, no-param-reassign */
import {
  extraAttr,
} from './utils/attr-manipulate';

export const raphaelShapeEvents = [
  'click',
  'dblclick',
  'drag',
  'hover',
  'mousedown',
  'mousemove',
  'mouseout',
  'mouseover',
  'mouseup',
  'touchcancel',
  'touchend',
  'touchmove',
  'touchstart',
];

export default class SdaShape {
  static $type = 'empty';

  constructor(paper, uid, args, options = {}) {
    this.type = this.constructor.$type;
    this.paper = paper;
    this._uid = uid;
    this.extensions = this.paper.extensions;
    this.rphPaper = this.paper.rphPaper;
    this.ext = {};
    this.persistentData = {};
    this.options = options;
    this.createShape(args, options);
    this._exposeRaphaelEvents();
    if (options.id != null) {
      this.rphRef.id = options.id;
    }

    this.extraAttrs = {
      enabled: true,
    };
  }

  get id() {
    return this.rphRef.id;
  }

  get uid() {
    return this._uid;
  }

  get removed() {
    return this.rphRef.removed;
  }

  isPort() {
    return !!this.portType;
  }

  isConnection() {
    return !!this.connectionType;
  }

  _getAttrCallType = (name, value) => {
    if (name == null) {
      return {
        type: 'get',
        attrs: null,
      };
    }
    if (value == null) {
      if (typeof name === 'string') {
        return {
          type: 'get',
          attrs: name.split(/[, ]+/),
        };
      } else if (Array.isArray(name)) {
        return {
          type: 'get',
          attrs: [...name],
        };
      }
    }

    if (value != null) {
      return {
        type: 'set',
        attrs: { [name]: value },
      };
    } else if (name != null && !Array.isArray(name) && name === Object(name)) {
      return {
        type: 'set',
        attrs: { ...name },
      };
    }

    return {
      type: 'unknown',
    };
  };

  _isAReadOnlyAttrCall = (name, value) => this._getAttrCallType(name, value).type === 'get';

  _extraAttr(...args) {
    return extraAttr(this, ...args);
  }

  extraAttr(...args) {
    const [result] = this._extraAttr(...args);
    // console.log('this.extraAttrs :', this.extraAttrs);
    return result;
  }

  setEnabled(enabled = true) {
    this.extraAttr({ enabled });
  }

  isEnabled() {
    return !!this.extraAttr('enabled');
  }

  setSelected(selected = true) {
    this.extraAttr({ selected });
  }

  isSelected() {
    return !!this.extraAttr('selected');
  }

  setInvalid(invalid = true) {
    this.extraAttr({ invalid });
  }

  isInvalid() {
    return !!this.extraAttr('invalid');
  }

  createShape(args, options = {}) {
    this.rphRef = this.rphPaper.set();
  }

  _exposeRaphaelMethod = (methodName, options) => {
    this[methodName] = (...args) => {
      const result = this.rphRef[methodName](...args);
      if (result === this.rphRef) {
        return this;
      }
      return result;
    };
  }

  _exposeRaphaelEvent(eventName) {
    this[eventName] = (...args) => {
      this.rphRef[eventName](...args);
      return this;
    };

    this[`un${eventName}`] = (...args) => {
      this.rphRef[`un${eventName}`](...args);
      return this;
    };
  }

  _exposeRaphaelEvents(events = raphaelShapeEvents) {
    events.forEach(eventName => this._exposeRaphaelEvent(eventName));
  }

  init() {}

  // from Raphael js

  attr(...args) {
    const result = this.rphRef.attr(...args);
    if (!this._isAReadOnlyAttrCall(...args)) {
      return this;
    }
    return result;
  }

  show() {
    this.rphRef.show();
    return this;
  }

  hide() {
    this.rphRef.hide();
    return this;
  }

  getBBox() {
    return this.rphRef.getBBox();
  }

  toFront() {
    this.rphRef.toFront();
    return this;
  }

  toBack() {
    this.rphRef.toBack();
    return this;
  }

  insertAfter() {
    this.rphRef.insertAfter();
    return this;
  }

  insertBefore() {
    this.rphRef.insertBefore();
    return this;
  }

  remove(eventOptions = {}) {
    this.paper.events.emit('beforeShapeRemove', {
      shape: this,
    }, eventOptions);
    this.paper.removeShape(this);
    this.rphRef.remove();
  }
}
