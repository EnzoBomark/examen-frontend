import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Blur } from './Blur';
import { UnderLine } from './UnderLine';
import theme from '@racket-styles/core/theme';

const blurType = Native.Platform.select({
  ios: 'thinMaterialLight',
  android: 'light',
}) as 'thinMaterialLight' | 'light';

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

export const Header: React.FC<Header> = (props) => {
  const insets = useSafeAreaInsets();

  const getHeight = (layout: Native.LayoutChangeEvent) => {
    if (props.setHeaderHeight)
      props.setHeaderHeight(layout.nativeEvent.layout.height);
  };

  return (
    <Container onLayout={getHeight}>
      <Blur
        blurAmount={50}
        blurType={blurType}
        overlayColor={'#00000005'}
        style={{
          paddingTop: insets.top,
        }}
      >
        {props.children}
      </Blur>
    </Container>
  );
};
