/* eslint-disable react/no-array-index-key, jsx-a11y/alt-text */
import React from 'react';
import classnames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import componentSize from './componentSize';

const cardStyles = theme => ({
  card: {
    width: componentSize.width,
    height: componentSize.height,
    cursor: 'move',
    background: '#888888',
    position: 'relative',
  },
  image: {
    position: 'absolute',
    filter: 'opacity(.2)',
  },
  cardContent: {
    padding: 4,
    position: 'relative',
  },
  title: {
    fontSize: 12,
  },
  dragPreview: {
    // background: '#888888',
    position: 'fixed',
    zIndex: 100,
    left: 0,
    top: 0,
    opacity: 1,
    transition: 'none',
    pointerEvents: 'none',
    WebkitTouchCallout: 'none',
  },
});

class SdaComponentDisplay extends React.Component {
  render() {
    const {
      classes,
      name,
      children,
      isDragPreview,
      ...props
    } = this.props;

    const className = isDragPreview ? classnames(classes.card, classes.dragPreview) : classes.card;
    const mainIcon = this.props.configs && this.props.configs.mainIcon;

    return (
      <Card {...props} className={className}>
        {mainIcon && (
          <img
            src={mainIcon}
            width={componentSize.width}
            height={componentSize.height}
            className={classes.image}
          />
        )}
        <CardContent className={classes.cardContent}>
          <Typography className={classes.title} color="textSecondary" gutterBottom>
            {name}
          </Typography>
          {children}
        </CardContent>
      </Card>
    );
  }
}


export default withStyles(cardStyles)(SdaComponentDisplay);
