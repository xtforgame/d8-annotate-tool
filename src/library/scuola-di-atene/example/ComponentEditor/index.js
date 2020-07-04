/* eslint-disable react/prop-types, react/forbid-prop-types, no-new-func */
import React, { useState, useEffect } from 'react';
import Form from '@rjsf/material-ui';
import DialogContent from '@material-ui/core/DialogContent';
import ConfirmDialog from '~/core/Dialogs/ConfirmDialog';

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

  const schema = {
    title: 'Common',
    type: 'object',
    required: ['title'],
    properties: {
      id: { type: 'string', title: 'ID', default: 'A new task' },
      done: { type: 'boolean', title: 'Done?', default: false },
      data: {
        type: 'object',
        title: 'Data',
        required: [
          'title',
        ],
        properties: {
          title: {
            type: 'string',
            title: 'Title',
            description: 'A sample title',
          },
          details: {
            type: 'string',
            title: 'Task details',
            description: 'Enter the task details',
          },
          done: {
            type: 'boolean',
            title: 'Done?',
            default: false,
          },
          tasks: {
            type: 'array',
            title: 'Tasks',
            items: {
              type: 'object',
              required: [
                'title',
              ],
              properties: {
                title: {
                  type: 'string',
                  title: 'Title',
                  description: 'A sample title',
                },
                details: {
                  type: 'string',
                  title: 'Task details',
                  description: 'Enter the task details',
                },
                done: {
                  type: 'boolean',
                  title: 'Done?',
                  default: false,
                },
              },
            },
          },
        },
      },
    },
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
          children
        />
      </DialogContent>
    </ConfirmDialog>
  );
};
