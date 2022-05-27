import * as React from 'react';

export const useUpdate = (fn: () => void, args: unknown[]) => {
  const didMountRef = React.useRef(false);

  React.useEffect(() => {
    if (didMountRef.current) {
      return fn();
    }
    didMountRef.current = true;
  }, args);
};
