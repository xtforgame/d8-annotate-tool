/* eslint-disable import/prefer-default-export */
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiMenu from '@material-ui/core/Menu';
import { FormFieldButton } from '~/core/FormInputs';

const useStyles = makeStyles(theme => ({
}));

export default (props) => {
  const {
    id,
    options = [],
    getMenuItem = () => null,
    value,
    onChange = () => {},
    toInputValue = (value, i) => '',
    toButtonValue: tbv,
    Menu = MuiMenu,
    ...p
  } = props;

  const toButtonValue = tbv || toInputValue;

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleOptionClick = (event, option, index) => {
    onChange(event, option, index);
    setOpen(false);
  };

  const handleClick = (event) => {
    setOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const handleRequestClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <FormFieldButton
        {...p}
        onClick={handleClick}
        value={toInputValue(value)}
      >
        {toButtonValue(value)}
      </FormFieldButton>
      <Menu
        id={id}
        anchorEl={anchorEl}
        open={open}
        onClose={handleRequestClose}
      >
        {
          options.map((option, index) => getMenuItem({
            option,
            index,
            selectedOption: option,
            isSelected: option === value,
            handleOptionClick: event => handleOptionClick(event, option, index),
          }))
        }
      </Menu>
    </React.Fragment>
  );
};
