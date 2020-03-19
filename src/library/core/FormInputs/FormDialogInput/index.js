/* eslint-disable react/no-multi-comp */

import React from 'react';
import useDialogWithButtonState, { Cancel } from '~/hooks/useDialogWithButtonState';
import FdiDialog from './FdiDialog';
import FdiButton from './FdiButton';

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
    Button = FdiButton,
    Dialog = FdiDialog,
    label,
    title,
    value,
    displayValue = v => v,
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

  const valueForDisplay = displayValue(value);
  const propsForButton = {
    label,
    title,
    handleOpen,
    value,
    valueForDisplay,
    buttonProps,
  };

  const propsForDialog = {
    label,
    title,
    open,
    handleClose,
    handleExited,
    value,
    dialogProps,
  };

  return (
    <React.Fragment>
      {renderButton ? renderButton(propsForButton) : (
        <Button
          label={label}
          value={valueForDisplay}
          onClick={handleOpen}
          onKeyDown={handleOpen}
          {...buttonProps}
        />
      )}
      {(!exited) && (
        renderDialog ? renderDialog(propsForDialog) : (
          <Dialog
            title={title != null ? title : label}
            value={value}
            {...dialogProps}
          />
        )
      )}
    </React.Fragment>
  );
};
