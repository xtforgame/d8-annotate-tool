import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { FormPhoneOrEmailInput, FormSpace } from '~/core/FormInputs';
import CrudDialogEx from '~/core/Dialogs/CrudDialogEx';
import CrudForm from './CrudForm';
import logo from './logo.png';

const useStyles = makeStyles(theme => ({
  inline: {
    display: 'inline',
  },
}));

export default (props) => {
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [emailOrPhone, setEmailOrPhone] = useState(null);

  console.log('phoneNumber, email :', phoneNumber, email);

  return (
    <div style={{ margin: 16 }}>
      <FormPhoneOrEmailInput
        label="Phone"
        value={(phoneNumber && phoneNumber.rawInput) || ''}
        onChange={setPhoneNumber}
        enableEmail={false}
      />
      <FormSpace variant="content2" />
      <FormPhoneOrEmailInput
        label="Email"
        value={(email && email.rawInput) || ''}
        onChange={setEmail}
        enablePhone={false}
      />
      <FormSpace variant="content2" />
      <FormPhoneOrEmailInput
        label="EmailOrPhone"
        value={(emailOrPhone && emailOrPhone.rawInput) || ''}
        onChange={setEmailOrPhone}
      />
    </div>
  );
};
