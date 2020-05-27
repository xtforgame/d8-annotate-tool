/* eslint-disable react/prop-types, react/forbid-prop-types, no-empty */
import React, { useState } from 'react';
import { compose } from 'recompose';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Email from '@material-ui/icons/Email';
import Phone from '@material-ui/icons/Phone';

import /* libphonenumber, */ {
  PhoneNumberFormat as PNF,
  PhoneNumberUtil,
} from 'google-libphonenumber';
import { isValidEmail } from '~/common/utils/validators';
import FormTextField from '../FormTextField';
import PhoneRegionSelect from './PhoneRegionSelect';
import { getCountryCodeFromBrowser } from './langToCountry';

const country = getCountryCodeFromBrowser();
const phoneUtil = PhoneNumberUtil.getInstance();

export const isValidPhoneNumber = (value) => {
  try {
    const number = phoneUtil.parseAndKeepRawInput(value, country);
    return phoneUtil.isValidNumber(number);
  } catch (error) {}
  return false;
};
export { isValidEmail };


const styles = theme => ({
  adornment: {
    marginRight: 0,
  },
});

const rawInputToState = (rawInput, enablePhone = true, enableEmail = true) => {
  let regionCode = null;
  let value = rawInput;
  let number = null;
  let type;

  if (enablePhone) {
    try {
      number = phoneUtil.parseAndKeepRawInput(rawInput, country);
      // console.log('CountryCode:', number.getCountryCode());
      // console.log('NationalNumber:', number.getNationalNumber());
      // console.log('RegionCodeForNumber:', phoneUtil.getRegionCodeForNumber(number));
      // const formattedPhoneNumber = phoneUtil.format(number, /*PNF.NATIONAL*/ PNF.INTERNATIONAL);
      // console.log(formattedPhoneNumber);
      if (phoneUtil.isValidNumber(number)) {
        type = 'phone-number';
      }
      // e.target.value = formattedPhoneNumber;
      regionCode = phoneUtil.getRegionCodeForNumber(number);
      value = phoneUtil.format(number, PNF.E164);
    } catch (error) {}
  }

  if (enableEmail && isValidEmail(rawInput)) {
    type = 'email-address';
  }

  return {
    rawInput,
    value,
    regionCode,
    type,
  };
};

const FormPhoneOrEmailInput = (props) => {
  const {
    id,
    classes,
    enablePhone: eP,
    enableEmail: eE,
    onChange = () => {},
    ...rest
  } = props;

  const [enablePhone] = useState(eP == null ? true : eP);
  const [enableEmail] = useState(eE == null ? true : eE);
  const [state, setState] = useState({
    ...rawInputToState(props.value, enablePhone, enableEmail),
  });

  const handleChange = (e) => {
    const s = rawInputToState(e.target.value || '', enablePhone, enableEmail);
    onChange(s);
    setState(s);
  };

  const { regionCode, type } = state;

  const startAdornment = (
    <InputAdornment
      position="start"
      className={classes.adornment}
    >
      {regionCode != null ? <PhoneRegionSelect regionCode={regionCode} />
        : (
          <IconButton
            tabIndex="-1"
            onMouseDown={(event) => {
              event.preventDefault();
            }}
          >
            {enableEmail ? <Email color={type ? 'primary' : ''} /> : <Phone />}
          </IconButton>
        )
      }
    </InputAdornment>
  );
  return (
    <FormTextField
      id={id}
      InputProps={{
        startAdornment,
      }}
      {...rest}
      onChange={handleChange}
    />
  );
};

FormPhoneOrEmailInput.propTypes = {
  id: PropTypes.string.isRequired,
};

export default compose(
  withStyles(styles),
)(FormPhoneOrEmailInput);
