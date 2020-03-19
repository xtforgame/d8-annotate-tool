/* eslint-disable jsx-a11y/label-has-associated-control, no-underscore-dangle */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  halfHeight: {
    height: '50%',
  },
  media: {
    position: 'relative',
    height: 150,
  },
});

class CardMediaType001 extends React.PureComponent {
  render() {
    const { classes, children, ...rest } = this.props;

    return (
      <CardMedia className={classes.media} {...rest}>
        <div className={classes.halfHeight} />
        {children}
      </CardMedia>
    );
  }
}

export default withStyles(styles)(CardMediaType001);
