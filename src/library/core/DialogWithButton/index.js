/* eslint-disable react/no-multi-comp */

import React from 'react';
import MuiButton from '@material-ui/core/Button';
import MuiDialog from '@material-ui/core/Dialog';
import useDialogWithButtonState, { Cancel } from '~/hooks/useDialogWithButtonState';

/*
  props:
    onChange(value)
    label
    title (default = label)
    value
    displayValue(value) => text
    renderButton
    buttonProps
    renderDialog
    dialogProps
*/
export default (props) => {
  const {
    Button = MuiButton,
    Dialog = MuiDialog,
    label,
    title,
    renderButton,
    buttonProps: bp,
    renderDialog,
    dialogProps: dp,
    onChange = () => {},
  } = props;

  const [{
    open,
    exited,
    dialogProps,
    buttonProps,
  }, {
    handleOpen,
    handleClose,
    handleExited,
  }] = useDialogWithButtonState({
    open: () => {
    },
    close: (v) => {
      if (v !== undefined && v !== Cancel) {
        onChange(v);
      }
    },
    dialogProps: dp,
    buttonProps: bp,
  });

  const propsForButton = {
    label,
    title,
    handleOpen,
    buttonProps,
  };

  const propsForDialog = {
    label,
    title,
    open,
    handleClose,
    handleExited,
    dialogProps,
  };

  return (
    <React.Fragment>
      {renderButton ? renderButton(propsForButton) : (
        <Button
          {...buttonProps}
        >
          {label}
        </Button>
      )}
      {(!exited) && (
        renderDialog ? renderDialog(propsForDialog) : (
          <Dialog
            title={title != null ? title : label}
            {...dialogProps}
          />
        )
      )}
    </React.Fragment>
  );
};
