/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useExpansion from '~/core/Card/useExpansion';

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: 8,
    marginBottom: 8,
    maxWidth: 400,
  },
  expand: {
    marginLeft: 'auto',
    marginRight: -8,
    [theme.breakpoints.up('sm')]: {
      marginRight: 0,
    },
  },
  headerRoot: {},
  headerAction: {
    // marginTop: 'unset',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  headerContent: {
    overflowX: 'hidden',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 'unset',
    },
  },
  contentRoot: {
    padding: 8,
    '&:last-child': {
      paddingBottom: 8,
    },
    [theme.breakpoints.up('sm')]: {
      padding: 24,
      '&:last-child': {
        paddingBottom: 24,
      },
    },
  },
}));

export default (props) => {
  const {
    avatar,
    title,
    subheader,
    children,
    cardClassName,
    headerClassName,
    withoutCardContent,
  } = props;

  const classes = useStyles();

  const {
    iconButtonClassName,
    expanded,
    toggleExpanded,
  } = useExpansion({
    defaultExpanded: 'defaultExpanded' in props ? props.defaultExpanded : false,
    iconButtonClassName: classes.expand,
  });

  const content = withoutCardContent ? children : (
    <CardContent
      classes={{
        root: classes.contentRoot,
      }}
    >
      {children}
    </CardContent>
  );

  return (
    <Card className={classnames(classes.card, cardClassName)}>
      <CardHeader
        avatar={avatar}
        classes={{
          root: classes.headerRoot,
          action: classes.headerAction,
          content: classes.headerContent,
        }}
        className={headerClassName}
        action={(
          <IconButton
            className={iconButtonClassName}
            onClick={toggleExpanded}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        )}
        title={title}
        subheader={subheader}
      />
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {content}
      </Collapse>
    </Card>
  );
};
