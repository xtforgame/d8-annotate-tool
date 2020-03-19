"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styles = require("@material-ui/core/styles");

var _Table = _interopRequireDefault(require("@material-ui/core/Table"));

var _TableBody = _interopRequireDefault(require("@material-ui/core/TableBody"));

var _TableCell = _interopRequireDefault(require("@material-ui/core/TableCell"));

var _TableRow = _interopRequireDefault(require("@material-ui/core/TableRow"));

var _TablePagination = _interopRequireDefault(require("@material-ui/core/TablePagination"));

var _Paper = _interopRequireDefault(require("@material-ui/core/Paper"));

var _IconButton = _interopRequireDefault(require("@material-ui/core/IconButton"));

var _ChevronRight = _interopRequireDefault(require("@material-ui/icons/ChevronRight"));

var _ExpandMore = _interopRequireDefault(require("@material-ui/icons/ExpandMore"));

var _EnhancedTableHead = _interopRequireDefault(require("./EnhancedTableHead"));

var _MoreActionMenuButton = _interopRequireDefault(require("../Buttons/MoreActionMenuButton"));

var _ProgressWithMask = _interopRequireDefault(require("../Progress/ProgressWithMask"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const styles = theme => ({
  root: {
    width: '100%',
    overflowX: 'auto'
  },
  table: {
    minWidth: 700
  },
  tableFixedLayout: {
    minWidth: 700,
    tableLayout: 'fixed'
  },
  paper: {
    width: '100%'
  },
  iconCell: {
    width: 48 + 12 * 2
  },
  actionsCell: {
    width: 48 + 12 * 2,
    '&:last-child': {
      paddingRight: theme.spacing(1.5)
    }
  },
  detailCell: {
    backgroundColor: theme.palette.background.default
  }
});

class EnhancedTable extends _react.default.PureComponent {
  static updateState({
    columns,
    columnSizes,
    rows = [],
    order,
    orderBy
  }) {
    let sortedRows = [...rows];
    const columnMap = {};
    columns.forEach(column => {
      columnMap[column.id] = column;
    });

    let compare = (a, b, orderBy) => a[orderBy] < b[orderBy];

    if (columnMap[orderBy] && columnMap[orderBy].numeric) {
      compare = (a, b, orderBy) => parseFloat(a[orderBy]) < parseFloat(b[orderBy]);
    }

    if (order && orderBy) {
      sortedRows = order === 'desc' ? rows.sort((a, b) => compare(b, a, orderBy) ? -1 : 1) : rows.sort((a, b) => compare(a, b, orderBy) ? -1 : 1);
    }

    return {
      columns,
      columnSizes,
      columnMap,
      rows: sortedRows,
      order,
      orderBy
    };
  }

  constructor(...args) {
    super(...args);

    _defineProperty(this, "handleChangePage", (event, page) => {
      this.setState({
        page
      });
    });

    _defineProperty(this, "handleChangeRowsPerPage", event => {
      this.setState({
        rowsPerPage: event.target.value
      });
    });

    _defineProperty(this, "handleRequestSort", (_, property) => {
      let orderBy = property || this.props.defaultSortBy;
      let order = 'desc';

      if (this.state.orderBy === property) {
        if (this.state.order === 'desc') {
          order = 'asc';
        } else if (orderBy !== this.props.defaultSortBy) {
          orderBy = this.props.defaultSortBy;
          order = 'asc';
        } else {
          order = 'desc';
        }
      }

      this.setState(EnhancedTable.updateState({
        columns: this.props.columns,
        columnSizes: this.props.columnSizes,
        rows: this.state.rows,
        order,
        orderBy
      }));
    });

    this.state = _objectSpread({
      page: 0,
      rowsPerPage: 5,
      expanded: {}
    }, EnhancedTable.updateState({
      columns: this.props.columns,
      columnSizes: this.props.columnSizes,
      rows: this.props.rows,
      order: 'asc',
      orderBy: this.props.defaultSortBy
    }));
  }

  static getDerivedStateFromProps(props, prevState) {
    if (props.rows && props.rows !== prevState.rows || props.order && props.order !== prevState.order || props.orderBy && props.orderBy !== prevState.orderBy || props.columns && props.columns !== prevState.columns || props.columnSizes && props.columnSizes !== prevState.columnSizes) {
      const rows = props.rows || prevState.rows;
      const order = props.order || prevState.order;
      const orderBy = props.orderBy || prevState.orderBy;
      const columns = props.columns || prevState.columns;
      return EnhancedTable.updateState({
        columns,
        rows,
        order,
        orderBy
      });
    }

    return null;
  }

  toggleDetail(row) {
    if (this.state.expanded[row.id]) {
      return this.setState({
        expanded: {}
      });
    }

    return this.setState({
      expanded: {
        [row.id]: true
      }
    });
  }

  render() {
    const {
      classes,
      withDetail,
      getActionMenuItems,
      columns,
      columnSizes,
      loading,
      loadingRows,
      renderEmptyRows
    } = this.props;
    const {
      order,
      orderBy,
      rowsPerPage,
      page
    } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, this.state.rows.length - page * rowsPerPage);
    return _react.default.createElement(_Paper.default, {
      className: classes.root
    }, _react.default.createElement(_Table.default, {
      className: columnSizes ? classes.tableFixedLayout : classes.table
    }, _react.default.createElement(_EnhancedTableHead.default, {
      withDetail: withDetail,
      withActions: !!getActionMenuItems,
      columns: columns,
      columnSizes: columnSizes,
      sortTip: "Sort",
      order: order,
      orderBy: orderBy,
      onRequestSort: this.handleRequestSort
    }), _react.default.createElement(_TableBody.default, null, this.state.rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
      const expanded = this.state.expanded[row.id];
      const options = {
        columns
      };
      return _react.default.createElement(_react.default.Fragment, {
        key: row.id
      }, _react.default.createElement(_TableRow.default, null, withDetail && _react.default.createElement(_TableCell.default, {
        padding: "checkbox",
        className: classes.iconCell
      }, _react.default.createElement(_IconButton.default, {
        onClick: () => {
          this.toggleDetail(row);
        }
      }, expanded ? _react.default.createElement(_ExpandMore.default, null) : _react.default.createElement(_ChevronRight.default, null))), columns.map(column => {
        const renderFunction = row.renderCell || column.renderRowCell || ((columnId, row) => row[columnId]);

        return _react.default.createElement(_TableCell.default, {
          key: column.id,
          align: column.numeric ? 'right' : 'left',
          padding: column.padding || 'default',
          className: column.cellClassName
        }, renderFunction(column.id, row, options));
      }), getActionMenuItems && _react.default.createElement(_TableCell.default, {
        padding: "checkbox",
        className: classes.actionsCell
      }, _react.default.createElement(_MoreActionMenuButton.default, {
        getActionMenuItems: getActionMenuItems
      }))), withDetail && expanded && _react.default.createElement(_TableRow.default, null, _react.default.createElement(_TableCell.default, {
        colSpan: columns.length + +withDetail + +!!getActionMenuItems,
        className: classes.detailCell
      }, this.props.renderRowDetail && this.props.renderRowDetail(row, options))));
    }), renderEmptyRows && emptyRows > 0 && Array.apply(null, {
      length: emptyRows
    }).map((_, i) => _react.default.createElement(_TableRow.default, {
      key: `empty-${i}`
    }, _react.default.createElement(_TableCell.default, {
      colSpan: columns.length + +withDetail + +!!getActionMenuItems
    }))))), !loading && loadingRows && _react.default.createElement(_ProgressWithMask.default, {
      delay: 100
    }), _react.default.createElement(_TablePagination.default, {
      component: "div",
      count: this.state.rows.length,
      rowsPerPage: rowsPerPage,
      page: page,
      backIconButtonProps: {
        'aria-label': 'Previous Page'
      },
      nextIconButtonProps: {
        'aria-label': 'Next Page'
      },
      onChangePage: this.handleChangePage,
      onChangeRowsPerPage: this.handleChangeRowsPerPage
    }), loading && _react.default.createElement(_ProgressWithMask.default, {
      delay: 100
    }));
  }

}

var _default = (0, _styles.withStyles)(styles)(EnhancedTable);

exports.default = _default;