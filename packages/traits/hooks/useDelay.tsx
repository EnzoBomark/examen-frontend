import * as React from 'react';

export const useDelay = (value: boolean, ms: number) => {
  const [bool, setBool] = React.useState(false);

  React.useEffect(() => {
    const noDelay = () => setBool(true);
    const delay = () => setTimeout(() => setBool(false), ms);

    if (value) noDelay();
    if (!value) delay();

    return () => {
      clearTimeout(delay());
    };
  }, [value]);

  return bool;
};
