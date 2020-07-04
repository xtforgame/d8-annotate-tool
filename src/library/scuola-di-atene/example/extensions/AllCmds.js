/* eslint-disable no-underscore-dangle, no-param-reassign */
import SdaExtension from '../../SdaExtension';
import Connection from '../../shapes/Connection';
import Combination from '../../shapes/Combination';

export default class AllCmds extends SdaExtension {
  static $name = 'allCmds';

  static $type = 'extension';

  static $inject = ['builtin', 'commandManager', 'selectionManager', 'componentManager', 'portManager'];

  constructor({ paper }, commandManager, selectionManager, componentManager, portManager) {
    super();
    this.paper = paper;
    this.commandManager = commandManager;
    this.selectionManager = selectionManager;
    this.componentManager = componentManager;
    this.portManager = portManager;
  }

  // =====================

  _connect = ([port1, port2], ...args) => this.portManager.rawConnectFunc(port1, port2, ...args);

  _disconnect = ([connection], options = {}) => {
    const serialized = connection.constructor.serialize(this, connection);
    this.portManager.rawDisconnectFunc(connection);
    return serialized;
  }

  _redoConnect = ({
    isRedoing, state, callArgs,
  }) => {
    const { serialized } = state;
    const shape = Connection.deserialize(this.paper, serialized);
    return { ...state, shapeUid: shape.uid };
  };

  _undoConnect = ({ isUndoing, state }) => {
    const { shapeUid } = state;
    const shape = this.portManager.findConnectionByUid(shapeUid);

    const serialized = this._disconnect([shape]);
    return { ...state, serialized, shapeUid: undefined };
  };

  // =====================

  _addComponent = (...args) => this.componentManager.rawAddComponent(...args);

  _removeComponent = ([shape]) => {
    const serialized = shape.constructor.serialize(this, shape);
    this.componentManager.rawRemoveComponent([shape]);
    return serialized;
  }

  _redoAddComponent = ({
    isRedoing, state, callArgs,
  }) => {
    const { serialized } = state;
    const shape = serialized ? Combination.deserialize(this.paper, serialized) : this._addComponent(callArgs);
    // const shape = this._addComponent(callArgs);
    return { ...state, shapeUid: shape.uid };
  };

  _undoAddComponent = ({ isUndoing, state }) => {
    const { shapeUid } = state;
    const shape = this.paper.findShapeByUid(shapeUid);

    const serialized = this._removeComponent([shape]);
    return { ...state, serialized, shapeUid: undefined };
  };

  // ======================

  _moveComponent = ([shape, from, to]) => {
    shape.attr(to);
    this.paper.events.emit('onComponentMove', {
      shape, from, to,
    }, {});
    return { from, to, shape };
  };

  _redoMoveComponent = ({ state }) => {
    const { fromTo, shapeUid } = state;
    const shape = this.paper.findShapeByUid(shapeUid);
    this._moveComponent([shape, fromTo.from, fromTo.to]);
    return state;
  };

  _undoMoveComponent = ({ state }) => {
    const { fromTo, shapeUid } = state;
    const shape = this.paper.findShapeByUid(shapeUid);
    this._moveComponent([shape, fromTo.to, fromTo.from]);
    return state;
  };

  // ======================

  withNewSequence(...args) {
    return this.commandManager.withNewSequence(...args);
  }

  get cmds() {
    return this.commandManager.cmds;
  }

  setupCommands() {
    this.commandManager.addCommand('addComponent', (...callArgs) => {
      const result = this._addComponent(...callArgs);
      return {
        result,
        change: {
          state: { shapeUid: result.uid },
          redo: this._redoAddComponent,
          undo: this._undoAddComponent,
        },
      };
    });

    this.commandManager.addCommand('removeComponent', (...callArgs) => {
      const result = this._removeComponent(...callArgs);
      return {
        result,
        change: {
          state: { serialized: result },
          redo: this._undoAddComponent,
          undo: this._redoAddComponent,
        },
      };
    });

    this.commandManager.addCommand('moveComponent', (...callArgs) => {
      const result = this._moveComponent(...callArgs);
      const { from, to, shape } = result;
      return {
        result,
        change: {
          state: { fromTo: { from, to }, shapeUid: shape.uid },
          redo: this._redoMoveComponent,
          undo: this._undoMoveComponent,
        },
      };
    });

    this.commandManager.addCommand('connect', (...callArgs) => {
      const result = this._connect(...callArgs);
      return {
        result,
        change: {
          state: { shapeUid: result.uid },
          redo: this._redoConnect,
          undo: this._undoConnect,
        },
      };
    });

    this.commandManager.addCommand('disconnect', (...callArgs) => {
      const result = this._disconnect(...callArgs);
      return {
        result,
        change: {
          state: { serialized: result },
          redo: this._undoConnect,
          undo: this._redoConnect,
        },
      };
    });
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
