/* eslint-disable  no-underscore-dangle */
export default class EditableConfig {
  constructor(presets, getDisplayComponent, displayMwRender, getComponent, inputMwRender) {
    this.isEditingPropName = 'isEditing';
    this.presets = presets;
    this._getDisplayComponent = getDisplayComponent || (({ component }) => component);
    this._displayMwRender = displayMwRender;
    this._getComponent = getComponent || (({ component }) => component);
    this._inputMwRender = inputMwRender;
  }

  mwRender = (ctx) => {
    const {
      link, link: { hostProps },
    } = ctx;
    const middlewares = hostProps[this.isEditingPropName]
      ? this._inputMwRender
      : this._displayMwRender;

    const component = hostProps[this.isEditingPropName]
      ? this._getComponent(link) : this._getDisplayComponent(link);
    link.runMiddlewares(ctx, middlewares);
    ctx.nonProps.component = component;
  };
}
