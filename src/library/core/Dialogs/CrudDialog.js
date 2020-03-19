/* eslint-disable react/no-multi-comp */

import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchToolbar from '~/core/Toolbars/SearchToolbar';
import SearchIcon from '@material-ui/icons/Search';
import SimpleFullScreenDialog from '~/core/Dialogs/SimpleFullScreenDialog';
import IconWithTextToolbar from '~/core/Toolbars/IconWithTextToolbar';
import createCommonStyles from '~/styles/common';

const styles = theme => ({
  ...createCommonStyles(theme, ['flex']),
});

class CrudDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isSearching: false };
  }

  handleClose = () => {
    if (this.props.onClose) {
      this.props.onClose(this.props.selectedValue);
    }
  };

  handleBackToList = () => {
    if (this.props.onBackToList) {
      this.props.onBackToList(this.props.selectedValue);
    }
  };

  leaveCrudForm = () => {
    if (this.props.withoutList) {
      this.handleClose();
    } else {
      this.handleBackToList();
    }
  }

  startSearch = () => {
    const {
      onStartSearch = () => undefined,
    } = this.props;
    onStartSearch();
    this.setState({ isSearching: true });
  };

  finishSearch = () => {
    const {
      onFinishSearch = () => undefined,
    } = this.props;
    onFinishSearch();
    this.setState({ isSearching: false });
  };

  render() {
    const {
      classes,
      selectedValue,
      editingParams = {},
      children,

      picker,
      editor,

      withoutList,
      withoutCreate,

      crudFormOpen,
      onBackToList,

      texts: {
        edit: editTatget = '編輯對象',
        create: createTatget = '新增對象',
        pick: pickTatget = '選擇對象',
      } = {},

      onSearchTextChange,
      searchText,

      onStartSearch,
      onFinishSearch,

      ...dialogProps
    } = this.props;

    const { editingSource } = editingParams;
    const { isSearching } = this.state;

    let toolbar;
    if (crudFormOpen) {
      toolbar = (
        <IconWithTextToolbar
          headerLeftIcon={withoutList ? <CloseIcon /> : <ArrowBackIcon />}
          onLeftButtonClick={this.leaveCrudForm}
          title={editingSource ? editTatget : createTatget}
        />
      );
    } else if (isSearching) {
      toolbar = <SearchToolbar value={searchText} onChange={onSearchTextChange} onCancel={this.finishSearch} />;
    } else {
      toolbar = (
        <IconWithTextToolbar
          headerLeftIcon={<CloseIcon />}
          onLeftButtonClick={this.handleClose}
          title={picker ? pickTatget : editTatget}
          headerContent={(
            <IconButton color="inherit" onClick={this.startSearch} aria-label="Search">
              <SearchIcon />
            </IconButton>
          )}
        />
      );
    }

    return (
      <SimpleFullScreenDialog
        aria-labelledby="simple-dialog-title"
        PaperProps={{
          className: classes.verticalFlexContainerFWFH,
          style: { overflowY: 'hidden' },
        }}
        toolbar={toolbar}
        {...dialogProps}
      >
        {children}
      </SimpleFullScreenDialog>
    );
  }
}

export default compose(
  withStyles(styles),
)(CrudDialog);
