/* eslint-disable no-nested-ternary, no-param-reassign */
/* eslint-disable no-underscore-dangle, object-curly-newline */
import SdaExtension from '../SdaExtension';
import SdaShapeExtension from '../SdaShapeExtension';
import { getClientPos } from '../utils/dom-manipulate';
import PathOptimizerT1 from '../utils/PathOptimizerT1';

const oppositeSide = {
  move: 'move',
};

const getPointFuncs = {
  move: () => ({}),
};

const getPos = (type, rect) => {
  const func = getPointFuncs[type] || (() => ({}));
  return func(rect);
};

const getFixedPoint = (type, rect) => {
  const func = getPointFuncs[oppositeSide[type]] || (() => ({}));
  return func(rect);
};

class PortBehavior extends SdaShapeExtension {
  constructor(manager, port) {
    super();
    this.manager = manager;
    this.paper = this.manager.paper;
    this.themeProvider = this.manager.themeProvider;
    this.rphPaper = this.paper.rphPaper;
    this.rphPaperElem = this.paper.rphPaperElem;

    this.port = port;

    this.mode = null;

    this.isDraggable = false;
    this.reset();
  }

  reset() {
    if (this.line) {
      this.line.remove();
      this.line = null;
    }
    this.originRect = {
      x: 0,
      y: 0,
    };
    this.startPos = {
      x: 0,
      y: 0,
    };
    this.fixedPos = {
      x: 0,
      y: 0,
    };
    this.dragging = false;
  }

  calcDragType = ({ mouseX, mouseY }) => (this.isDraggable && this.port.isConnectable() ? 'move' : 'unset');

  _dragstart(x, y, event) {
    const dragType = this.calcDragType({
      mouseX: x,
      mouseY: y,
    });
    this.setMode(dragType);
    // Save some starting values
    this.approachingPort = null;
    const theme = this.themeProvider.getTheme();
    this.line = this.rphPaper.path(`M${x},${y}L${x},${y}`);
    this.line.attr(theme.styles.portLines.type01.dragging);
    this.port.setConnecting();
    this.manager.updateAccepting(this.port);

    this.originRect = this.port.getPortPosition();
    this.startPos = getPos(this.mode, this.originRect);
    this.fixedPos = getFixedPoint(this.mode, this.originRect);
    this.dragging = true;
  }

  dragstart = (x, y, event) => {
    this._dragstart(x, y, event);
    this.callbacks.dragstart(x, y, event);
  };

  _dragmove(dx, dy, x, y, event) {
    this.port.attr('cursor', 'unset');
    if (this.mode === 'move') {
      // return this.port.setPortPosition({
      //   x: this.originRect.x + dx,
      //   y: this.originRect.y + dy,
      // });
      const offset = getClientPos(this.rphPaperElem);
      let relativeX = x - offset.left;
      let relativeY = y - offset.top;

      ([{
        x: relativeX,
        y: relativeY,
      }, this.approachingPort] = this.manager.updateApproaching(this.port, relativeX, relativeY));

      this.line.attr({
        path: `M${this.originRect.x},${this.originRect.y}L${relativeX},${relativeY}`,
      });
    }

    return this.port;
  }

  dragmove = (dx, dy, x, y, event) => {
    this._dragmove(dx, dy, x, y, event);
    this.callbacks.dragmove(dx, dy, x, y, event);
  };

  _dragend() {
    if (this.approachingPort) {
      this.manager.connect(this.port, this.approachingPort, { byDragging: true });
    }
    this.approachingPort = null;
    this.port.setConnecting(false);
    this.manager.resetPortState();
    this.reset();
  }

  dragend = (event) => {
    this.callbacks.beforedragend(this, event);
    this._dragend(event);
    this.callbacks.dragend(event);
  };

  setMode = (mode) => {
    this.port.attr('cursor', mode);
    this.mode = mode;
  }

  _mousemove(e, mouseX, mouseY) {
    // Don't change cursor during a drag operation
    if (this.dragging === true) {
      return;
    }

    const dragType = this.calcDragType({
      mouseX,
      mouseY,
    });

    this.setMode(dragType);
  }

  mousemove = (e, mouseX, mouseY) => {
    this._mousemove(e, mouseX, mouseY);
    this.callbacks.mousemove(e, mouseX, mouseY);
  };

  enable(enableDrag = true, cbs = {}) {
    if (this.isDraggable) {
      // remove previous events (not really necessary)
      this.port.unmousemove();
      this.port.undrag();
    }

    if (!enableDrag) {
      // disable
      return;
    }

    this.isDraggable = enableDrag;

    this.callbacks = {
      dragstart: (x, y, event) => { },
      dragmove: (dx, dy, x, y, event) => { },
      beforedragend: (myRef, event) => {},
      dragend: (event) => { },
      mousemove: (e, mouseX, mouseY) => { },
      ...cbs,
    };

    // Attach "Mouse Over" handler to rectangle
    this.port.mousemove(this.mousemove);

    // Attach "Drag" handlers to rectangle
    this.port.drag(this.dragmove, this.dragstart, this.dragend);
  }

