/* eslint-disable no-underscore-dangle, no-param-reassign */
// https://bl.ocks.org/mbostock/8027637
import ndarray from 'ndarray';
import createPlanner from 'l1-path-finder';

export const componentMargin = 10;
export const connectionMargin = 8;

export default class PathOptimizerT2 {
  constructor(manager) {
    this.manager = manager;
    this.paper = this.manager.paper;
    this.rphPaper = this.paper.rphPaper;
  }

  static findPath(mazeInfo, beginPos, endPos) {
    const points = [];
    const {
      mazeNdarray,
      mazeArray,
      width,
      height,
    } = mazeInfo;
    const m = mazeNdarray || ndarray([].concat(...mazeArray), [height, width]);
    const planner = createPlanner(m);
    const paths = [];
    const dist = planner.search(beginPos.y, beginPos.x, endPos.y, endPos.x, paths);

    if (dist === Infinity) {
      // const midX = (endPos.x + beginPos.x) / 2.0;
      points.push([beginPos.x, beginPos.y], [endPos.x, endPos.y]);
    } else {
      for (let i = 0; i < paths.length; i += 2) {
        points.push([paths[i + 1], paths[i]]);
      }
    }
    const deltas = [];
    for (let i = 1; i < points.length; i++) {
      deltas.push([
        points[i][0] - points[i - 1][0],
        points[i][1] - points[i - 1][1],
      ]);
    }

    return {
      dist,
      points,
      deltas,
    };
  }

  findPath(...args) {
    return PathOptimizerT2.findPath(...args);
  }

  _drawRectToMazeArray(mazeArray, width, height, rect, value = '>0') {
    let getValue = () => value;
    if (value === '++') {
      getValue = v => v + 1;
    } else if (value === '--') {
      getValue = v => v - 1;
    } else if (value === '>0') {
      getValue = v => (v > 0 ? v : 1);
    }

    {
      const y1 = Math.max(0, Math.min(rect.y1, height - 1));
      const y2 = Math.min(0, Math.max(rect.y2 - 1, y1), height - 1);
      const x1 = Math.max(0, rect.x1);
      const x2 = Math.min(rect.x2, width);
      for (let i = x1; i < x2; i++) {
        mazeArray[y1][i] = getValue(mazeArray[y1][i]);
        mazeArray[y2][i] = getValue(mazeArray[y2][i]);
      }
    }
    {
      const x1 = Math.max(0, Math.min(rect.x1, width - 1));
      const x2 = Math.min(Math.max(rect.x2 - 1, x1), width - 1);
      const y1 = Math.max(0, rect.y1);
      const y2 = Math.min(rect.y2, height);
      for (let i = y1; i < y2; i++) {
        mazeArray[i][x1] = getValue(mazeArray[i][x1]);
        mazeArray[i][x2] = getValue(mazeArray[i][x2]);
      }
    }
  }

  getMazeInfo() {
    const {
      width,
      height,
    } = this.rphPaper;
    const wallRects = this.paper.getLabelRects();
    const mazeArray = Array.from(
      { length: height },
      () => Array.from({ length: width }, () => 0)
    );
    const rectInfo = [];
    wallRects
    .map(r => r.attr(['x', 'y', 'width', 'height']))
    .map(r => ({
      x1: Math.round(r.x - componentMargin),
      y1: Math.round(r.y - componentMargin),
      x2: Math.round(r.x + r.width + componentMargin),
      y2: Math.round(r.y + r.height + componentMargin),
    }))
    .map((r) => {
      rectInfo.push(r);
      return r;
    })
    .forEach((rect) => {
      this._drawRectToMazeArray(mazeArray, width, height, rect);
    });
    // console.log('mazeArray :', mazeArray);

    // const mazeNdarray = ndarray([].concat(...mazeArray), [height, width]);

    return {
      mazeArray,
      // mazeNdarray,
      width,
      height,
      rectInfo,
    };
  }

