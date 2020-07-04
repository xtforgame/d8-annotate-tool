// !!!!
// https://stackoverflow.com/questions/14708880/rectangle-selection-of-svg-elements-for-raphael
// http://jsfiddle.net/Wrajf/348/

import React, { useRef, useEffect } from 'react';
import classnames from 'classnames';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/styles';
import useDrop from './useDrop';
import useUpdateImage from './useUpdateImage';
import useContextMenuState from './useContextMenuState';
import useEditorState from './useEditorState';
import ComponentEditor from '../ComponentEditor';
import TestPaper from '../TestPaper';

import screenSize from '../../screenSize';

const useStyles = makeStyles(theme => ({
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
    overflow: 'auto',
  },
  paper: {
    width: 'fit-content',
  },
}));

export default (props) => {
  const {
    onHover = () => {},
    onDrop = () => {},

    image,

    onSdaPaperChange = () => {},
    onRectListChange = () => {},
    onSelectedIdsChange = () => {},
    onSdaCommandSequenceChange = () => {},
    onOptionButtonClick = () => {},
  } = props;

  const rphPaperRef = useRef();
  const sdaPaperRef = useRef();

  const classes = useStyles();

  const {
    collectedProps,
    drop,
  } = useDrop(rphPaperRef, { accept: props.accepts, onHover, onDrop });

  const {
    isOver,
    canDrop,
  } = collectedProps;

  const { updateImage } = useUpdateImage(sdaPaperRef, image);

  const {
    menuInfo,
    // setMenuInfo,
    handleMenuOpen,
    handleMenuClose,
  } = useContextMenuState();

  const [{
    open: dialogOpened,
    exited: dialogExited,
    dialogProps,
  }, {
    handleOpen: handleDialogOpen,
    handleClose: handleDialogClose,
    handleExited: handleDialogExited,
  }, {
    target: editingTarget,
    setTarget: setEditingTarget,
  }] = useEditorState();

  const callbacks = useRef({
    onSdaPaperChange,
    onRectListChange: ({ selectables }) => {
      onRectListChange(selectables);
    },
    onSelectedIdsChange,
    onOptionButtonClick: (...args) => {
      const { ext, target } = args[0];
      if (target) {
        handleMenuOpen(ext.getAnchorNode(), target);
      }

      onOptionButtonClick(...args);
    },
    onCommandSequenceChange: onSdaCommandSequenceChange,
  });

  useEffect(() => {
    let sdaPaper = sdaPaperRef.current;
    if (!sdaPaper) {
      sdaPaperRef.current = new TestPaper({
        rphPaperElem: rphPaperRef.current,
        layoutOrientation: 'ttd',
      }, 'paper', screenSize.w, screenSize.h);

      sdaPaper = sdaPaperRef.current;

      sdaPaper.events.addListener('onSelectablesChange', callbacks.current.onRectListChange);
      sdaPaper.events.addListener('onSelectedIdsChange', callbacks.current.onSelectedIdsChange);
      sdaPaper.events.addListener('onOptionButtonClick', callbacks.current.onOptionButtonClick);
      sdaPaper.events.addListener('onCommandSequenceChange', callbacks.current.onCommandSequenceChange);

      sdaPaper.init();

      updateImage();
      callbacks.current.onSdaPaperChange(sdaPaper);
    } else {
      updateImage();
    }
  });

  useEffect(() => {
    const sdaPaper = sdaPaperRef.current;
    return () => {
      sdaPaper.events.removeListener('onSelectablesChange', callbacks.current.onRectListChange);
      sdaPaper.events.removeListener('onSelectedIdsChange', callbacks.current.onSelectedIdsChange);
      sdaPaper.events.addListener('onCommandSequenceChange', callbacks.current.onCommandSequenceChange);
      sdaPaper.remove();
      sdaPaperRef.current = null;
      callbacks.current.onSdaPaperChange(sdaPaperRef.current);
    };
  }, []);

  const isActive = isOver && canDrop;

  let backgroundColor = 'transparent';
  if (isActive) {
    backgroundColor = 'darkgreen';
  } else if (canDrop) {
    backgroundColor = 'darkkhaki';
  }

  return (
    <div className={classes.container}>
      <div
        id="paper"
        className={classnames(classes.paper, 'raphael-paper')}
        ref={(elem) => {
          drop(elem);
          rphPaperRef.current = elem;
        }}
        // style={{
        //   backgroundColor,
        // }}
      />
      <Menu
        id="simple-menu"
        anchorEl={menuInfo.anchorEl}
        open={menuInfo.open}
        onClose={handleMenuClose}
      >
        <MenuItem
          // selected
          onClick={() => {
            handleDialogOpen(menuInfo.targetShape);
            handleMenuClose();
          }}
        >
          Edit
        </MenuItem>
        <MenuItem
          // selected
          onClick={() => {
            const saveData = sdaPaperRef.current.serialize();
            console.log('saveData :', JSON.stringify(saveData, null, 2));
            sdaPaperRef.current.deserialize(saveData);
            handleMenuClose();
          }}
        >
          Save
        </MenuItem>
        <Divider />
        <MenuItem
          // selected
          onClick={() => {
            // console.log('menuInfo.targetShape :', menuInfo.targetShape);
            sdaPaperRef.current.deleteId(menuInfo.targetShape.id);
            handleMenuClose();
          }}
        >
          Delete
        </MenuItem>
      </Menu>
      {(!dialogExited) && (
        <ComponentEditor
          title="Editor"
          value={editingTarget}
          {...dialogProps}
        />
      )}
    </div>
  );
};
