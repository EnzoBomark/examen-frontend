import * as React from 'react';
import styled from 'styled-components/native';
import * as Native from 'react-native';
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

  const platform = Native.Platform.OS === 'ios';
  const top = platform ? headerHeight + insets.top : insets.top;
  const bottom = top - insets.top;

  return (
    <Native.TouchableWithoutFeedback onPress={() => Native.Keyboard.dismiss()}>
      <Container
        headerHeight={props.top ? top : 0}
        bottomHeight={
          props.bottom ? bottom + (insets.bottom || 20) : insets.bottom || 20
        }
      >
        {props.children}
      </Container>
    </Native.TouchableWithoutFeedback>
  );
};
