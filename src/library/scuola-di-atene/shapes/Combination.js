/* eslint-disable no-underscore-dangle, no-nested-ternary, no-param-reassign */
import SdaShape from '../SdaShape';
import {
  addNumberOrPercent,
} from '../utils/helperFunctions';
import mainIconSize from '../utils/mainIconSize';

const rectMinSize = 8;
const isShapeValid = (shape) => {
  const { width, height } = shape.attr(['width', 'height']);
  return (width >= rectMinSize && height >= rectMinSize);
};

export default class Combination extends SdaShape {
  static $type = 'combination';

  static serialize = (paper, shape, options = {}) => {
    // console.log('shape.ports :', shape.ports);
    const portConnMap = Object.keys(shape.portMap)
    .map((k) => {
      const { connectionMap } = shape.portMap[k];
      const connections = Object.keys(connectionMap);
      if (connections.length > 0) {
        // connections.forEach((c) => {
        //   connectionMap[c].constructor.serialize(paper, connectionMap[c]);
        // });
        return { port: k, connections };
      }
      return null;
    })
    .filter(r => r)
    .reduce((pcMap, portConn) => ({ ...pcMap, [portConn.port]: portConn.connections }), {});

    // // may not needed
    // const totalConnections = Object.keys(shape.getTotalConnections());

    // const serializedConnections = totalConnections.map(k => totalConnectionMap[k])
    // .map(c => c.constructor.serialize(paper, c))
    // .reduce((cMap, serializedC) => ({ ...cMap, [serializedC.uid]: serializedC }), {});

    const {
      id, uid, persistentData, configs,
    } = shape;
    const serialized = {
      id,
      uid,
      persistentData,
      configs,
      attr: shape.attr(),
      extraAttr: shape.extraAttr(),
      portConnMap,
      // totalConnections,
    };
    // console.log('serialized :', serialized);
    return serialized;
  }

  static deserialize = (paper, data, options = {}) => {
    const {
      uid,
      attr: {
        x, y, width, height, rx,
      },
      configs,
    } = data;
    return paper.ext.componentManager.rawAddComponent(
      [x, y, width, height, rx, configs],
      { uid }
    );
  }

  createShape([x, y, _width, _height, borderRadius, configs = {}], options) {
    this._configs = configs;
    const width = configs.width || _width;
    const height = configs.height || _height;
    this.rphRef = this.rphPaper.rect(x, y, width, height, borderRadius);
    this.ports = [];
    this.portMap = {};

    this.attr('fill', 'transparent');

    if (this._configs.mainIcon) {
      this.mainIcon = this.rphPaper.rect(x, y, Math.min(width, mainIconSize.width), Math.min(height, mainIconSize.height), Math.min(borderRadius, mainIconSize.borderRadius));
      this.mainIcon.attr({
        'stroke-width': 0,
        fill: `url(${this._configs.mainIcon})`,
      });
    }
  }

  get configs() {
    return this._configs;
  }

  getTotalConnections = () => Object.keys(this.portMap)
  .reduce(
    (totalConnectionMap, k) => (
      { ...totalConnectionMap, ...this.portMap[k].connectionMap }
    ), {}
  );

  transformByLayoutOrientation(array) {
    if (this.paper.layoutOrientation === 'rtl') {
      return array;
    }
    return [array[1], array[0]];
  }

