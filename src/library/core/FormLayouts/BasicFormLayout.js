import React from 'react';
import useLayoutFeaturesEx from '~/hooks/useLayoutFeaturesEx';

const BasicFormLayout = (props) => {
  const {
    extraContents,
    children,
  } = props;

  const {
    il, resetIl, classesByNs, tData: { t/* , i18n, ready */ }, host,
    Content, space, topSpace,
  } = useLayoutFeaturesEx(props);

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
      </Content>
      {children}
    </React.Fragment>
  );
};
BasicFormLayout.displayName = 'BasicFormLayout';

export default BasicFormLayout;
