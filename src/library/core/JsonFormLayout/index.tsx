/* eslint-disable no-param-reassign */
import React from 'react';
import { IFieldLink, IInputLinker } from '~/utils/InputLinker/core/interfaces';
import { JsonFormProps } from './interfaces';
// import FormDialogInput from '~/core/FormInputs/FormDialogInput';
import { FormSpace, FormContent /* , FormColorPicker */ } from '~/core/FormInputs';
import useJsonForm from './useJsonForm';

export * from './interfaces';

export {
  JsonFormLinker,
  RenderSession,
} from './core';

export {
  useJsonForm,
};

const JsonFormLayout = <
  FieldLink extends IFieldLink<FieldLink>,
  LinkerType extends IInputLinker<FieldLink>
>(p : JsonFormProps<FieldLink, LinkerType>) => {
  const {
    renderSpace,
    il,
    props,
    layoutFeature,
    renderSession,
  } = useJsonForm<FieldLink, LinkerType>(p);

  const {
    children,
  } = props;

  const {
    /* il, resetIl, classesByNs, host, */ tData: { t/* , i18n, ready */ },
  } = layoutFeature;

  return (
    <div>
      <FormSpace variant="top" />
      <FormContent>
        {
          il.fieldLinks.map((fieldLink) => {
            const space = renderSpace(fieldLink);
            return (
              <React.Fragment key={fieldLink.name}>
                {il.renderComponent(fieldLink.name, { translate: t, renderSession })}
                {space}
              </React.Fragment>
            );
          })
        }
      </FormContent>
      {children}
    </div>
  );
};
JsonFormLayout.displayName = 'JsonFormLayout';

export default JsonFormLayout;
