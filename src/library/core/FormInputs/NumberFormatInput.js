import React from 'react';
import NumberFormat from 'react-number-format';

export default class NumberFormatInput extends React.PureComponent {
  render() {
    const { inputRef, onChange, ...other } = this.props;

    return (
      <NumberFormat
        getInputRef={inputRef}
        isNumericString
        onValueChange={(values) => {
          onChange({ target: { value: values.value } });
        }}
        {...other}
      />
    );
  }
}
