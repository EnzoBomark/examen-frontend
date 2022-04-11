import * as React from 'react';
import * as Native from 'react-native';
import styled from 'styled-components/native';
import { useHeaderHeight } from '@react-navigation/elements';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Scroll = { headerHeight: number };

const Container = styled.ScrollView<Scroll>`
  padding-top: ${({ headerHeight }) => `${headerHeight}px`};
`;

const Inner = styled.View<Scroll>`
  flex: 1;
  padding-bottom: ${({ headerHeight }) => `${headerHeight}px`};
`;

export const Scroll: React.FC = (props) => {
  const headerHeight = useHeaderHeight();
  const insets = useSafeAreaInsets();

  const platform = Native.Platform.OS === 'ios';
  const top = platform ? headerHeight + insets.top : insets.top;
  const bottom = insets.bottom || 20;

  return (
    <Native.TouchableWithoutFeedback onPress={() => Native.Keyboard.dismiss()}>
      <Container
        headerHeight={top}
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Inner headerHeight={bottom}>{props.children}</Inner>
      </Container>
    </Native.TouchableWithoutFeedback>
  );
};
