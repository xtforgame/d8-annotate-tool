import React from 'react';
import {
  FormSpace,
  FormContent,
} from '~/core/FormInputs';
import useLayoutFeatures from '~/hooks/useLayoutFeatures';

export default (props) => {
  const {
    onDidMount,
    onSubmit,
    space = <FormSpace variant="content1" />,
    topSpace = <FormSpace variant="top" />,
    Content = FormContent,
  } = props;

  const layoutFeaturesResult = useLayoutFeatures({
    ...props,
    onDidMount,
    onSubmit, // : (outputs) => { resetIl(); console.warn('outputs :', outputs); },
  });

  return {
    ...layoutFeaturesResult,
    space,
    topSpace,
    Content,
  };
};
