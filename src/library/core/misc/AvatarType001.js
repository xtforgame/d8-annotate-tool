/* eslint-disable jsx-a11y/label-has-associated-control, no-underscore-dangle */
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const styles = theme => ({
  avatarImage: {
    width: '100%',
    height: '100%',
    textAlign: 'center',
    objectFit: 'cover',
  },
});

class AvatarType001 extends React.PureComponent {
  render() {
    const {
      classes,
      image,
      children,
      ...rest
    } = this.props;

    return (
      <Avatar {...rest}>
        <img alt="me" src={image} className={classes.avatarImage} />
        {children}
      </Avatar>
    );
  }
}

export default withStyles(styles)(AvatarType001);
