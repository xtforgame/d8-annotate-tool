import useDialogState, { Cancel } from './useDialogState';

export {
  Cancel,
};

export default ({
  open,
  close,
  exited,
  dialogProps: dp = {},

  buttonProps: bp = {},
}) => {
  const [r1, {
    setOpen,
    setExited,
    handleOpen,
    handleClose,
    handleExited,
  }] = useDialogState({
    open,
    close,
    exited,
    dialogProps: dp,
  });

  const buttonProps = {
    ...bp,
    onClick: handleOpen,
    onKeyDown: handleOpen,
  };

  return [{
    ...r1,
    buttonProps,
  }, {
    setOpen,
    setExited,
    handleOpen,
    handleClose,
    handleExited,
  }];
};
