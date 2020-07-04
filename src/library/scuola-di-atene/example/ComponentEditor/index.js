/* eslint-disable react/prop-types, react/forbid-prop-types, no-new-func */
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/material-ui';
import DialogContent from '@material-ui/core/DialogContent';
import ConfirmDialog from '~/core/Dialogs/ConfirmDialog';


const schema = {
  // title: 'Todo',
  type: 'object',
  required: ['title'],
  properties: {
    title: { type: 'string', title: 'Title', default: 'A new task' },
    done: { type: 'boolean', title: 'Done?', default: false },
  },
};

export default (props) => {
  const {
    label,
    value: v = {},
    onClose = (() => {}),
    onExited,
    ...rest
  } = props;

  const [value, setValue] = useState({});

  const handleClose = (_result) => {
    let result = _result;
    if (result === true) {
      result = value;
      console.log('result :', result);
    } else {
      result = undefined;
    }
    onClose(result);
  };

  return (
    <ConfirmDialog
      {...rest}
      onClose={handleClose}
      dialogProps={{ onExited }}
    >
      <DialogContent>
        <Form
          schema={schema}
          formData={value}
          onChange={({ formData }) => { setValue(formData); }}
          // onSubmit={handleClose}
          // onError={}
          children={true}
        />
      </DialogContent>
    </ConfirmDialog>
  );
};
