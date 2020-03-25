/* eslint-disable react/prop-types, react/forbid-prop-types */
import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import withOnPressEnterEvent from './withOnPressEnterEvent';

const useStyles = makeStyles(theme => ({
  content: {
    height: 'auto',
    cursor: 'pointer',
  },
}));

const Content = ({ inputRef, className, ...props }) => {
  const classes = useStyles();
  return (
    <div {...props} className={classnames(classes.content, className)}>
      {props.value || <br />}
    </div>
  );
};

export default withOnPressEnterEvent((props) => {
  const {
    inputComponent,
    inputProps,
  } = props;
  return (
    <TextField
      variant="outlined"
      {...props}
      InputLabelProps={{ shrink: !!props.value }}
      InputProps={{
        inputComponent: inputComponent || Content,
        inputProps: {
          // tabIndex: 0,
          ...inputProps,
        },
      }}
      onClick={(e) => {
        e.stopPropagation();
        e.preventDefault();
        const { onClick, disabled } = props;
        if (!disabled && onClick) {
          onClick(e);
        }
      }}
    />
  );
});
