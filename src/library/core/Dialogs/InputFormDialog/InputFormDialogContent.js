/* eslint-disable react/prop-types, react/forbid-prop-types */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
  root: {
    minWidth: 300,
  },
});

const InputFormDialogContent = props => <DialogContent {...props} />;

export default withStyles(styles)(InputFormDialogContent);
