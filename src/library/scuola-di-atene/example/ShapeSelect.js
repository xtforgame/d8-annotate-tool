/* eslint-disable react/no-array-index-key */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
  root: {
    display: 'flex',
  },
  space1: {
    flex: 1,
  },
  normalCase: {
    textTransform: 'unset',
  },
});

class ShapeSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  getMenuItmes() {
    const { list = [], selectedIds = [] } = this.props;
    return list.map((shape, i) => (
      <MenuItem
        key={shape.id}
        selected={selectedIds.includes(shape.id)}
        onClick={this.onSelectedIdsChange([shape.id])}
      >
        {`${shape.type.substr(0, 4)}:${shape.id}`}
      </MenuItem>
    ));
  }

  handleClick = (event) => {
    const { list = [] } = this.props;
    if (!list || list.length === 0) {
      return;
    }
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  handleMenuItemClick = (event, index, locale) => {

  };

  onSelectedIdsChange = selectedIds => () => {
    if (this.props.onSelectedIdsChange) {
      this.props.onSelectedIdsChange({ selectedIds });
    }
    this.handleRequestClose();
  };

  onDeleteId = id => () => {
    if (this.props.onDeleteId) {
      this.props.onDeleteId(id);
    }
  };

  render() {
    const { classes, list = [], selectedIds = [] } = this.props;
    const selectedShape = selectedIds && selectedIds[0] && list.find(s => s.id === selectedIds[0]);

    return (
      <div className={classes.root}>
        {/* <div className={classes.space1} /> */}
        <div>
          <Button
            variant="contained"
            color="primary"
            onClick={this.handleClick}
            className={classes.normalCase}
          >
            {selectedShape ? `${selectedShape.type.substr(0, 4)}：${selectedShape.id}` : '<未選取>'}
          </Button>
          <IconButton
            onClick={this.onDeleteId(selectedShape && selectedShape.id)}
            aria-label="Delete"
            disabled={!selectedShape}
          >
            <DeleteIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={this.state.anchorEl}
            open={this.state.open}
            onClose={this.handleRequestClose}
          >
            {this.getMenuItmes()}
          </Menu>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ShapeSelect);
