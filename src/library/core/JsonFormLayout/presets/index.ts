/* eslint-disable no-param-reassign */
import { IFieldLink, FieldConfig } from '~/utils/InputLinker/core/interfaces';
import Button from '@material-ui/core/Button';
import {
  // FormSpace,
  // FormContent,
  FormPasswordInput,
  FormColorPicker,
  FormDatePicker,
  FormTimePicker,
  FormDateTimePicker,
} from '~/core/FormInputs';
// import FormDialogInput from '~/core/FormInputs/FormDialogInput';
import autoCalculablePreset from './autoCalculablePreset';
import {
  DateRangePreset,
  TimeRangePreset,
  DateTimeRangePreset,
} from './range/presets';

// import InputLinker from '~/utils/InputLinker';
import {
  FormTextFieldLikePreset,
  FormTextFieldPreset,
  FormPasswordVisibilityPreset,
  FormCheckboxPreset,
  DatePickerPreset,
  // assert,
  translateProp,
  createIgnoredPreset,
  // translateLabel,
} from '~/utils/InputLinker/helpers';

const _ = <
  FieldLink extends IFieldLink<FieldLink>
>() : { [s : string] : FieldConfig<FieldLink> } => ({
  text: {
    presets: [FormTextFieldPreset],
    // validate: value => assert(!!value, null, {
    //   key: 'usernameEmptyError',
    //   values: {
    //     emailAddress: '$t(emailAddress)',
    //     phoneNumber: '$t(phoneNumber)',
    //   },
    // }),
  },
  password: {
    presets: [FormTextFieldPreset],
    component: FormPasswordInput,
    // validate: value => assert(
    //   value != null && value !== '',
    //   null,
    //   { key: 'passwordEmptyError' },
    // ),
    cfgMiddlewares: {
      last: cfg => ({
        ...cfg,
        childLinks: [
          {
            name: `${cfg.name}Visibility`,
            presets: [FormPasswordVisibilityPreset],
            defaultValue: false,
          },
        ],
      }),
    },
  },
  checkbox: {
    presets: [FormCheckboxPreset],
    extraProps: { dense: 'true', color: 'primary' },
  },
  button: {
    presets: [createIgnoredPreset(Button)],
    component: Button,
  },
  colorInlinePicker: {
    presets: [FormTextFieldLikePreset],
    component: FormColorPicker,
    converter: {
      fromView: (([v]) => v),
    },
  },
  dateOld: {
    presets: [DatePickerPreset],
    extraProps: {
      variant: 'outlined',
      // InputProps: { style: { width: 140 } },
      fullWidth: true,
    },
  },
  date: {
    component: FormDatePicker,
    presets: [FormTextFieldLikePreset],
    converter: {
      fromView: ([v]) => v,
      toView: v => v,
    },
    extraProps: {
      // InputProps: { style: { width: 140 } },
      fullWidth: true,
    },
    mwRender: ({ handleChange, value }) => ({
      value,
      onChange: handleChange,
    }),
  },
  dateRange: {
    presets: [DateRangePreset<FieldLink>()],
  },
  time: {
    component: FormTimePicker,
    converter: {
      fromView: ([v]) => v,
      toView: v => v,
    },
    extraProps: {
      // InputProps: { style: { width: 140 } },
      fullWidth: true,
    },
    mwRender: ({ handleChange, value }) => ({
      value,
      onChange: handleChange,
    }),
  },
  timeRange: {
    presets: [TimeRangePreset<FieldLink>()],
  },
  dateTime: {
    component: FormDateTimePicker,
    converter: {
      fromView: ([v]) => v,
      toView: v => v,
    },
    extraProps: {
      // InputProps: { style: { width: 140 } },
      fullWidth: true,
    },
    mwRender: ({ handleChange, value }) => ({
      value,
      onChange: handleChange,
    }),
  },
  dateTimeRange: {
    presets: [DateTimeRangePreset<FieldLink>()],
  },
  submit: {
    presets: ['button'],
    extraProps: {
      variant: 'contained',
      color: 'primary',
      fullWidth: true,
    },
    mwRender: ({ link: { host, hostProps, linker } }) => ({
      className: hostProps.classesByNs.loginBtn,
      onClick: host.handleSubmit,
      // children: hostProps.countDownText,
    }),
  },
  // =========================
  translateProp,
  autoCalculable: autoCalculablePreset(),
});

export default _();
