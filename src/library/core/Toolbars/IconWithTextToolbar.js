import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import createCommonStyles from '~/styles/common';

const styles = theme => createCommonStyles(theme, ['flex', 'appBar']);

class IconWithTextToolbar extends React.PureComponent {
  render() {
    const {
      classes,
      title,
      headerLeftButton,
      headerLeftIcon,
      disableHeaderLeftButton,
      headerContent,
      onLeftButtonClick,
      toolbarProps,
    } = this.props;

    return (
      <Toolbar {...toolbarProps}>
        {!disableHeaderLeftButton && (headerLeftButton || (
          <IconButton color="inherit" className={classes.menuButton} onClick={onLeftButtonClick} aria-label="Close">
            {headerLeftIcon || <CloseIcon />}
          </IconButton>
        ))}
        {title && (
          <Typography variant="h6" color="inherit" className={classes.flex1}>
            {title}
          </Typography>
        )}
        {headerContent}
        {/* <Button color="inherit" onClick={onClose}>
          save
        </Button> */}
      </Toolbar>
    );
  }
}

export default withStyles(styles)(IconWithTextToolbar);
