/* eslint-disable no-param-reassign */
import React, { useEffect, useRef /* , useState */ } from 'react';
// import FormDialogInput from '~/core/FormInputs/FormDialogInput';
import { FormSpace /* , FormColorPicker */ } from '~/core/FormInputs';
import useLayoutFeatures2 from '~/hooks/useLayoutFeatures2';
// import { TwitterPicker } from 'react-color';
import { IFieldLink, IInputLinker } from '~/utils/InputLinker/core/interfaces';
import { JsonFormProps } from './interfaces';
import {
  JsonFormLinker,
  RenderSession,
} from './core';
import presets from './presets';
import useJsonConfig from './useJsonConfig';

export default <
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
>(p : JsonFormProps<FieldLink, LinkerType>) => {
  const {
    jsonConfig,
    propsEx,
  } = useJsonConfig<FieldLink, LinkerType>(p);

  const props : JsonFormProps<FieldLink, LinkerType> = { ...p, ...propsEx };

  const {
    Linker = JsonFormLinker,
    linkerOptions = {},
    renderSessionParent: rsp,
    renderSessionName: rsName,
    i18nNs = [],
    onSubmit = () => {},
  } = props;

  const {
    resetIl,
    ...layoutFeature
  } = useLayoutFeatures2<FieldLink, LinkerType>({
    ...props,
    ...propsEx,
    Linker,
    i18nNs: [...i18nNs, 'builtin-components'],
    linkerOptions: {
      ...linkerOptions,
      presets: {
        ...presets,
        ...linkerOptions.presets,
      },
      globalValidator: jsonConfig.globalValidator,
      // cursor jumps to end of controlled input in the async mode
      // this is a work-around for that issue
      applyChangesSync: true,
    },
    // onDidMount: (il) => { console.warn('il :', il); },
    onSubmit: (outputs, linker) => {
      onSubmit(outputs, {
        linker,
        resetIl,
      });
    },
  });

  const {
    il, host,
  } = layoutFeature;

  // if (!ready) {
  //   t = () => '';
  // }

  const ref = useRef<{
    prevRenderSession?: RenderSession<FieldLink, LinkerType>;
  }>();

  const renderSession = new RenderSession<FieldLink, LinkerType>(rsp, rsName, il, host, {
    prevRenderSession: ref.current && ref.current.prevRenderSession,
  });

  il.updateHost({
    ...host,
    renderSession,
  });

  renderSession.beforeRender();
  useEffect(() => {
    ref.current = { prevRenderSession: renderSession };
    renderSession.afterRender();
    delete renderSession.prevRenderSession;
  });

  // const [bg, setBg] = useState('#7BDCB5');
  // const [dialogText, setDialogText] = useState('Dialog Text');

  const renderSpace = (fieldLink : FieldLink) => {
    if (!('space' in fieldLink.options)) {
      return <FormSpace variant="content2" />;
    }
    if (fieldLink.options.space === 'none') {
      return <div />;
    }
    return <div />;
  };

  return {
    renderSpace,
    renderSession,
    props,
    host,
    il,
    layoutFeature,
  };
};