  calcPath(port1, port2, mode = 'simple', options = {}) {
    const pPos1 = port1.getPortPosition();
    const pPos2 = port2.getPortPosition();

    const points = [];
    points.push([pPos1.x, pPos1.y]);
    if (mode === 'raw') {
      points.push(...(options.points || []));
    } else if (mode === 'simple') {
      const cPos1 = port1.getPortConnectionPosition();
      const cPos2 = port2.getPortConnectionPosition();
      // const midX = (cPos2.x + cPos1.x) / 2.0;
      points.push([cPos1.x, cPos1.y], [cPos2.x, cPos2.y]);
    }
    points.push([pPos2.x, pPos2.y]);

    return `M${points.map(p => `${p[0]},${p[1]}`).join(' L')}`;
  }

  hasIntersection(rect1, rect2) {
    return (rect1.x1 < rect2.x2
      && rect1.x2 > rect2.x1
      && rect1.y1 < rect2.y2
      && rect1.y2 > rect2.y1
    );
  }

  _drawPointToMazeArray(mazeInfo, point, value = '>0', direction = [1, 1]) {
    const {
      width,
      height,
      mazeArray,
    } = mazeInfo;

    this._drawRectToMazeArray(mazeArray, width, height, {
      x1: Math.round(point[0] - (direction[1] ? connectionMargin : 1)),
      x2: Math.round(point[0] + (direction[1] ? connectionMargin : 1)),
      y1: Math.round(point[1] - (direction[0] ? connectionMargin : 1)),
      y2: Math.round(point[1] + (direction[0] ? connectionMargin : 1)),
    }, value);
  }

  _forEachPixel(points, cb = () => {}) {
    if (!points.length) {
      return;
    }
    let finish = false;
    const axisNames = ['x', 'y'];
    const pixelInfo = {
      globalIndex: 0,
    };

    for (let pointIndex = 0; pointIndex < points.length - 1; pointIndex++) {
      const pt1 = points[pointIndex];
      const pt2 = points[pointIndex + 1];
      const directions = [pt2[0] - pt1[0], pt2[1] - pt1[1]];
      const axisIndex = directions[0] ? 0 : 1;
      const directionInfo = {
        axisName: axisNames[axisIndex],
        axisIndex,
        value: axisIndex ? directions[1] : directions[0],
      };
      pixelInfo.localIndex = 0;
      pixelInfo.localLength = Math.abs(directionInfo.value);
      pixelInfo.position = [...pt1];
      pixelInfo.step = directionInfo.value > 0 ? 1 : -1;

      for (
        pixelInfo.localIndex = 0;
        pixelInfo.localIndex < pixelInfo.localLength;
        pixelInfo.globalIndex++, pixelInfo.localIndex++
      ) {
        finish = cb({
          points,
          pointIndex,
          pixelInfo,
          directionInfo,
        });
        if (finish) {
          break;
        }
        pixelInfo.position[axisIndex] += pixelInfo.step;
      }

      if (finish) {
        break;
      }
    }
  }

  _isPointsValid(mazeInfo, points) {
    const { mazeArray } = mazeInfo;
    let valid = true;
    this._forEachPixel(points, ({
      pointIndex,
      pixelInfo: {
        position,
      },
      directionInfo,
    }) => {
      const [x, y] = position;
      if (!mazeArray[y] || mazeArray[y][x]) {
        valid = false;
        return true;
      }
      return false;
    });
    return valid;
  }

