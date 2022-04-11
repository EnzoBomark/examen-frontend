import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { Blur } from '../layout/Blur';
import { UnderLine } from '../layout/UnderLine';
import theme from '@racket-styles/core/theme';

type Header = {
  setHeaderHeight?: (num: number) => void;
};

const Container = styled.View`
  border-top-right-radius: ${theme.radius.xxs};
  border-top-left-radius: ${theme.radius.xxs};
  overflow: hidden;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
`;

const Inner = styled(Blur)`
  padding: ${theme.space.xs};
`;

export const ModalHeader: React.FC<Header> = (props) => {
  const getHeight = (layout: Native.LayoutChangeEvent) => {
    if (props.setHeaderHeight)
      props.setHeaderHeight(layout.nativeEvent.layout.height);
  };

  return (
    <Container onLayout={getHeight}>
      <Inner blurType="thinMaterialLight">{props.children}</Inner>
      <UnderLine />
    </Container>
  );
};
