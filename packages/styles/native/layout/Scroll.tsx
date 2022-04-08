import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type SafeOptions = { headerHeight: number };

type Scroll = { top?: boolean; bottom?: boolean };

const Container = styled.ScrollView<SafeOptions>`
  padding-top: ${({ headerHeight }) => `${headerHeight}px`};
`;

const Inner = styled.View<SafeOptions>`
  flex: 1;
  padding-bottom: ${({ headerHeight }) => `${headerHeight}px`};
`;

export const Scroll: React.FC<Scroll> = (props) => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const platform = Native.Platform.OS === 'ios';
  const top = platform ? headerHeight + insets.top : insets.top;
  const bottom = insets.bottom;

  return (
    <Native.TouchableWithoutFeedback onPress={() => Native.Keyboard.dismiss()}>
      <Container
        contentContainerStyle={{ flexGrow: 1 }}
        headerHeight={props.top ? top : 0}
        showsVerticalScrollIndicator={false}
      >
        <Inner headerHeight={props.bottom ? bottom + 20 : 20}>
          {props.children}
        </Inner>
      </Container>
    </Native.TouchableWithoutFeedback>
  );
};
