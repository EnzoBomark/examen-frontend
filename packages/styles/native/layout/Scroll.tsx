import * as React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Scroll = { headerHeight: number };

const Container = styled.ScrollView<Scroll>`
  flex-grow: 1;
  padding-top: ${({ headerHeight }) => `${headerHeight}px`};
`;

const Inner = styled.View<Scroll>`
  padding-bottom: ${({ headerHeight }) => `${headerHeight}px`};
`;

export const Scroll: React.FC<{ top?: boolean; bottom?: boolean }> = (
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
      showsVerticalScrollIndicator={false}
    >
      <Inner headerHeight={props.bottom ? bottom + 20 : 20}>
        {props.children}
      </Inner>
    </Container>
  );
};
