
/* eslint-disable jsx-a11y/label-has-associated-control, no-underscore-dangle */
/* eslint-disable react/prop-types, react/forbid-prop-types, jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import FormFileInputWithMask from './FormFileInputWithMask';

const styles = theme => ({
  avatar: {
    color: theme.palette.common.white,
    margin: 'auto',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
  },
  default: {
    color: theme.palette.common.white,
    margin: 'auto',
    position: 'absolute',
    top: 0,
    right: 0,
    width: 56,
    height: 56,
  },
});

const FormImageButtonWithMask = (props) => {
  const {
    classes,
    variant = 'default',
    Icon = PhotoCamera,
    buttonProps,
    iconProps,
    ...inputProps
  } = props;
  return (
    <FormFileInputWithMask
      accept="image/*"
      {...inputProps}
    >
      <IconButton
        component="span"
        className={classes[variant]}
        {...buttonProps}
      >
        <Icon {...iconProps} />
      </IconButton>
    </FormFileInputWithMask>
  );
};

FormImageButtonWithMask.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(FormImageButtonWithMask);