  init() {
    // console.log('this._configs :', this._configs);
    if (this._configs.portGroups) {
      if (this._configs.portGroups.ins) {
        this._configs.portGroups.ins.map((port, i, a) => this.addPort(port.name, {
          portType: 'in',
          portIoType: 'in',
          direction: this.transformByLayoutOrientation([-1, 0]),
          positionData: this.transformByLayoutOrientation([0, `${100 / (a.length + 1) * (i + 1)}%`]),
          accept: { byPortTypes: ['out'] },
        }));
      }
      if (this._configs.portGroups.outs) {
        this._configs.portGroups.outs.map((port, i, a) => this.addPort(port.name, {
          portType: 'out',
          portIoType: 'out',
          direction: this.transformByLayoutOrientation([1, 0]),
          positionData: this.transformByLayoutOrientation(['100%', `${100 / (a.length + 1) * (i + 1)}%`]),
          accept: { byPortTypes: ['in'] },
        }));
      }
      if (this._configs.portGroups.parents) {
        this._configs.portGroups.parents.map((port, i, a) => this.addPort(port.name, {
          portType: 'parent',
          direction: this.transformByLayoutOrientation([0, -1]),
          positionData: this.transformByLayoutOrientation([`${100 / (a.length + 1) * (i + 1)}%`, 0]),
          accept: { byPortTypes: ['child'], excludeOwner: true },
        }));
      }
      if (this._configs.portGroups.children) {
        this._configs.portGroups.children.map((port, i, a) => this.addPort(port.name, {
          portType: 'child',
          direction: this.transformByLayoutOrientation([0, 1]),
          positionData: this.transformByLayoutOrientation([`${100 / (a.length + 1) * (i + 1)}%`, '100%']),
          accept: { byPortTypes: ['parent'], excludeOwner: true },
        }));
      }
    } else {
      this.addPort('left1', {
        direction: this.transformByLayoutOrientation([-1, 0]),
        positionData: this.transformByLayoutOrientation([0, '25%']),
      });
      this.addPort('left2', {
        direction: this.transformByLayoutOrientation([-1, 0]),
        positionData: this.transformByLayoutOrientation([0, '50%']),
      });
      this.addPort('left3', {
        direction: this.transformByLayoutOrientation([-1, 0]),
        positionData: this.transformByLayoutOrientation([0, '75%']),
      });
      this.addPort('right1', {
        direction: this.transformByLayoutOrientation([1, 0]),
        positionData: this.transformByLayoutOrientation(['100%', '33.3%']),
      });
      this.addPort('right2', {
        direction: this.transformByLayoutOrientation([1, 0]),
        positionData: this.transformByLayoutOrientation(['100%', '66.6%']),
      });
    }
    this._updateStyle();
    this._updateChildren();
    this.setInvalid(!isShapeValid(this));
  }

  addPort(portName, options = {}) {
    const theme = this.ext.themeProvider.getTheme();
    const port = this.paper.port([this, portName], options)
    .attr(theme.styles.port);
    this.ports.push(port);
    this.portMap[portName] = port;
    return port;
  }

  _updateStyle() {
    const { enabled, invalid, selected } = this.extraAttrs;
    const theme = this.ext.themeProvider.getTheme();

    let stroke;
    let strokeWidth;
    if (!enabled) {
      ({ stroke } = theme.styles.diabled);
      strokeWidth = theme.styles.diabled['stroke-width'];
    } else if (invalid) {
      ({ stroke } = theme.styles.invalid);
      strokeWidth = theme.styles.invalid['stroke-width'];
    } else if (selected) {
      ({ stroke } = theme.styles.selected);
      strokeWidth = theme.styles.selected['stroke-width'];
    } else {
      ({ stroke } = theme.styles.main);
      strokeWidth = theme.styles.main['stroke-width'];
    }
    if (this.attr('stroke') !== stroke || this.attr('stroke-width') !== strokeWidth) {
      this.attr({
        stroke,
        'stroke-width': strokeWidth,
      });
    }
    return this;
  }

  _updateChildren(show = true) {
    const {
      x,
      y,
      width,
      height,
    } = this.rphRef.attr(['x', 'y', 'width', 'height']);
    if (this.mainIcon) {
      const {
        width: miW,
        height: miH,
      } = this.mainIcon.attr(['width', 'height']);
      this.mainIcon.attr({
        x: x + ((width - miW) / 2),
        y: y + ((height - miH) / 2),
      });
    }
    this.ports.forEach((p) => {
      const positionData = p.positionData || [0, 0];
      const cx = addNumberOrPercent(positionData[0], width, x);
      const cy = addNumberOrPercent(positionData[1], height, y);

      p.attr({ cx: cx == null ? x : cx, cy: cy == null ? y : cy });
    });
    if (show) {
      this.ports.map(p => p.show());
    } else {
      this.ports.map(p => p.hide());
    }
    return this;
  }

  attr(...args) {
    const result = this.rphRef.attr(...args);
    const attrCallType = this._getAttrCallType(...args);
    if (attrCallType.type === 'set') {
      if (
        'x' in attrCallType.attrs
        || 'y' in attrCallType.attrs
        || 'width' in attrCallType.attrs
        || 'height' in attrCallType.attrs
      ) {
        const shapeInvalid = !isShapeValid(this);
        if (this.isInvalid() !== shapeInvalid) {
          this.setInvalid(shapeInvalid);
        }
        this._updateChildren(!shapeInvalid);
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

  toFront(...args) {
    if (this.mainIcon) {
      this.mainIcon.toFront(...args);
    }
    this.rphRef.toFront(...args);
    this.ports.forEach((p) => {
      p.toFront();
      Object.values(p.connectionMap).forEach((c) => {
        c.toFront();
      });
    });
    return this;
  }

  remove() {
    this.ports.map(p => p.remove());
    if (this.mainIcon) {
      this.mainIcon.remove();
    }
    return super.remove();
  }
}
