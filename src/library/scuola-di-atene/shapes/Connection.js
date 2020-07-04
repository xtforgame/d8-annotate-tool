/* eslint-disable no-underscore-dangle, no-nested-ternary, no-param-reassign */
import SdaShape from '../SdaShape';

const emptyPath = 'M0,0';

export default class Connection extends SdaShape {
  static $type = 'connection';

  static serialize = (paper, shape, options = {}) => {
    const {
      id, uid, persistentData,
    } = shape;
    const serialized = {
      id,
      uid,
      persistentData,
      attr: shape.attr(),
      extraAttr: shape.extraAttr(),
      port1: {
        target: shape.port1.owner.uid,
        portName: shape.port1.portName,
      },
      port2: {
        target: shape.port2.owner.uid,
        portName: shape.port2.portName,
      },
    };
    // console.log('serialized :', serialized);
    // paper.findShapeByUid(shape.port1.owner.uid);
    return serialized;
  }

  static deserialize = (paper, data, options = {}) => {
    const {
      uid,
      port1,
      port2,
    } = data;

    const target1 = paper.findShapeByUid(port1.target);
    const p1 = target1.portMap[port1.portName];
    const target2 = paper.findShapeByUid(port2.target);
    const p2 = target2.portMap[port2.portName];

    return paper.ext.portManager.rawConnectFunc(p1, p2, { uid });
  }

  createShape(ports = [], options = {}) {
    this.connectionType = 'unknown';

    this.resetPorts(ports);

    const path = emptyPath;
    this.rphRef = this.rphPaper.path(path);
    this.rphRefOuter = this.rphPaper.path(path);
  }

  _updateStyle() {
    const { enabled, invalid, selected } = this.extraAttrs;
    const theme = this.ext.themeProvider.getTheme();

    let stroke;
    if (!enabled) {
      ({ stroke } = theme.styles.portLines.type01.diabled);
    } else if (invalid) {
      ({ stroke } = theme.styles.portLines.type01.invalid);
    } else if (selected) {
      ({ stroke } = theme.styles.portLines.type01.selected);
    } else {
      ({ stroke } = theme.styles.portLines.type01.normal);
    }
    if (this.attr('stroke') !== stroke) {
      this.attr('stroke', stroke);
    }
    return this;
  }

  attr(...args) {
    const result = this.rphRef.attr(...args);
    const attrCallType = this._getAttrCallType(...args);
    if (attrCallType.type === 'set') {
      if ('path' in attrCallType.attrs) {
        this.rphRefOuter.attr('path', attrCallType.attrs.path);
        this.rphRef.attr({
          'arrow-end': 'classic-wide-long',
        });
      }
      return this;
    }
    return result;
  }

  extraAttr(...args) {
    const result = super.extraAttr(...args);
    if (!this._isAReadOnlyAttrCall(...args)) {
      this._updateStyle();
    }
    return result;
  }

  init() {
    this.manager = this.ext.portManager.getPortManager();
    const theme = this.ext.themeProvider.getTheme();
    this.rphRef.attr(theme.styles.portLines.type01.connected);
    this.rphRefOuter.attr(theme.styles.portLines.outer);
    this.rphRefOuter.attr('cursor', 'move');
    this._updateStyle();

    this.rphRefOuter.click(() => {
      // console.log('phRefOuter.click');
      this.paper.setSelectionByIds([this.id]);
      // this.manager.disconnect(this);
    });

    this.redraw();
  }

  toFront(...args) {
    this.rphRef.toFront(...args);
    this.rphRefOuter.toFront();
    return this;
  }

  remove() {
    if (this.ext.portManager && this.port1 && this.port2) {
      // currently, do nothing
      return this.ext.portManager.disconnect();
    }
    if (this.rphRefOuter) {
      this.rphRefOuter.remove();
      this.rphRefOuter = null;
    }
    return super.remove();
  }

  redraw(mode = 'simple', options = {}) {
    let path = emptyPath;
    if (this.port1 && this.port2) {
      path = this.manager.pathOptimizer.calcPath(this.port1, this.port2, mode, options);
    }

    // https://www.itread01.com/content/1547054665.html
    // http://www.voidcn.com/article/p-tzbfnwdy-da.html
    // this.rphRef.attr({
    //   stroke: 'red',
    //   'stroke-width': '2px',
    //   'arrow-end': 'classic-wide-long',
    // });
    // this.rphRef.node.attributes['marker-end'].value = 'url(#raphael-marker-endclassic-red)';

    // this.rphRefOuter.attr({
    //   stroke: 'blue',
    //   'stroke-width': '4px',
    //   'arrow-end': 'classic-wide-long',
    // });
    // this.rphRefOuter.node.attributes['marker-end'].value = 'url(#raphael-marker-endclassic-green)';
    return this.attr({ path });
  }

  resetPorts([port1, port2] = []) {
    this.port1 = null;
    this.port2 = null;
    this.ports = {};

    if (port1 && port1.uid) {
      this.port1 = port1;
      this.ports[port1.uid] = port1;
    }

    if (port2 && port2.uid) {
      this.port2 = port2;
      this.ports[port2.uid] = port2;
    }
  }
}
