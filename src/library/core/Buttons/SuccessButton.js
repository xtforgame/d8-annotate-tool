import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import createButtonStyles from '~/styles/Buttons';


const useStyles = makeStyles(theme => ({
  ...createButtonStyles(theme, 'success'),
}));

const SuccessButton = (props) => {
  const classes = useStyles();
  return (
    <Button
      variant="contained"
      color="primary"
      classes={{
        containedPrimary: classes.containedPrimary,
      }}
      {...props}
    />
  );
};

SuccessButton.displayName = 'SuccessButton';

export default SuccessButton;
