import * as React from 'react';
import * as Native from 'react-native';

export const Scroll: React.FC = ({ children }) => (
  <Native.ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
  >
    {children}
  </Native.ScrollView>
);
