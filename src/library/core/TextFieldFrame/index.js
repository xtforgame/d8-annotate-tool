/* eslint-disable react/prop-types, react/forbid-prop-types */
import React from 'react';
import TextField from '@material-ui/core/TextField';

const getDefaultOnChange = (props, blockEvent) => (e) => {
  if (e.stopPropagation && e.preventDefault && blockEvent) {
    e.stopPropagation();
    e.preventDefault();
  } else {
    const { onChange } = props;
    if (onChange) {
      onChange(e);
    }
  }
};

const getDefaultOnClick = (props, blockEvent) => (e) => {
  if (blockEvent) {
    e.stopPropagation();
    e.preventDefault();
  }
  const { onClick } = props;
  if (onClick) {
    onClick(e);
  }
};

export default ({ inputProps, dontBlockEvent, Content, ...props }) => (
  <TextField
    variant="outlined"
    {...props}
    value=" "
    InputLabelProps={{ shrink: true }}
    InputProps={{
      inputComponent: Content,
      inputProps,
    }}
    onChange={getDefaultOnChange(props, !dontBlockEvent)}
    onClick={getDefaultOnClick(props, !dontBlockEvent)}
  />
);
