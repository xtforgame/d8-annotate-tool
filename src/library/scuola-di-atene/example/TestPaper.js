/* eslint-disable no-underscore-dangle, no-param-reassign */
import Combination from '../shapes/Combination';
import Connection from '../shapes/Connection';
import Port from '../shapes/Port';

import Builtin from '../extensions/Builtin';
import CommandManager from '../extensions/CommandManager';
import ThemeProvider from '../extensions/ThemeProvider';
import BoundaryHelper from '../extensions/BoundaryHelper';
import BackgroundRect from '../extensions/BackgroundRect';
import SelectionManager from '../extensions/SelectionManager';
import RectDrawer from '../extensions/RectDrawer';
import RectSelection from '../extensions/RectSelection';
import RectMoveAndResize from '../extensions/RectMoveAndResize';
import PortManager from '../extensions/PortManager';
import OptionButton from '../extensions/OptionButton';

import ComponentManager from './extensions/ComponentManager';
import AllCmds from './extensions/AllCmds';

import SdaPaper from '../SdaPaper';
// import componentSize from './componentSize';

const compRectGroupName = 'compAndConn';

export default class TestPaper extends SdaPaper {
  init() {
    super.init();
    this.events.addGlobalListener(this.globalListener2);
    this.selection = [];

    this.ext.allCmds.setupCommands();

    // for test
    this.ext.commandManager.events.addListener('onSequenceChange', (info) => {
      this.events.emit('onCommandSequenceChange', info);
    });

    this.ext.commandManager.events.addListener('onCommandRun', (commandResult) => {
      // setTimeout(() => {
      //   console.log('=============================onCommandRun=============================');
      //   console.log('commandResult :', commandResult);
      //   this.serialize();
      // }, 0);
    });

    this.ext.boundaryHelper.setBoundary();

    // const rectDrawer = this.extensions.get('rectDrawer');
    this.ext.rectDrawer.enable(true, {
      createRect: this.createDrawerRect,
      dragmove: () => {
        this.ext.boundaryHelper.applyBoundaryToShape(this.ext.rectDrawer.drawingBox, 'resize');
      },
      dragend: () => {
        const shape = this.ext.rectDrawer.drawingBox;

        if (shape.isInvalid()) {
          shape.remove();
          this.ext.rectDrawer.drawingBox = null;
          return;
        }
        if (shape.type === 'combination') {
          this.ext.componentManager.addToComponentList(shape);
        }
      },
    });

    this.ext.selectionManager.createGruop(compRectGroupName, {
      getSelectables: this.getCompnents,
    });
    this.ext.selectionManager.setCurrentGroup(compRectGroupName);
    this.setSelectionByIds();

    // setTimeout(() => {
    //   console.log('this.ext.rectDrawer.enable(false)');
    //   this.ext.rectDrawer.enable(false);
    //   this.ext.rectSelection.enable(true, {
    //     getSelectables: this.getCompnents,
    //     getSelection: this.getSelection,
    //     setSelection: this.setSelection,
    //   });
    // }, 10000);
    // this.ext.rectDrawer.enable(false);
    // this.ext.rectSelection.enable(true, {
    //   getSelectables: this.getCompnents,
    //   getSelection: this.getSelection,
    //   setSelection: this.setSelection,
    // });
  }

  globalListener2 = (eventName, data, ...args) => {
    if (eventName === 'beforeShapeRemove' && data && data.shape && data.shape.type === 'combination') {
      this.events.emit('beforeComponentRemove', data, ...args);
    }
  }

  addComponent = (...args) => this.ext.allCmds.cmds.addComponent(args).result;

  removeComponent = (shape, ...args) => {
    // const serializedConnections = Object.keys(shape.getTotalConnections())
    //   .map(uid => this.ext.portManager.findConnectionByUid(uid))
    //   .map(c => c.constructor.serialize(this, c))
    //   .reduce((cMap, serializedC) => ({ ...cMap, [serializedC.uid]: serializedC }), {});
    // console.log('serializedConnections :', serializedConnections);

    let retval;
    this.ext.allCmds.withNewSequence('removeComponent', (sequence) => {
      Object.values(shape.getTotalConnections()).forEach((c) => {
        this.ext.allCmds.cmds.disconnect([c], { sequence });
      });
      const { result } = this.ext.allCmds.cmds.removeComponent([shape, ...args], { sequence });
      retval = result;
    });

    return retval;
  };

  // createComponent = (...createArgs) => this.combination(...createArgs).attr('fill', 'transparent');
  createComponent = (...createArgs) => this.combination(...createArgs);

  // createDrawerRect = (...createArgs) => this.combination(...createArgs).attr('fill', 'transparent');
  createDrawerRect = (...createArgs) => this.combination(...createArgs);

