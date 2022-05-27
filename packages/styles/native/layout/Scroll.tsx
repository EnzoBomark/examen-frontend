import * as React from 'react';
import * as Native from 'react-native';

type Scroll = {
  onRefresh?: () => void;
};

export const Scroll: React.FC<Scroll> = ({ children, onRefresh }) => (
  <Native.ScrollView
    showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    refreshControl={
      <Native.RefreshControl
        refreshing={false}
        tintColor={'transparent'}
        onRefresh={onRefresh}
      />
    }
  >
    {children}
  </Native.ScrollView>
);
