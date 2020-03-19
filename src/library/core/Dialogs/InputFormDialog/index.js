/* eslint-disable react/prop-types, react/forbid-prop-types */
import React from 'react';
import { FormSpace } from '~/core/FormInputs';
import DialogLayout from '~/core/FormLayouts/DialogLayout';
import ConfirmDialog from '../ConfirmDialog';
import InputFormDialogContent from './InputFormDialogContent';

export default class InputFormDialog extends React.PureComponent {
  handleClose = (_result) => {
    let result = _result;
    if (result === true) {
      result = this.linker.host.handleSubmit();
      if (!result) {
        return;
      }
      result = result.outputs;
    } else {
      const { onClose } = this.props;
      if (onClose) {
        onClose(result);
      }
    }
  }

  handleSubmit = (result) => {
    const { onClose } = this.props;
    if (onClose) {
      onClose(result);
    }
  }

  render() {
    const {
      title,
      fullScreen,
      open,
      // onClose,
      dialogProps,

      fields,
      defaultValues,
      formProps,
    } = this.props;
    return (
      <ConfirmDialog
        title={title}
        open={open}
        fullScreen={fullScreen}
        {...dialogProps}
        onClose={this.handleClose}
      >
        <DialogLayout
          Content={InputFormDialogContent}
          topSpace={fullScreen ? <FormSpace variant="content2" /> : <FormSpace variant="content0" />}
          {...formProps}
          onInited={linker => (this.linker = linker)} // eslint-disable-line no-return-assign
          fields={fields}
          defaultValues={defaultValues}
          onSubmit={this.handleSubmit}
        />
      </ConfirmDialog>
    );
  }
}
