import * as React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Screen = {
  headerHeight: number;
  bottomHeight: number;
};

const Container = styled.View<Screen>`
  flex-grow: 1;
  padding-top: ${({ headerHeight }) => `${headerHeight}px`};
  padding-bottom: ${({ bottomHeight }) => `${bottomHeight}px`};
`;

export const Screen: React.FC<{ top?: boolean; bottom?: boolean }> = (
  props
) => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const platform = Platform.OS === 'ios';
  const top = platform ? headerHeight + insets.top : insets.top;
  const bottom = top - insets.top;

  return (
    <Container
      headerHeight={props.top ? top : 0}
      bottomHeight={props.bottom ? bottom : 0}
    >
      {props.children}
    </Container>
  );
};
