/* eslint-disable react/no-multi-comp */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import SearchToolbar from '~/core/Toolbars/SearchToolbar';
import SimpleFullScreenDialog from '~/core/Dialogs/SimpleFullScreenDialog';
import IconWithTextToolbar from '~/core/Toolbars/IconWithTextToolbar';
import createCommonStyles from '~/styles/common';

const useStyles = makeStyles(theme => ({
  ...createCommonStyles(theme, ['flex']),
}));

export default (props) => {
  const {
    selectedValue,
    editingParams = {},
    children,

    picker,
    editor,

    withoutList,
    withoutCreate,

    crudFormOpen,
    onBackToList = () => {},

    texts: {
      edit: editTatget = '編輯對象',
      create: createTatget = '新增對象',
      pick: pickTatget = '選擇對象',
    } = {},

    onSearchTextChange,
    searchText,

    onStartSearch = () => undefined,
    onFinishSearch = () => undefined,

    ...dialogProps
  } = props;
  const { editingSource } = editingParams;

  const classes = useStyles();

  const [isSearching, setIsSearching] = useState(false);


  const handleClose = () => {
    if (props.onClose) {
      props.onClose(props.selectedValue);
    }
  };

  const handleBackToList = () => {
    if (onBackToList) {
      onBackToList(props.selectedValue);
    }
  };

  const leaveCrudForm = () => {
    if (withoutList) {
      handleClose();
    } else {
      handleBackToList();
    }
  };

  const startSearch = () => {
    onStartSearch();
    setIsSearching(true);
  };

  const finishSearch = () => {
    onFinishSearch();
    setIsSearching(false);
  };

  let toolbar;
  if (crudFormOpen) {
    toolbar = (
      <IconWithTextToolbar
        headerLeftIcon={withoutList ? <CloseIcon /> : <ArrowBackIcon />}
        onLeftButtonClick={leaveCrudForm}
        title={editingSource ? editTatget : createTatget}
      />
    );
  } else if (isSearching) {
    toolbar = <SearchToolbar value={searchText} onChange={onSearchTextChange} onCancel={finishSearch} />;
  } else {
    toolbar = (
      <IconWithTextToolbar
        headerLeftIcon={<CloseIcon />}
        onLeftButtonClick={handleClose}
        title={picker ? pickTatget : editTatget}
        headerContent={(
          <IconButton color="inherit" onClick={startSearch} aria-label="Search">
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
};
