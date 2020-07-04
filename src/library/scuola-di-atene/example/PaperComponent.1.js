// !!!!
// https://stackoverflow.com/questions/14708880/rectangle-selection-of-svg-elements-for-raphael
// http://jsfiddle.net/Wrajf/348/

import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { compose } from 'recompose';
import { findDOMNode } from 'react-dom';
import { withStyles } from '@material-ui/core/styles';
import { DropTarget } from 'react-dnd';
import TestPaper from './TestPaper';

import screenSize from '../screenSize';

const sdaPaperTarget = {
  hover(props, monitor, component) {
    // // This is fired very often and lets you perform side effects
    // // in response to the hover. You can't handle enter and leave
    // // here—if you need them, put monitor.isOver() into collect() so you
    // // can just use componentDidUpdate() to handle enter/leave.

    // // You can access the coordinates if you need them
    const clientOffset = monitor.getClientOffset();
    const element = findDOMNode(component); // eslint-disable-line react/no-find-dom-node
    const componentRect = element.getBoundingClientRect();
    const {
      scrollTop,
      scrollLeft,
    } = element;

    // // You can check whether we're over a nested drop target
    // const isJustOverThisOne = monitor.isOver({ shallow: true });

    // // You will receive hover() even for items for which canDrop() is false
    // const canDrop = monitor.canDrop();

    if (props.onHover) {
      props.onHover({
        clientOffset,
        componentRect,
        scrollOffset: {
          x: scrollLeft,
          y: scrollTop,
        },
      });
    }
  },
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

const styles = theme => ({
  container: {
    position: 'relative',
  },
});

class PaperComponent extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      imageSrc: null,
      imageShape: null,
      menuAnchorEl: null,
      menuOpen: false,
    };
  }

  componentDidMount() {
    this.sdaPaper = new TestPaper({
      rphPaperElem: this.rphPaperElem,
      layoutOrientation: 'ttd',
    }, 'paper', screenSize.w, screenSize.h);

    this.sdaPaper.events.addListener('onSelectablesChange', this.onRectListChange);
    this.sdaPaper.events.addListener('onSelectedIdsChange', this.onSelectedIdsChange);
    this.sdaPaper.events.addListener('onOptionButtonClick', this.onOptionButtonClick);
    this.sdaPaper.events.addListener('onCommandSequenceChange', this.onCommandSequenceChange);

    this.sdaPaper.init();
    this.rphPaper = this.sdaPaper.rphPaper;

    this.updateImage();
    this.onSdaPaperChange(this.sdaPaper);
  }

  componentDidUpdate() {
    this.updateImage();
  }

  componentWillUnmount() {
    this.sdaPaper.events.removeListener('onSelectablesChange', this.onRectListChange);
    this.sdaPaper.events.removeListener('onSelectedIdsChange', this.onSelectedIdsChange);
    this.sdaPaper.events.addListener('onCommandSequenceChange', this.onCommandSequenceChange);
    this.sdaPaper.remove();
    this.sdaPaper = null;
    this.rphPaper = null;
    this.onSdaPaperChange(this.sdaPaper);
  }

  onSdaPaperChange = (...args) => {
    if (this.props.onSdaPaperChange) {
      this.props.onSdaPaperChange(...args);
    }
  };

  onRectListChange = ({ selectables }) => {
    if (this.props.onRectListChange) {
      this.props.onRectListChange(selectables);
    }
  };

  onSelectedIdsChange = (...args) => {
    if (this.props.onSelectedIdsChange) {
      this.props.onSelectedIdsChange(...args);
    }
  };

  onOptionButtonClick = (...args) => {
    const { ext, target } = args[0];
    if (target) {
      this.handleMenuOpen(ext.getAnchorNode(), target);
    }

    if (this.props.onOptionButtonClick) {
      this.props.onOptionButtonClick(...args);
    }
  };

  onCommandSequenceChange = (info) => {
    if (this.props.onSdaCommandSequenceChange) {
      this.props.onSdaCommandSequenceChange(info);
    }
  };

  handleMenuOpen = (anchorEl, target) => {
    this.setState({
      menuAnchorEl: anchorEl,
      menuTargetShape: target,
      menuOpen: true,
    });
  };

  handleMenuClose = () => {
    this.setState({
      menuAnchorEl: null,
      menuTargetShape: null,
      menuOpen: false,
    });
  };

  updateImage() {
    const { image, initRects } = this.props;
    if (!image) {
      return;
    }
    if (image.src && image.src !== this.state.imageSrc) {
      if (this.state.imageShape) {
        this.state.imageShape.remove();
      }

      this.sdaPaper.setSize(image.width, image.height);
      // this.rphPaper.setViewBox(0, 0, 100, 100, false);
      this.sdaPaper.clearCompnents();
      if (initRects) {
        // console.log('initRects :', initRects);
        this.sdaPaper.importComponents(initRects);
      }

      this.setState({
        imageSrc: image.src,
        imageShape: this.sdaPaper.image([image.src, 0, 0, image.width, image.height]).toBack(),
      });
    }
  }

  render() {
    const {
      classes,
      connectDropTarget,
      // onHover = () => {},
      // onDrop,
      isOver,
      canDrop,
    } = this.props;

    const {
      menuAnchorEl,
      menuOpen,
      menuTargetShape,
    } = this.state;

    const isActive = isOver && canDrop;

    let backgroundColor = 'transparent';
    if (isActive) {
      backgroundColor = 'darkgreen';
    } else if (canDrop) {
      backgroundColor = 'darkkhaki';
    }

    return (
      <div
        className={classes.container}
        style={{
          width: '100%',
          height: '100%',
          overflow: 'auto',
        }}
      >
        {
          connectDropTarget(
            <div
              id="paper"
              className="raphael-paper"
              ref={(elem) => { this.rphPaperElem = elem; }}
              style={{
                width: 'fit-content',
                backgroundColor,
              }}
            />
          )
        }
        <Menu
          id="simple-menu"
          anchorEl={menuAnchorEl}
          open={menuOpen}
          onClose={this.handleMenuClose}
        >
          <MenuItem
            // selected
            onClick={() => {
              const saveData = this.sdaPaper.serialize();
              console.log('saveData :', JSON.stringify(saveData, null, 2));
              this.sdaPaper.deserialize(saveData);
              this.handleMenuClose();
            }}
          >
            Save
          </MenuItem>
          <Divider />
          <MenuItem
            // selected
            onClick={() => {
              // console.log('menuTargetShape :', menuTargetShape);
              this.sdaPaper.deleteId(menuTargetShape.id);
              this.handleMenuClose();
            }}
          >
            Delete
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

export default compose(
  DropTarget(props => props.accepts, sdaPaperTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  })),
  withStyles(styles)
)(PaperComponent);
