import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components/native';

const Container = styled(KeyboardAwareScrollView)`
  flex: 1;
  height: auto;
  width: 100%;
`;

export const AvoidKeyboard: React.FC<AvoidKeyboard> = (props) => {
  return (
    <Container
      bounces={false}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {props.children}
    </Container>
  );
};
