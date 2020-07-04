/* eslint-disable no-underscore-dangle, no-param-reassign */
// https://bl.ocks.org/mbostock/8027637
import ndarray from 'ndarray';
import createPlanner from 'l1-path-finder';

export const componentMargin = 10;
export const connectionMargin = 8;

const plusDiff = (from, to, multiplier = 1) => {
  const diffX = to.x - from.x;
  const diffY = to.y - from.y;
  return {
    x: to.x + (diffX * multiplier),
    y: to.y + (diffY * multiplier),
  };
};

export default class PathOptimizerT1 {
  constructor(manager) {
    this.manager = manager;
    this.paper = this.manager.paper;
    this.rphPaper = this.paper.rphPaper;
  }

  calcPath(port1, port2, mode = 'simple', options = {}) {
    const pPos1 = port1.getPortPosition();
    const pPos2 = port2.getPortPosition();

    const cPos1 = port1.getPortConnectionPosition();
    const cPos2 = port2.getPortConnectionPosition();
    // const midX = (cPos2.x + cPos1.x) / 2.0;
    const pt1 = plusDiff(pPos1, cPos1, 7);
    const pt2 = plusDiff(pPos2, cPos2, 7);
    const pt3 = plusDiff(pPos2, cPos2, -0.6);
    const newPoints = [
      [pt1.x, pt1.y],
      [pt2.x, pt2.y],
      [pt3.x, pt3.y],
    ];
    const path = `M${pPos1.x},${pPos1.y} C${newPoints.map(p => `${p[0]},${p[1]}`).join(' ')}`;
    return path;
  }

  redrawAllConnections() {
    Object.values(this.manager.connectionMap)
    .map(connection => connection.redraw('simple', {}));
  }
}
