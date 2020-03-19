/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';

const useStyles = makeStyles(theme => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default (props) => {
  const {
    defaultExpanded,
    iconButtonClassName: cn = '',
  } = props;

  const classes = useStyles();

  const [expanded, setExpanded] = useState(defaultExpanded);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const iconButtonClassName = classnames(classes.expand, {
    [classes.expandOpen]: expanded,
  }, cn);

  return {
    iconButtonClassName,
    expanded,
    setExpanded,
    toggleExpanded,
  };
};
