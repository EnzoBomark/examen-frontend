import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { Blur } from '../layout/Blur';
import { UnderLine } from '../layout/UnderLine';
import theme from '@racket-styles/core/theme';
import { Padding } from '../layout/Padding';

const Ios = styled(Blur)``;

const Android = styled.View`
  background-color: ${theme.colors.g50};
`;

type Header = {
  setHeaderHeight?: (num: number) => void;
};

const Container = styled.View`
  border-top-right-radius: ${theme.radius.xxs};
  border-top-left-radius: ${theme.radius.xxs};
  position: absolute;
  overflow: hidden;
  top: 0;
  right: 0;
  left: 0;
`;

const Inner = styled(Padding)`
  background-color: transparent;
`;

export const ModalHeader: React.FC<Header> = (props) => {
  const getHeight = (layout: Native.LayoutChangeEvent) => {
    if (props.setHeaderHeight)
      props.setHeaderHeight(layout.nativeEvent.layout.height);
  };

  return (
    <Container onLayout={getHeight}>
      {Native.Platform.OS === 'ios' ? (
        <Ios blurType="thinMaterialLight">
          <Inner size="xs">{props.children}</Inner>
        </Ios>
      ) : (
        <Android>
          <Inner size="xs">{props.children}</Inner>
        </Android>
      )}
      <UnderLine />
    </Container>
  );
};
