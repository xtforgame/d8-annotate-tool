import { useState } from 'react';

export const Cancel = Symbol('Cancel');

export default ({
  open: openFunc = () => {},
  close: closeFunc = () => {},
  exited: exitedFunc = () => {},
  dialogProps: dp = {},
}) => {
  const [open, setOpen] = useState(false);
  const [exited, setExited] = useState(true);

  const handleOpen = (...args) => {
    if (exited) {
      setOpen(true);
      setExited(false);
      openFunc(...args);
    }
  };

  const handleClose = (...args) => {
    const result = closeFunc(...args);
    if (result !== false) {
      setOpen(false);
    }
  };

  const handleExited = () => {
    // console.log('handleExited :', handleExited);
    setExited(true);
    exitedFunc();
  };

  const dialogProps = {
    ...dp,
    open,
    onClose: handleClose,
    onExited: handleExited,
  };

  return [{
    open,
    exited,
    dialogProps,
  }, {
    setOpen,
    setExited,
    handleOpen,
    handleClose,
    handleExited,
  }];
};
