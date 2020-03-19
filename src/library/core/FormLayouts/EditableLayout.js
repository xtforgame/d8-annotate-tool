import React from 'react';
import useEditableLayoutFeatures from '~/hooks/useEditableLayoutFeatures';
import Button from '@material-ui/core/Button';

const EditableLayout = (props) => {
  const {
    extraContents,
    children,
    submitButtonText,
    styleNs = [],
  } = props;

  const {
    il, resetIl, classesByNs, tData: { t/* , i18n, ready */ }, host,
    Content, space, topSpace,
  } = useEditableLayoutFeatures({
    ...props,
    styleNs: [...styleNs, 'login'],
  });

  il.updateHost(host);

  return (
    <React.Fragment>
      {topSpace}
      <Content>
        {
          il.fieldLinks.map((fieldLink) => {
            const defaultSpace = 'space' in fieldLink.options ? fieldLink.options.space : space;
            return (
              <React.Fragment key={fieldLink.name}>
                {il.renderComponent(fieldLink.name, { translate: t })}
                {defaultSpace}
              </React.Fragment>
            );
          })
        }
        {extraContents}
        <Button
          variant="contained"
          fullWidth
          color="primary"
          className={classesByNs.login.loginBtn}
          onClick={host.handleSubmit}
        >
          {submitButtonText}
        </Button>
      </Content>
      {children}
    </React.Fragment>
  );
};
EditableLayout.displayName = 'EditableLayout';

export default EditableLayout;
