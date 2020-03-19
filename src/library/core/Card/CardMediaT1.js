import React from 'react';
import classnames from 'classnames';
import { makeStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(theme => ({
  media: {
    height: 200,
  },
}));

export default (props) => {
  const {
    className,
    ...rest
  } = props;
  const classes = useStyles();
  return (
    <CardMedia
      className={classnames(classes.media, className)}
      {...rest}
    />
  );
};
