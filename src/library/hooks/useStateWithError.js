import { useState } from 'react';

export const Cancel = Symbol('Cancel');

export default (v, e, config) => {
  const [value, setValue] = useState(v);
  const [error, setError] = useState(e);

  const sv = (value, clearError = true) => {
    setValue(value);
    if (clearError) {
      setError();
    }
  };

  return [value, sv, error, setError];
};
