/* eslint-disable react/no-multi-comp */

import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiList from '@material-ui/core/List';
import SwipeableViews from 'react-swipeable-views';
import CrudDialog from '~/core/Dialogs/CrudDialog';
import createCommonStyles from '~/styles/common';

const useStyles = makeStyles(theme => ({
  ...createCommonStyles(theme, ['flex']),
}));

export default (props) => {
  const {
    picker,
    editor,
    multiple,
    onClose = () => {},

    withoutList,
    // onClose,
    selectedValue,

    editingParams: eP = {},

    List = MuiList,
    listProps,

    list: l,
    applySearchText = () => true,
    renderListItem = (() => undefined),
    renderAddItem = (() => undefined),
    addItemPlacement = 'end',

    CrudForm,
    crudFormProps,

    onSearchTextChange,
    onStartSearch,
    onFinishSearch,
    onSubmit = () => {},
    ...other
  } = props;

  const classes = useStyles();

  const [pickSet, setPickSet] = useState(new Set());
  const [formKey, setFormKey] = useState(0);
  const [viewIndex, setViewIndex] = useState(withoutList ? 1 : 0);
  const [editingSource, setEditingSource] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);
  const [otherEditingParams, setOtherEditingParams] = useState(null);
  const [searchText, setSearchText] = useState(null);

  const handleItemClick = (value, index) => {
    if (picker) {
      if (multiple) {
        const newSet = new Set(pickSet);
        if (newSet.has(value)) {
          newSet.delete(value);
        } else {
          newSet.add(value);
        }
        setPickSet(newSet);
      }
      onClose(value);
    } else {
      setFormKey(formKey + 1);
      setViewIndex(1);
      setEditingSource(value);
      setEditingIndex(index);
    }
  };

  const startCreate = (_otherEditingParams) => {
    setFormKey(formKey + 1);
    setViewIndex(1);
    setEditingSource(null);
    setEditingIndex(null);
    setOtherEditingParams(_otherEditingParams);
  };

  const switchToList = () => {
    // setFormKey(formKey + 1);
    setViewIndex(0);
    setEditingSource(null);
    setEditingIndex(null);
  };

  const cancelCreate = () => {
    if (withoutList) {
      onClose();
    } else {
      switchToList();
    }
  };

  const handleSubmit = editingParams => (result) => {
    if (!picker && !withoutList) {
      switchToList();
    }
    onSubmit(result, editingParams, editingIndex);
  };

  const handleSearchTextChange = cbType => (e, ...args) => {
    const searchText = e ? e.target.value : null;
    setSearchText(searchText);
    const cb = props[cbType];
    if (cb) {
      cb(searchText, e, ...args);
    }
  };

  const editingParams = { ...eP, ...otherEditingParams };
  if (editingSource) {
    editingParams.editingSource = editingSource;
  }

  let list = [...l];

  if (searchText) {
    list = list.filter(item => applySearchText(searchText, item));
  }

  const addItem = renderAddItem({
    handleItemClick: startCreate,
  });

  return (
    <CrudDialog
      picker={picker}
      editor={editor}
      editingParams={editingParams}
      selectedValue={selectedValue}
      crudFormOpen={!!viewIndex}
      onBackToList={switchToList}

      searchText={searchText || ''}
      onSearchTextChange={handleSearchTextChange('onSearchTextChange')}
      onStartSearch={handleSearchTextChange('onStartSearch')}
      onFinishSearch={handleSearchTextChange('onFinishSearch')}
      onClose={onClose}
      withoutList={withoutList}
      {...other}
    >
      <SwipeableViews
        index={viewIndex}
        {...{}/* onChangeIndex={handleChangeIndex} */}
        style={{ flex: 1 }}
        containerStyle={{ height: '100%' }}
        disabled
      >
        <List {...listProps}>
          { addItemPlacement === 'start' && addItem }
          {list.map(
            (...args) => renderListItem({
              picked: pickSet.has(args[0]),
              handleItemClick: handleItemClick.bind(null, args[0], args[1]),
            }, ...args)
          )}
          { addItemPlacement === 'end' && addItem }
        </List>
        <div className={classes.verticalFlexContainerFWFH}>
          <CrudForm
            key={formKey}
            {...crudFormProps}
            editingParams={editingParams}
            onDone={handleItemClick}
            onCancel={cancelCreate}
            onSubmit={handleSubmit(editingParams)}
          />
        </div>
      </SwipeableViews>
    </CrudDialog>
  );
};
