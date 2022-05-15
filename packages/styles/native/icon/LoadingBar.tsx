import * as React from 'react';
import ProgressBar from 'react-native-animated-progress';
import theme from '@racket-styles/core/theme';

export const LoadingBar: React.FC = () => (
  <ProgressBar
    height={1}
    indeterminate
    backgroundColor={theme.colors.g300}
    trackColor="transparent"
  />
);
