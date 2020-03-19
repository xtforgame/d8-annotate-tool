"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableHead = _interopRequireDefault(require("@material-ui/core/TableHead"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TableSortLabel = _interopRequireDefault(require("@material-ui/core/TableSortLabel"));

var _Tooltip = _interopRequireDefault(require("@material-ui/core/Tooltip"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class EnhancedTableHead extends _react.default.PureComponent {
  constructor(...args) {
    super(...args);

    _defineProperty(this, "createSortHandler", property => event => {
      this.props.onRequestSort(event, property);
    });
  }

  render() {
    const {
      withDetail,
      withActions,
      columns,
      columnSizes,
      order,
      orderBy,
      sortTip
    } = this.props;
    return _react.default.createElement(_TableHead.default, null, _react.default.createElement(_TableRow.default, null, withDetail && _react.default.createElement(_TableCell.default, {
      padding: "checkbox",
      style: columnSizes ? {
        width: 72
      } : {}
    }), columns.map((column, i) => {
      const sortProps = {};
      const style = columnSizes && columnSizes[i] != null ? {
        width: columnSizes[i]
      } : {};
      let {
        label
      } = column;

      if (column.sortable !== false) {
        sortProps.sortDirection = orderBy === column.id ? order : false;
        label = _react.default.createElement(_TableSortLabel.default, {
          active: orderBy === column.id,
          direction: order,
          onClick: this.createSortHandler(column.id)
        }, column.label);
      }

      return _react.default.createElement(_TableCell.default, _extends({
        key: column.id,
        align: column.numeric ? 'right' : 'left',
        padding: column.padding || 'default',
        className: column.cellClassName
      }, sortProps, {
        style: style
      }), column.label && _react.default.createElement(_Tooltip.default, {
        title: sortTip,
        placement: column.numeric ? 'bottom-end' : 'bottom-start',
        enterDelay: 300
      }, label));
    }, this), withActions && _react.default.createElement(_TableCell.default, {
      padding: "checkbox",
      style: columnSizes ? {
        width: 72
      } : {}
    })));
  }

}

exports.default = EnhancedTableHead;
EnhancedTableHead.propTypes = {
  columns: _propTypes.default.array.isRequired,
  onRequestSort: _propTypes.default.func.isRequired,
  order: _propTypes.default.string.isRequired,
  orderBy: _propTypes.default.string.isRequired
};