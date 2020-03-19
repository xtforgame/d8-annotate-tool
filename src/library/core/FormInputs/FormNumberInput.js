/* eslint-disable react/prop-types, react/forbid-prop-types */
import React from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormTextField from './FormTextField';
import NumberFormatInput from './NumberFormatInput';

export default (props) => {
  const {
    currency,
    thousandSeparator = true,
    InputProps: IPs,
    ...rest
  } = props;
  let InputProps = {
    inputComponent: NumberFormatInput,
    inputProps: {
      decimalScale: 0,
      thousandSeparator,
      // prefix: '$',
    },
  };

  if (currency) {
    InputProps.startAdornment = <InputAdornment position="start">$</InputAdornment>;
  }

  InputProps = {
    ...InputProps,
    ...IPs,
  };

  return (
    <FormTextField
      InputProps={InputProps}
      {...rest}
    />
  );
};
