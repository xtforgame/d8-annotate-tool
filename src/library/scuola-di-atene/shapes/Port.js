/* eslint-disable no-underscore-dangle, no-nested-ternary, no-param-reassign */
import SdaShape from '../SdaShape';
import {
  componentMargin,
} from '../utils/PathOptimizerT1';

export default class Port extends SdaShape {
  static $type = 'port';

  createShape([owner, portName], options) {
    this.owner = owner;
    this.portName = portName;
    this.portType = options.portType || 'unknown';
    this.portIoType = options.portIoType || 'unknown';
    this.connectionMap = {};
    this.rphRef = this.rphPaper.circle(0, 0, 0);
    // https://stackoverflow.com/questions/2547927/raphael-js-text-positioning-centering-text-in-a-circle
    this.text = this.rphPaper.text(0, 0, this.portName);
    this.text.attr({ 'font-size': 12, 'font-family': 'FranklinGothicFSCondensed-1, FranklinGothicFSCondensed-2' });
    this.text.attr('fill', '#f1f1f1');
    this.direction = this.options.direction || [0, 0];
    this.positionData = this.options.positionData;

    this.canAccept = port => (this.portType !== port.portType);
    const accept = options.accept || {};
    const { byPortTypes, excludeOwner } = accept;
    if (byPortTypes && Array.isArray(byPortTypes)) {
      this.canAccept = (port) => {
        const result = byPortTypes.includes(port.portType);
        if (result && excludeOwner && port.owner === this.owner) {
          return false;
        }
        return result;
      };
    }
  }

  getPortPosition = () => {
    const {
      cx: x,
      cy: y,
    } = this.rphRef.attr(['cx', 'cy']);

    return {
      x,
      y,
    };
  }

  getPortConnectionPosition = () => {
    const offsetDist = componentMargin + 1;

    const {
      x: ox,
      y: oy,
      width: ow,
      height: oh,
    } = this.owner.attr(['x', 'y', 'width', 'height']);

    let {
      cx: x,
      cy: y,
    } = this.rphRef.attr(['cx', 'cy']);

    if (this.direction[0]) {
      if (this.direction[0] > 0) {
        x = ox + ow + offsetDist - 1;
      } else {
        x = ox - offsetDist;
      }
    }

    if (this.direction[1]) {
      if (this.direction[1] > 0) {
        y = oy + oh + offsetDist - 1;
      } else {
        y = oy - offsetDist;
      }
    }

    return {
      x,
      y,
    };
  }

  setPortPosition = ({ x, y }) => this.rphRef.attr({
    cx: x,
    cy: y,
  });

  setConnecting(connecting = true) {
    const theme = this.ext.themeProvider.getTheme();
    if (connecting) {
      this.rphRef.attr(theme.styles.port.connecting);
    } else {
      this.rphRef.attr(theme.styles.port.normal);
    }
  }

  setAccepting(accepting = true) {
    const theme = this.ext.themeProvider.getTheme();
    if (accepting) {
      this.rphRef.attr(theme.styles.port.accepting);
    } else {
      this.rphRef.attr(theme.styles.port.normal);
    }
  }

  setApproaching(approaching = true) {
    const theme = this.ext.themeProvider.getTheme();
    if (approaching) {
      this.rphRef.attr(theme.styles.port.approaching);
    } else {
      this.rphRef.attr(theme.styles.port.normal);
    }
  }

  isConnectable() {
    return !this.getConnections().length;
  }

  addConnection(connection) {
    if (this.connectionMap[connection.uid]) {
      this.ext.portManager.disconnect(this.connectionMap[connection.uid]);
    }
    this.connectionMap[connection.uid] = connection;
  }

  removeConnection(connectionUid) {
    if (this.connectionMap[connectionUid]) {
      delete this.connectionMap[connectionUid];
    }
  }

  getConnections() {
    return Object.values(this.connectionMap);
  }

  _updateChildren(show = true) {
    const {
      cx,
      cy,
    } = this.rphRef.attr(['cx', 'cy']);
    if (this.text) {
      this.text.attr({
        x: cx + (this.options.direction[0] * 5),
        y: cy + (this.options.direction[1] * 10),
      });
      if (this.options.direction[0] > 0) {
        this.text.attr({ 'text-anchor': 'start' });
      } else if (this.options.direction[0] < 0) {
        this.text.attr({ 'text-anchor': 'end' });
      } else {
        this.text.attr({ 'text-anchor': 'center' });
      }
    }
    if (show) {
      this.text.show();
    } else {
      this.text.hide();
    }
    return this;
  }

  attr(...args) {
    const result = this.rphRef.attr(...args);
    const attrCallType = this._getAttrCallType(...args);
    if (attrCallType.type === 'set') {
      if (
        'cx' in attrCallType.attrs
        || 'cy' in attrCallType.attrs
      ) {
        this.getConnections().forEach(
          c => c.redraw()
        );
        this._updateChildren(true);
      }
      return this;
    }
    return result;
  }

  extraAttr(...args) {
    const result = super.extraAttr(...args);
    if (!this._isAReadOnlyAttrCall(...args)) {
      const { enabled, invalid, selected } = this.extraAttrs;
      const theme = this.ext.themeProvider.getTheme();

      let stroke;
      if (!enabled) {
        ({ stroke } = theme.styles.diabled);
      } else if (invalid) {
        ({ stroke } = theme.styles.invalid);
      } else if (selected) {
        ({ stroke } = theme.styles.selected);
      } else {
        ({ stroke } = theme.styles.main);
      }
      if (this.attr('stroke') !== stroke) {
        this.attr('stroke', stroke);
      }
    }
    return result;
  }

  init() {
    const theme = this.ext.themeProvider.getTheme();
    this.rphRef.attr(theme.styles.port.init);
  }

  remove() {
    this.getConnections()
    .forEach((c) => {
      this.ext.portManager.disconnect(c);
    });
    if (this.text) {
      this.text.remove();
    }
    return super.remove();
  }
}
