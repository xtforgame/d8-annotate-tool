"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class RenderSession {
  constructor(parent, name, linker, host, options = {}) {
    _defineProperty(this, "parent", void 0);

    _defineProperty(this, "name", void 0);

    _defineProperty(this, "linker", void 0);

    _defineProperty(this, "host", void 0);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "prevRenderSession", void 0);

    this.parent = parent;
    this.name = name;
    this.linker = linker;
    this.host = host;
    this.state = 'rendering';
    this.prevRenderSession = options.prevRenderSession;
  }

  beforeRender() {
    if (this.host.props.rsBeforeRender) {
      this.host.props.rsBeforeRender(this);
    }
  }

  afterRender() {
    if (this.host.props.rsAfterRender) {
      this.host.props.rsAfterRender(this);
    }
  }

}

exports.default = RenderSession;