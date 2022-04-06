import * as React from 'react';
import theme from '@racket-styles/core/theme';
import { View } from 'react-native';

export const Shadow: React.FC = (props) => (
  <View style={{ ...theme.shadow }}>{props.children}</View>
);
