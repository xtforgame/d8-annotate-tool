import React from 'react';
import MuiButton from '@material-ui/core/Button';

function getDisplayName(WrappedComponent) {
  return (WrappedComponent && (WrappedComponent.displayName || WrappedComponent.name)) || 'Component';
}

export default (options = {}) => (Dialog, Button = MuiButton) => {
  const {
    buttonProps: staticButtonProps,
    dialogProps: staticDialogProps,
  } = options;
  const DialogButtonHoc = class DialogButtonHoc extends React.PureComponent {
    static displayName = `makeButtonForDialog(${getDisplayName(Dialog)})`;

    state = {
      dialogOpen: false,
    };

    handleOpen = () => {
      this.setState({
        dialogOpen: true,
      });
    }

    handleClose = (result) => {
      this.setState({
        dialogOpen: false,
      });
      const {
        onClose,
      } = this.props;
      if (onClose) {
        onClose(result);
      }
    }

    render() {
      const {
        text = 'Open Dialog',
        buttonProps,
        dialogProps,
        children,
      } = this.props;

      const {
        dialogOpen,
      } = this.state;

      const bP = { ...staticButtonProps, ...buttonProps };
      const dP = { ...staticDialogProps, ...dialogProps };

      bP.children = children || bP.children || text;

      return (
        <React.Fragment>
          <Button
            {...bP}
            onClick={this.handleOpen}
          />
          {dialogOpen && (
            <Dialog
              {...dP}
              open={dialogOpen}
              onClose={this.handleClose}
            />
          )}
        </React.Fragment>
      );
    }
  };
  return DialogButtonHoc;
};
