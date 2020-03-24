import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import { FormTextField, FormSpace } from '~/core/FormInputs';

const useStyles = makeStyles(theme => ({
}));

export default (props) => {
  const {
    editingParams: {
      defaultText,
      editingSource,
    },
    // onDone,
    // onCancel,
    onSubmit,
  } = props;

  const [text, setText] = useState((editingSource && editingSource.text) || defaultText);
  const submit = () => onSubmit({
    ...editingSource,
    text: text || '',
  });

  return (
    <DialogContent>
      <FormTextField
        label="Text"
        value={text || ''}
        onPressEnter={submit}
        onChange={e => setText(e.target.value)}
        autoFocus
        margin="dense"
        fullWidth
      />
      <FormSpace variant="content2" />
      <Button
        variant="contained"
        onClick={submit}
      >
        Submit
      </Button>
    </DialogContent>
  );
};
