/* eslint-disable react/prop-types, react/forbid-prop-types, no-new-func */
import React, { useState, useEffect } from 'react';
import ConfirmDialog from '~/core/Dialogs/ConfirmDialog';
import { JsonFormLinker, OnChangeFunction, OnChangesFunction } from '~/core/JsonFormLayout';
import { buildJsonConfig } from '~/core/JsonFormLayout/utils';
import ProgressWithMask from '~/core/Progress/ProgressWithMask';
import FieldLink from '~/utils/InputLinker/core/FieldLink';
import EditorForm from './EditorForm';

import getJsonConfig from './getJsonConfig';

const jsonConfig = getJsonConfig<FieldLink, JsonFormLinker<FieldLink>>();

export default (props : any) => {
  const {
    label,
    value: v = {},
    onClose = (() => {}),
    onExited,
    ...rest
  } = props;

  const [value, setValue] = useState<any>(v);
  const [formReady, setFormReady] = useState<boolean>(false);

  useEffect(
    () => {
      setFormReady(false);
      buildJsonConfig(jsonConfig)
      .then(() => {
        setFormReady(true);
      })
      .catch((error) => {
        console.log('error :', error);
        setFormReady(true);
      });
    },
    [],
  );

  const handleClose = (_result : any) => {
    let result = _result;
    if (result === true) {
      result = value;
    } else {
      result = undefined;
    }
    onClose(result);
  }

  const handleEnterForTextField = (event : any) => {
    if (event.key === 'Enter') {
      handleClose(true);
      event.preventDefault();
    }
  };

  const handleChange : OnChangeFunction<
    FieldLink, JsonFormLinker<FieldLink>
  > = (value, rawArgs, link, values) => {
    /* another work-around for the cursor issue */
    // setValue({ ...values });
  }

  const handleChanges : OnChangesFunction<
    FieldLink, JsonFormLinker<FieldLink>
  > = (changes, linker, values) => {
    /* another work-around for the cursor issue */
    // if (changes.length < 2) {
    //   // already handled by handleChange
    //   return;
    // }
    setValue({ ...values });
  };

  // console.log('jsonConfig :', jsonConfig);

  if (!formReady) {
    return (<ProgressWithMask delay={300} />);
  }

  return (
    <ConfirmDialog
      {...rest}
      onClose={handleClose}
      dialogProps={{ onExited }}
    >
      <EditorForm<FieldLink, JsonFormLinker<FieldLink>>
        jsonConfig={jsonConfig}
        Linker={JsonFormLinker}
        linkerOptions={{
          presets: {},
        }}
        value={value}
        onChange={handleChange}
        onChanges={handleChanges}
        onDidMount={(linker) => {
          // if (!('password' in linker.host.props.value)) {
          //   linker.changeValues({
          //     password: 'password',
          //     passwordVisibility: true,
          //   });
          // }
        }}
        styleNs={['login']}
        i18nNs={['app-common']}
        onSubmit={(outputs, { resetIl }) => {
          resetIl();
          console.warn('outputs :', outputs);
        }}
        submitButtonText="登入"
      />
    </ConfirmDialog>
  );
}
