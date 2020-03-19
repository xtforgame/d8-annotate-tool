import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { HeaderSearchInput } from '~/core/FormInputs';

import createCommonStyles from '~/styles/common';

const styles = theme => ({
  ...createCommonStyles(theme, ['flex', 'appBar']),
  grow: {
    flexGrow: 1,
  },
});

class SearchToolbar extends React.PureComponent {
  render() {
    const {
      classes,
      value,
      onChange,
      onCancel,
      toolbarProps,
    } = this.props;

    return (
      <Toolbar {...toolbarProps}>
        <React.Fragment>
          <div className={classes.grow} />
          <HeaderSearchInput value={value} onChange={onChange} />
          <IconButton
            color="inherit"
            onClick={onCancel}
            aria-label="Search"
          >
            <CloseIcon />
          </IconButton>
        </React.Fragment>
      </Toolbar>
    );
  }
}

export default withStyles(styles)(SearchToolbar);