  setupExtensions() {
    this.extensionClasses = [
      Builtin,
      CommandManager,
      ThemeProvider,
      BoundaryHelper,
      BackgroundRect,
      SelectionManager,
      RectDrawer,
      RectSelection,
      RectMoveAndResize,
      PortManager,
      OptionButton,
      ComponentManager,
      AllCmds,
    ];
    this.extensions.register(this.extensionClasses);
    this.extensions.digest({
      onCreate: ({ result, classInfo: { name } }) => {
        this.ext[name] = result;
      },
      appendArgs: {
        builtin: [this],
        selectionManager: [{}],
        portManager: [{
          createConnectFunc: rawConnectFunc => (p1, p2, options = {}) => {
            if (options.byDragging) {
              // from user
              return this.ext.allCmds.cmds.connect([p1, p2, options]).result;
            }
            // programatically
            return rawConnectFunc(p1, p2, options);
          },
          createDisconnectFunc: rawDisconnectFunc => (connection, options = {}) => {
            if (options.byDragging) {
              // from user
              return this.ext.allCmds.cmds.disconnect([connection, options]).result;
            }
            // programatically
            return rawDisconnectFunc(connection, options);
          },
        }],
      },
    });
    this.extensions.run('init', []);
  }

  combination(args, options = {}, eventOptions = {}) {
    console.log('args, options, eventOptions :', args, options, eventOptions);
    const shape = new Combination(this, options.uid || this.createUID(), args, options);
    this.setupExtensionsForShape(shape);

    shape.ext.rectMoveAndResize.enable(true, true, {
      dragstart: () => {
        if (!this.isSelected(shape)) {
          this.setSelectionByIds([shape.id]);
        }
      },
      dragmove: () => {
        this.ext.boundaryHelper.applyBoundaryToShape(shape, shape.ext.rectMoveAndResize.mode === 'move' ? 'move' : 'resize');
        this.ext.optionButton.updateOptionButton(shape);
      },
      beforedragend: (ext) => {
        if (shape.isInvalid()) {
          shape.attr(ext.originRect);
        } else if (ext.mode === 'move') {
          if (ext.moved) {
            this.ext.allCmds.cmds.moveComponent([shape, ext.originRect, shape.attr(['x', 'y'])]);
          } else {
            // may moved, but the distance is too short, abort the movement
            shape.attr(ext.originRect);
          }
        }
      },
      dragend: () => {
        this.ext.portManager.redrawAllConnections();
      },
    });
    this.events.emit('onShapeCreate', {
      shape,
    }, eventOptions);
    return shape;
  }

  connection(args, options = {}) {
    const shape = new Connection(this, options.uid || this.createUID(), args, options);
    this.setupExtensionsForShape(shape, { managed: false });
    return shape;
  }

  port(args, options = {}) {
    const shape = new Port(this, options.uid || this.createUID(), args, options);
    this.setupExtensionsForShape(shape, { managed: false });
    shape.ext.portManager.enable(true, {
      dragstart: () => {
      },
      dragmove: (...args) => {
        this.ext.boundaryHelper.applyBoundaryToShape(shape, shape.ext.rectMoveAndResize.mode === 'move' ? 'move' : 'resize');
      },
      beforedragend: (ext) => {
      },
      dragend: () => {},
    });
    return shape;
  }

  getSelection = (...args) => this.ext.selectionManager.getSelection(...args);

  setSelection = (...args) => this.ext.selectionManager.setSelection(...args);

  setSelectionByIds = (...args) => this.ext.selectionManager.setSelectionByIds(...args);

  isSelected = (...args) => this.ext.selectionManager.isSelected(...args);

  setSize(width, height, eventOptions = {}) {
    this.rphPaper.setSize(width, height);
    this.internalEvents.emit('onSizeChange', { width, height }, eventOptions);
    this.ext.boundaryHelper.setBoundary(0, 0, width, height);
  }

  undo(...args) {
    this.ext.commandManager.undo(...args);
  }

  redo(...args) {
    this.ext.commandManager.redo(...args);
  }

  setCommandToIndex(...args) {
    this.ext.commandManager.setCommandToIndex(...args);
  }

  serialize() {
    const compnents = this.getCompnents()
      .filter(s => s.type === 'combination')
      .map(s => s.constructor.serialize(this, s));

    const connections = this.ext.portManager.getConnections()
      .map(s => s.constructor.serialize(this, s));

    const serialized = {
      compnents,
      connections,
    };

    // this.deserialize(serialized);
    return serialized;
  }

  deserialize(serializedData) {
    this.ext.portManager.getConnections()
      .forEach(s => s.remove());

    this.getCompnents()
      .filter(s => s.type === 'combination')
      .forEach((s) => {
        this.ext.componentManager.rawRemoveComponent([s]);
      });

    serializedData.compnents.map(serialized => Combination.deserialize(this, serialized));
    serializedData.connections.map(serialized => Connection.deserialize(this, serialized));
  }

  importComponents = components => components.map(component => this.addComponent(component));

  getCompnents = () => this.ext.selectionManager.getSelectables(compRectGroupName);

  _deleteShape(shape) {
    if (shape.type === 'combination') {
      this.removeComponent(shape);
    } else if (shape.type === 'connection') {
      this.ext.allCmds.cmds.disconnect([shape]);
    } else {
      this.ext.selectionManager.removeSelectables([shape], compRectGroupName);
      shape.remove();
    }
  }

  deleteId(id) {
    const shape = this.getCompnents().find(shape => shape.id === id);
    if (shape) {
      this._deleteShape(shape);
    }
  }

  clearCompnents() {
    const allCompnents = this.getCompnents();
    allCompnents.map(shape => this._deleteShape(shape));
  }

  remove() {
    this.events.removeGlobalListener(this.globalListener2);
    super.remove();
  }
}
