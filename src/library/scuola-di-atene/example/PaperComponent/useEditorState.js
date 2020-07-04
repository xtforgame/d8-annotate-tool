import { useState } from 'react';
import useDialogState, { Cancel } from '~/hooks/useDialogState';

export default ({
  onChange = () => {},
  onDrop = () => {},
} = {}) => {
  const [target, setTarget] = useState();
  return [
    ...useDialogState({
      open: (t) => {
        setTarget(t);
      },
      close: (v) => {
        setTarget();
        if (v !== undefined && v !== Cancel) {
          onChange(v);
        }
      },
    }),
    { target, setTarget },
  ];
};
