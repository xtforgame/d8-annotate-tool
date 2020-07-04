/* eslint-disable no-underscore-dangle, no-param-reassign */
import SdaExtension from '../../SdaExtension';
import componentSize from '../componentSize';

const compRectGroupName = 'compAndConn';

export default class ComponentManager extends SdaExtension {
  static $name = 'componentManager';

  static $type = 'extension';

  static $inject = ['builtin', 'selectionManager'];

  constructor({ paper }, selectionManager) {
    super();
    this.paper = paper;
    this.selectionManager = selectionManager;
  }

  addToComponentList(shape) {
    this.paper.ext.selectionManager.addSelectables(shape, compRectGroupName);
    this.paper.setSelectionByIds([shape.id]);
  }

  rawAddComponent = (
    [x, y, width = 80, height = 80, borderRadius = componentSize.borderRadius, configs = {}],
    options = {},
    eventOptions = {}
  ) => {
    const shape = this.paper.createComponent([x, y, width, height, borderRadius, configs], options, eventOptions);
    // this.paper.ext.boundaryHelper.applyBoundaryToShape(shape, 'move');
    this.paper.events.emit('onComponentCreate', {
      shape,
    }, eventOptions);
    this.addToComponentList(shape);
    return shape;
  }

  rawRemoveComponent = ([shape]) => {
    this.selectionManager.removeSelectables([shape], compRectGroupName);
    shape.remove();
  }

  // =======================================================

  init() {
  }

  createExtensionForShape(injectedResult, shape, options) {
    return {};
  }

  destroyExtensionForShape(injectedResult, shape, extensionForShape, options) {
  }

  destroy() {
  }
}
