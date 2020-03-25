/* eslint-disable no-param-reassign */
import React from 'react';
import moment from 'moment';
import { IFieldLink, FieldObjectConfig } from '~/utils/InputLinker/core/interfaces';
import FormDialogInput from '~/core/FormInputs/FormDialogInput';
import DateRange from '~/core/Range/DateTime/DateRange';
import TimeRange from '~/core/Range/DateTime/TimeRange';
import DateTimeRange from '~/core/Range/DateTime/DateTimeRange';
import RangeDialog from '~/core/Range/RangeDialog';
import {
  getDateDisplayFuncFromProps,
  getTimeDisplayFuncFromProps,
  getDateTimeDisplayFuncFromProps,
} from '~/core/FormInputs/FormDateTimePicker/utils';
import {
  normalizeDateTime,
  getDateRangeDisplayFunc,
} from '~/core/Range/DateTime/utils';

export const DateTimeRangePresetBase = <
  FieldLink extends IFieldLink<FieldLink>
>() : FieldObjectConfig<FieldLink> => ({
  converter: { fromView: ([v]) => v },
});

export const DateRangePreset = <
  FieldLink extends IFieldLink<FieldLink>
>() : FieldObjectConfig<FieldLink> => ({
  presets: [DateTimeRangePresetBase()],
  component: FormDialogInput,
  extraProps: {
    buttonProps: {
      inputProps: {
        style: { whiteSpace: 'pre-line' },
      },
      fullWidth: true,
    },
    renderDialog: ({
      label,
      title,
      open,
      handleClose,
      value,
      dialogProps,
    } : any) => (
      <RangeDialog
        title={title != null ? title : label}
        normalize={normalizeDateTime}
        open={open}
        onClose={handleClose}
        value={value}
        RangeInput={DateRange}
        {...dialogProps}
      />
    ),
  },
  cfgMiddlewares: {
    last: cfg => ({
      ...cfg,
      mwRender: ({
        props, value, handleChange, link: { host, hostProps, linker },
      }) => ({
        displayValue: getDateRangeDisplayFunc(getDateDisplayFuncFromProps(props)),
        value,
        onChange: handleChange,
      }),
    }),
  },
});

export const TimeRangePreset = <
  FieldLink extends IFieldLink<FieldLink>
>() : FieldObjectConfig<FieldLink> => ({
  presets: [DateTimeRangePresetBase()],
  component: FormDialogInput,
  extraProps: {
    buttonProps: {
      inputProps: {
        style: { whiteSpace: 'pre-line' },
      },
      fullWidth: true,
    },
    renderDialog: ({
      label,
      title,
      open,
      handleClose,
      value,
      dialogProps,
    } : any) => (
      <RangeDialog
        title={title != null ? title : label}
        normalize={normalizeDateTime}
        open={open}
        onClose={handleClose}
        value={value}
        RangeInput={TimeRange}
        {...dialogProps}
      />
    ),
  },
  cfgMiddlewares: {
    last: cfg => ({
      ...cfg,
      mwRender: ({
        props, value, handleChange, link: { host, hostProps, linker },
      }) => ({
        displayValue: getDateRangeDisplayFunc(getTimeDisplayFuncFromProps(props)),
        value,
        onChange: handleChange,
      }),
    }),
  },
});

export const DateTimeRangePreset = <
FieldLink extends IFieldLink<FieldLink>
>() : FieldObjectConfig<FieldLink> => ({
  presets: [DateTimeRangePresetBase()],
  component: FormDialogInput,
  extraProps: {
    buttonProps: {
      inputProps: {
        style: { whiteSpace: 'pre-line' },
      },
      fullWidth: true,
    },
    renderDialog: ({
      label,
      title,
      open,
      handleClose,
      value,
      dialogProps,
    } : any) => (
      <RangeDialog
        title={title != null ? title : label}
        normalize={normalizeDateTime}
        open={open}
        onClose={handleClose}
        value={value}
        RangeInput={DateTimeRange}
        {...dialogProps}
      />
    ),
  },
  cfgMiddlewares: {
    last: cfg => ({
      ...cfg,
      mwRender: ({
        props, value, handleChange,
      }) => ({
        displayValue: getDateRangeDisplayFunc(getDateTimeDisplayFuncFromProps(props)),
        value,
        onChange: handleChange,
      }),
    }),
  },
});
