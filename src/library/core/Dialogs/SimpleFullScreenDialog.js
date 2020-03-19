import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import IconWithTextToolbar from '~/core/Toolbars/IconWithTextToolbar';
import createCommonStyles from '~/styles/common';

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  ...createCommonStyles(theme, ['flex', 'appBar']),
});

class SimpleFullScreenDialog extends React.PureComponent {
  render() {
    const {
      classes,
      title,
      headerLeftButton,
      headerLeftIcon,
      disableHeaderLeftButton,
      headerContent,
      children,
      open,
      onClose,
      className,
      toolbar,
      appBarProps,
      toolbarProps,
      PaperProps,
      ...rest
    } = this.props;

    return (
      <Dialog
        fullScreen
        open={open}
        onClose={onClose}
        className={className}
        PaperProps={{ square: true, ...PaperProps }}
        {...rest}
      >
        <AppBar className={classes.appBar} {...appBarProps}>
          {toolbar || (
            <IconWithTextToolbar
              title={title}
              headerLeftButton={headerLeftButton}
              headerLeftIcon={headerLeftIcon}
              disableHeaderLeftButton={disableHeaderLeftButton}
              headerContent={headerContent}
              toolbarProps={toolbarProps}
              onLeftButtonClick={onClose}
            />
          )}
        </AppBar>
        {children}
      </Dialog>
    );
  }
}

export default withStyles(styles)(SimpleFullScreenDialog);
