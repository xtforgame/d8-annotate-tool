/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import useLayoutFeatures from '~/hooks/useLayoutFeatures';
import MuiCard from '@material-ui/core/Card';

const EditableCardLayout = (props) => {
  const {
    Card = MuiCard,
    className,
    cardProps,
    onStartEditing,
    onCancelEditing,
  } = props;

  const extraProps = {};
  if (className) {
    extraProps.className = className;
  }

  const {
    il, resetIl, classesByNs, tData: { t/* , i18n, ready */ }, host,
  } = useLayoutFeatures(props);

  il.updateHost({
    ...host,
    startEditing: () => {
      if (onStartEditing) {
        onStartEditing();
      }
    },
    cancelEditing: () => {
      if (onCancelEditing) {
        onCancelEditing();
      }
    },
  });

  return (
    <Card {...extraProps} {...cardProps}>
      {il.fieldLinks.map(fieldLink => il.renderComponent(fieldLink.name, { translate: t }))}
    </Card>
  );
};
EditableCardLayout.displayName = 'EditableCardLayout';

export default EditableCardLayout;
