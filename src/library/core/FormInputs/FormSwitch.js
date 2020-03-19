/* eslint-disable react/prop-types, react/forbid-prop-types */
import React from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';

const styles = theme => ({
});

const FormSwitch = (props) => {
  const {
    label,
    helperText,
    labelProps,
    classes,
    ...rest
  } = props;
  return (
    <FormControlLabel
      label={label}
      labelPlacement="start"
      control={(
        <Switch
          color="primary"
          {...rest}
        />
      )}
      {...labelProps}
    />
  );
};

FormSwitch.propTypes = {};

export default compose(
  withStyles(styles),
)(FormSwitch);
