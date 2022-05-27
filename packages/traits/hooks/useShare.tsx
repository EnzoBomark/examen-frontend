import * as React from 'react';
import { Share } from 'react-native';

export const useShare = (message: string) => {
  const [hasError, setHasError] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasShared, setHasShared] = React.useState(false);

  const onShare = async () => {
    setHasError(false);
    setIsLoading(true);

    try {
      const result = await Share.share({ message });

      if (result.action === Share.sharedAction) setHasShared(true);
    } catch (error) {
      setHasError(true);
    }

    setIsLoading(false);
  };

  const share = {
    hasError,
    isLoading,
    hasShared,
  };

  return [share, onShare] as const;
};
