import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Blur } from './Blur';
import theme from '@racket-styles/core/theme';

type Header = {
  setHeaderHeight?: (num: number) => void;
};

const Container = styled.View`
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  left: 0;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.g100};
`;

const Ios = styled(Blur)<{ iosSafeTop: number }>`
  padding-top: ${({ iosSafeTop }) => iosSafeTop}px;
`;

const Android = styled.View`
  background-color: ${theme.colors.g50};
`;

const Inner = styled.View`
  background-color: transparent;
`;

export const Header: React.FC<Header> = (props) => {
  const insets = useSafeAreaInsets();

  const getHeight = (layout: Native.LayoutChangeEvent) => {
    if (props.setHeaderHeight)
      props.setHeaderHeight(layout.nativeEvent.layout.height);
  };

  return (
    <Container onLayout={getHeight}>
      {Native.Platform.OS === 'ios' ? (
        <Ios blurType="thinMaterialLight" iosSafeTop={insets.top}>
          <Inner>{props.children}</Inner>
        </Ios>
      ) : (
        <Android>
          <Inner>{props.children}</Inner>
        </Android>
      )}
    </Container>
  );
};
