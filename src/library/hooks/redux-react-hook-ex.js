import { useMappedState, useDispatch } from 'redux-react-hook';

export * from 'redux-react-hook';

export const useDispatchToProps = (map) => {
  const dispatch = useDispatch();
  if (!map) {
    return dispatch;
  }
  if (typeof map === 'function') {
    return map(dispatch);
  }
  if (!Array.isArray(map) && map === Object(map)) {
    // is object
    return Object.keys(map).reduce((m, k) => ({
      ...m,
      [k]: (...args) => dispatch(map[k](...args)),
    }), {});
  }
  throw new Error('Wrong arg for useDispatchToProps');
};

export const useConnect = (mapStateToProps, mapDispatchToProps) => {
  const state = useMappedState(mapStateToProps);
  let dispatch = useDispatchToProps(mapDispatchToProps);
  if (typeof dispatch === 'function') {
    dispatch = { dispatch };
  }
  return {
    ...state,
    ...dispatch,
  };
};
