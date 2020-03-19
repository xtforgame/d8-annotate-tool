import { useRef, useEffect } from 'react';

// https://stackoverflow.com/questions/53351517/react-hooks-skip-first-run-in-useeffect
export default (cb = () => undefined, ...args) => {
  const isFirstRun = useRef(true);
  return useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    cb();
  }, ...args);
};
