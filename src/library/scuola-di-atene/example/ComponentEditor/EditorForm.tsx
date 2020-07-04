/* eslint-disable no-param-reassign */
import React from 'react';
// import FormDialogInput from '~/core/FormInputs/FormDialogInput';
import DialogContent from '@material-ui/core/DialogContent';
import { FormSpace/* , FormContent , FormColorPicker */ } from '~/core/FormInputs';
import { useJsonForm } from '~/core/JsonFormLayout';
import { IFieldLink, IInputLinker } from '~/utils/InputLinker/core/interfaces';
import { JsonFormProps } from '~/core/JsonFormLayout/interfaces';

const EditorForm = <
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
    <React.Fragment>
      <DialogContent>
        <FormSpace variant="content1" />
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
      </DialogContent>
      {children}
    </React.Fragment>
  );
};
EditorForm.displayName = 'EditorForm';

export default EditorForm;