  _optimizePoints(mazeInfo, points) {
    const removePoint01 = (index) => {
      const newPoints = [...points];
      const newPoint = [0, 0];
      newPoint[0] = points[index][0] === points[index + 1][0] ? points[index][0] : points[index + 3][0];
      newPoint[1] = points[index][1] === points[index + 1][1] ? points[index][1] : points[index + 3][1];
      // console.log('newPoint, points[index] :', newPoint, points[index]);
      newPoints.splice(index + 1, 2, newPoint);
      return newPoints;
    };

    const removePoint02 = (index) => {
      const newPoints = [...points];
      const newPoint = [0, 0];
      newPoint[0] = points[index + 3][0] === points[index + 2][0] ? points[index + 3][0] : points[index][0];
      newPoint[1] = points[index + 3][1] === points[index + 2][1] ? points[index + 3][1] : points[index][1];
      // console.log('newPoint, points[index] :', newPoint, points[index]);
      newPoints.splice(index, 2, newPoint);
      return newPoints;
    };

    for (let index = 1; index < points.length - 3; index++) {
      const candidate01 = removePoint01(index);
      // console.log('candidate01 :', candidate01);
      if (this._isPointsValid(mazeInfo, candidate01)) {
        return this._optimizePoints(mazeInfo, candidate01);
      }

      const candidate02 = removePoint02(index);
      // console.log('candidate02 :', candidate02);
      if (this._isPointsValid(mazeInfo, candidate02)) {
        return this._optimizePoints(mazeInfo, candidate02);
      }
    }

    return points;
  }

  redrawAllConnections() {
    const mazeInfo = this.getMazeInfo();
    // console.log('rectInfo :', mazeInfo.rectInfo);
    Object.values(this.manager.connectionMap)
    .map((connection) => {
      const cPos1 = connection.port1.getPortConnectionPosition();
      const cPos2 = connection.port2.getPortConnectionPosition();

      this._drawPointToMazeArray(mazeInfo, [cPos1.x, cPos1.y], '++');
      this._drawPointToMazeArray(mazeInfo, [cPos2.x, cPos2.y], '++');

      return connection;
    })
    .map((connection) => {
      const cPos1 = connection.port1.getPortConnectionPosition();
      const cPos2 = connection.port2.getPortConnectionPosition();

      this._drawPointToMazeArray(mazeInfo, [cPos1.x, cPos1.y], '--');
      this._drawPointToMazeArray(mazeInfo, [cPos2.x, cPos2.y], '--');

      let {
        dist,
        points,
      } = this.findPath(mazeInfo, cPos1, cPos2);
      if (dist !== Infinity) {
        // const startPoint = points[0];
        // const finishPoint = points[points.length - 1];
        // console.log('startPoint :', startPoint);
        // console.log('finishPoint :', finishPoint);
        // console.log('deltas :', deltas);

        // adding extra point if the direction of the nearest path segment of port
        // is not equal to the direction of port
        for (let dirIndex = 0; dirIndex < 2; dirIndex++) {
          let index1 = 0;
          let index2 = 1;
          let { direction } = connection.port1;
          if (direction[dirIndex] && points[index1][dirIndex] === points[index2][dirIndex]) {
            points[index2][dirIndex] += direction[dirIndex];
            const newPt = [...points[index1]];
            newPt[dirIndex] += direction[dirIndex];
            points.splice(index2, 0, newPt);
          }

          index1 = points.length - 1;
          index2 = points.length - 2;
          ({ direction } = connection.port2);
          if (direction[dirIndex] && points[index1][dirIndex] === points[index2][dirIndex]) {
            points[index2][dirIndex] += direction[dirIndex];
            const newPt = [...points[index1]];
            newPt[dirIndex] += direction[dirIndex];
            points.splice(index1, 0, newPt);
          }
        }

        points = [...this._optimizePoints(mazeInfo, points)];

        // points.forEach((pt, i) => {
        //   this._drawPointToMazeArray(mazeInfo, pt, '>0');
        // });

        this._forEachPixel(points, ({
          pixelInfo: {
            position,
            localIndex,
            localLength,
          },
          directionInfo: {
            axisIndex,
          },
        }) => {
          if (localIndex % (connectionMargin) === 0 || (localIndex === localLength - 1)) {
            const direction = [0, 0];
            direction[axisIndex] = 1;
            this._drawPointToMazeArray(mazeInfo, position, '>0', direction);
          }
        });
      }

      connection.redraw('raw', { points });

      return {
        connection,
        points,
      };
    });
  }
}
