"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EditableConfig {
  constructor(presets, getDisplayComponent, displayMwRender, getComponent, inputMwRender) {
    _defineProperty(this, "mwRender", ctx => {
      const {
        link,
        link: {
          hostProps
        }
      } = ctx;
      const middlewares = hostProps[this.isEditingPropName] ? this._inputMwRender : this._displayMwRender;
      const component = hostProps[this.isEditingPropName] ? this._getComponent(link) : this._getDisplayComponent(link);
      link.runMiddlewares(ctx, middlewares);
      ctx.nonProps.component = component;
    });

    this.isEditingPropName = 'isEditing';
    this.presets = presets;

    this._getDisplayComponent = getDisplayComponent || (({
      component
    }) => component);

    this._displayMwRender = displayMwRender;

    this._getComponent = getComponent || (({
      component
    }) => component);

    this._inputMwRender = inputMwRender;
  }

}

exports.default = EditableConfig;