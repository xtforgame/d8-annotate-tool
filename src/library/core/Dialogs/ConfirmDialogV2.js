/* eslint-disable react/prop-types, react/forbid-prop-types */
import React from 'react';
import ConfirmDialog from './ConfirmDialog';

export default (props) => {
  const {
    title,
    contents,
    contentText,
    buttonComponents,
    buttonTexts,
    open,
    onClose,
    children,
    fullScreen,
    ...dialogProps
  } = props;

  return (
    <ConfirmDialog
      title={title}
      contents={contents}
      contentText={contentText}
      buttonComponents={buttonComponents}
      buttonTexts={buttonTexts}
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      dialogProps={dialogProps}
    >
      {children}
    </ConfirmDialog>
  );
};
