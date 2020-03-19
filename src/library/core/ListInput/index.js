/* eslint-disable react/prop-types, react/forbid-prop-types */
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import uuidv4 from 'uuid/v4';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import RemoveCircleOutlinedIcon from '@material-ui/icons/RemoveCircleOutlined';
import DialogContent from '@material-ui/core/DialogContent';
import ConfirmDialogV2 from '~/core/Dialogs/ConfirmDialogV2';
import useDialogState, { Cancel } from '~/hooks/useDialogState';
import TextFieldFrame from '../TextFieldFrame';

const Content = ({ inputRef, handleOpen, handleDelete, display, value, ...props }) => (
  <div {...props} style={{ height: 'auto', maxHeight: 250, overflowY: 'auto' }}>
    <List
      dense
      disablePadding
    >
      <ListItem divider button onClick={() => { handleOpen(); }}>
        <ListItemText
          primary="新增"
          secondary="(新增一筆資料)"
        />
        <ListItemSecondaryAction>
          <IconButton
            aria-label="Add"
            onClick={() => { handleOpen(); }}
          >
            <AddCircleOutlinedIcon color="primary" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
      {
        value.map((v, i) => {
          const valueToDisplay = display(v, i, value);
          let elem;
          if (typeof valueToDisplay === 'string') {
            elem = (
              <ListItemText
                primary={valueToDisplay}
              />
            );
          } else if (Array.isArray(valueToDisplay) && valueToDisplay.length === 2) {
            elem = (
              <ListItemText
                primary={valueToDisplay[0]}
                secondary={valueToDisplay[1]}
              />
            );
          } else {
            elem = valueToDisplay;
          }
          return (
            <ListItem
              key={v.id}
              dense
              divider
              button
              onClick={() => { handleOpen(v); }}
            >
              {elem}
              <ListItemSecondaryAction>
                <IconButton
                  aria-label="Remove"
                  onClick={() => { handleDelete(i); }}
                >
                  <RemoveCircleOutlinedIcon color="secondary" />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          );
        })
      }
    </List>
  </div>
);

export const newItemId = Symbol('new-item');

export default ({
  value: v,
  onChange = () => {},
  newItem = () => ({}),
  display = item => item.data,
  dialogProps,
  renderInput = () => null,
  ...props
}) => {
  const [editingInfo, setEditingInfo] = useState({});
  const { t } = useTranslation(['builtin-components']);

  const value = v || [];

  const [{
    exited,
    dialogProps: dp2,
  }, {
    handleOpen,
    // handleClose,
    // handleExited,
  }] = useDialogState({
    dialogProps,
    open: (v) => {
      const v2 = v ? { ...v } : { id: newItemId, ...newItem() };
      setEditingInfo(v2);
    },
    close: (v) => {
      if (v) {
        if (editingInfo && editingInfo.id === newItemId) {
          editingInfo.id = uuidv4();
          onChange([...value, editingInfo]);
        } else if (editingInfo) {
          const index = value.findIndex(i => i.id === editingInfo.id);
          if (index >= 0) {
            const newValue = [...value];
            newValue[index] = editingInfo;
            onChange(newValue);
          }
        }
      }
      setEditingInfo({});
    },
  });

  const handleDelete = (index) => {
    const newValue = [...value];
    newValue.splice(index, 1);
    onChange(newValue);
  };

  return (
    <React.Fragment>
      <TextFieldFrame
        {...props}
        value=" "
        Content={Content}
        InputLabelProps={{ shrink: true }}
        inputProps={{
          value,
          handleOpen,
          handleDelete,
          display,
        }}
      />
      {(!exited) && (
        <ConfirmDialogV2
          {...dp2}
          buttonTexts={{
            yes: t('confirmOK'),
            no: t('confirmCancel'),
          }}
        >
          <DialogContent>
            {renderInput({
              value: editingInfo.data,
              onChange: data => setEditingInfo({ ...editingInfo, data }),
            })}
          </DialogContent>
        </ConfirmDialogV2>
      )}
    </React.Fragment>
  );
};