  disconnect(connection) {
    return this.manager.disconnect(connection);
  }

  destroy() {
    this.enable(false);
  }
}

class ConnectionBehavior extends SdaShapeExtension {
  constructor(manager, connection) {
    super();
    this.manager = manager;
    this.paper = this.manager.paper;
    this.themeProvider = this.manager.themeProvider;
    this.rphPaper = this.paper.rphPaper;
    this.rphPaperElem = this.paper.rphPaperElem;

    this.connection = connection;
  }

  getPortManager() {
    return this.manager;
  }

  disconnect() {
    return this.manager.disconnect(this.connection);
  }

  destroy() {
  }
}

const compRectGroupName = 'compAndConn';

export default class PortManager extends SdaExtension {
  static $name = 'portManager';

  static $type = 'extension';

  static $inject = ['builtin', 'themeProvider', 'selectionManager'];

  static $funcDeps = {
    createExtensionForShape: ['themeProvider'],
  };

  constructor({ paper }, themeProvider, selectionManager, options) {
    super();
    this.paper = paper;
    this.rphPaper = this.paper.rphPaper;
    this.themeProvider = themeProvider;
    this.selectionManager = selectionManager;
    this.portMap = {};
    this.connectionMap = {};
    this.pathOptimizer = new PathOptimizerT1(this);
    this.connect = options.createConnectFunc
      ? options.createConnectFunc(this.rawConnectFunc)
      : this.rawConnectFunc;

    this.disconnect = options.createDisconnectFunc
      ? options.createDisconnectFunc(this.rawDisconnectFunc)
      : this.rawDisconnectFunc;
  }

  findPortByUid(uid) {
    return this.portMap[uid];
  }

  findConnectionByUid(uid) {
    return this.connectionMap[uid];
  }

  getPorts = () => Object.values(this.portMap);

  getConnections = () => Object.values(this.connectionMap);

  rawConnectFunc = (port1, port2, options = {}, eventOptions = {}) => {
    const connection = this.paper.connection([port1, port2], options);
    this.selectionManager.addSelectables(connection, compRectGroupName);

    this.connectionMap[connection.uid] = connection;
    port1.addConnection(connection);
    port2.addConnection(connection);
    this.redrawAllConnections();
    this.paper.events.emit('onPortConnect', {
      port1,
      port2,
      connection,
    }, eventOptions);
    return connection;
  }

  rawDisconnectFunc = (connection, eventOptions = {}) => {
    this.paper.events.emit('beforePortDisconnect', {
      port1: connection.port1,
      port2: connection.port2,
      connection,
    }, eventOptions);
    connection.port1.removeConnection(connection.uid);
    connection.port2.removeConnection(connection.uid);
    this.selectionManager.removeSelectables(connection, compRectGroupName);
    connection.resetPorts();
    connection.remove();
    if (this.connectionMap[connection.uid]) {
      delete this.connectionMap[connection.uid];
    }
  }

  redrawAllConnections() {
    return this.pathOptimizer.redrawAllConnections();
  }

  resetPortState() {
    this.approachingPort = null;
    this.getPorts()
    .forEach((p) => {
      p.setAccepting(false);
      p.setApproaching(false);
      p.setConnecting(false);
    });
  }

  updateAccepting(port, setAccepting = true) {
    return this.getPorts()
    .filter(p => p !== port && p.isConnectable())
    .filter(p => p.canAccept(port))
    .map((p) => {
      if (setAccepting) {
        p.setAccepting(true);
      }
      return p;
    });
  }

  _calcDist(pos1, pos2) {
    const dx = pos1.x - pos2.x;
    const dy = pos1.y - pos2.y;
    return (dx * dx) + (dy * dy);
  }

  updateApproaching(port, relativeX, relativeY) {
    const originalPos = {
      x: relativeX,
      y: relativeY,
    };
    let modifiedPos = originalPos;
    let minDist = 10000;
    let approachingPort;
    this.updateAccepting(port, false)
    .forEach((p) => {
      const portPos = p.getPortPosition();
      const dist = this._calcDist(portPos, originalPos);
      if (dist < 200 && dist < minDist) {
        minDist = dist;
        approachingPort = p;
        modifiedPos = portPos;
      }
    });

    if (this.approachingPort) {
      this.approachingPort.setApproaching(false);
      this.approachingPort.setAccepting(true);
    }

    if (approachingPort) {
      approachingPort.setApproaching(true);
    }

    this.approachingPort = approachingPort;

    return [modifiedPos, approachingPort];
  }

  createExtensionForShape(injectedResult, shape, options) {
    if (shape.isPort()) {
      this.portMap[shape.uid] = shape;
      return new PortBehavior(this, shape, options);
    } else if (shape.isConnection()) {
      this.connectionMap[shape.uid] = shape;
      return new ConnectionBehavior(this, shape, options);
    }

    return null;
  }

  destroyExtensionForShape(injectedResult, shape, extensionForShape, options) {
    if (shape) {
      delete this.portMap[shape.uid];
    }
    // console.log('extensionForShape :', extensionForShape);
    return null;
  }
}
