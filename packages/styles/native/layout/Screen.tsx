import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const screen = Native.Dimensions.get('screen');

type Screen = {
  headerHeight?: number;
  bottomHeight?: number;
};

const Container = styled.View<Screen>`
  flex-grow: 1;
  min-height: ${screen.height}px;
  padding-top: ${({ headerHeight }) => `${headerHeight}px`};
  padding-bottom: ${({ bottomHeight }) => `${bottomHeight}px`};
`;

export const Screen: React.FC<Screen> = (props) => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const platform = Native.Platform.OS === 'ios';
  const top = platform ? headerHeight + insets.top : insets.top;
  const bottom = insets.bottom || 20;

  return (
    <Container headerHeight={props.headerHeight || top} bottomHeight={bottom}>
      {props.children}
    </Container>
  );
};
