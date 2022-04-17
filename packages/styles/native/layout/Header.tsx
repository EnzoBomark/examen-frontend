import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Blur } from './Blur';
import { UnderLine } from './UnderLine';

type Header = {
  setHeaderHeight?: (num: number) => void;
};

const Container = styled.View`
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
`;

export const Header: React.FC<Header> = (props) => {
  const insets = useSafeAreaInsets();

  const getHeight = (layout: Native.LayoutChangeEvent) => {
    if (props.setHeaderHeight)
      props.setHeaderHeight(layout.nativeEvent.layout.height);
  };

  return (
    <Container onLayout={getHeight}>
      <Blur
        blurType="thinMaterialLight"
        style={{
          paddingTop: insets.top,
        }}
      >
        {props.children}
        <UnderLine />
      </Blur>
    </Container>
  );
};
