// !!!!
// https://stackoverflow.com/questions/14708880/rectangle-selection-of-svg-elements-for-raphael
// http://jsfiddle.net/Wrajf/348/

import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import UndoIcon from '@material-ui/icons/Undo';
import HistoryIcon from '@material-ui/icons/History';
import RedoIcon from '@material-ui/icons/Redo';

const styles = {
};

class MainToolBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
    };
  }

  getMenuItmes() {
    const { commandSequenceInfo } = this.props;

    return [{ name: '<初始狀態>' }].concat(commandSequenceInfo.sequences).map((seq, i) => {
      const index = i - 1;
      let actionPrefix = '';
      if (index > commandSequenceInfo.currentIndex) {
        actionPrefix = '重做：';
      } else if (index < commandSequenceInfo.currentIndex) {
        actionPrefix = '復原：';
      }
      return (
        <MenuItem
          key={index}
          selected={index === commandSequenceInfo.currentIndex}
          onClick={event => this.setCommandToIndex(index)}
        >
          {`${actionPrefix}${seq.name}`}
        </MenuItem>
      );
    });
  }

  handleClick = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  };

  handleRequestClose = () => {
    this.setState({ open: false });
  };

  setCommandToIndex = (index) => {
    const { setCommandToIndex } = this.props;
    setCommandToIndex(index);
    this.handleRequestClose();
  };

  render() {
    const { classes, undo, redo } = this.props;
    return (
      <div>
        {/* <IconButton
          onClick={undo}
          aria-label="Undo"
          disabled={!undo}
        >
          <UndoIcon />
        </IconButton> */}
        <IconButton
          onClick={this.handleClick}
          aria-label="History"
        >
          <HistoryIcon />
        </IconButton>
        {/* <IconButton
          onClick={redo}
          aria-label="Redo"
          disabled={!redo}
        >
          <RedoIcon />
        </IconButton> */}
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleRequestClose}
        >
          {this.getMenuItmes()}
        </Menu>
      </div>
    );
  }
}

export default compose(
  withStyles(styles),
)(MainToolBar);
