/* eslint-disable react/prop-types, react/forbid-prop-types, jsx-a11y/label-has-associated-control */
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormFileInput from './FormFileInput';

const styles = theme => ({
  mask: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
});

const FormFileInputWithMask = (props) => {
  const {
    classes,
    ...inputProps
  } = props;
  return (
    <React.Fragment>
      <div className={classes.mask} />
      <FormFileInput {...inputProps} />
    </React.Fragment>
  );
};

FormFileInputWithMask.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withStyles(styles)(FormFileInputWithMask);
