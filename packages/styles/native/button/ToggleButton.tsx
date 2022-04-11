import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Label } from '../text/Label';

const screen = Dimensions.get('screen');

const Wrapper = styled.View<Partial<ToggleButton>>`
  padding: 2px;
  flex-direction: row;
  justify-content: space-between;
  height: 34px;
  border-radius: ${theme.radius.xxs};
  width: ${`${screen.width - 32}px`};
  background-color: ${theme.colors.g100};
`;

const Container = styled.TouchableOpacity``;

const Inner = styled.View<Partial<ToggleButton>>`
  height: 30px;
  width: ${`${screen.width / 2 - 20}px`};
  border-radius: ${theme.radius.xxs};
  align-items: center;
  justify-content: center;
  background-color: ${({ background, value }) =>
    value
      ? background
        ? theme.colors[background]
        : theme.colors.p600
      : theme.colors.g100};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  padding: 0 16px;
`;

export const ToggleButton: React.FC<ToggleButton & NativeToggle> = (props) => {
  return (
    <Wrapper {...props}>
      <Container disabled={props.disabled} onPress={() => props.toggle(false)}>
        <Inner {...props} value={!props.value}>
          <Label color={!props.value ? props.color : 'g500'}>
            {props.labelOne}
          </Label>
        </Inner>
      </Container>

      <Container disabled={props.disabled} onPress={() => props.toggle(true)}>
        <Inner {...props} value={props.value}>
          <Label color={props.value ? props.color : 'g500'}>
            {props.labelTwo}
          </Label>
        </Inner>
      </Container>
    </Wrapper>
  );
};
