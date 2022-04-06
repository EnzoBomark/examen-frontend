import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Svg } from '../icon/Svg';
import { Label } from '../text/Label';
import { Fill } from '../layout/Fill';

const screen = Dimensions.get('screen');

const Container = styled.TouchableOpacity``;

const Inner = styled.View<SmallButton>`
  position: relative;
  height: ${({ height }) => height || '36px'};
  width: ${({ width }) => width || `${screen.width / 3.5}px`};
  border-radius: ${theme.radius.xxs};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ background }) =>
    background ? theme.colors[background] : theme.colors.p600};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  padding: 0 16px;
`;

export const SmallButton: React.FC<SmallButton & NativeButton> = (props) => {
  return (
    <Container disabled={props.disabled} onPress={props.onPress}>
      <Inner
        height={props.height}
        width={props.width}
        background={props.background}
        disabled={props.disabled}
      >
        {props.icon && (
          <Svg src={props.icon} color={props.color} width="12px" />
        )}

        <Fill>
          <Label color={props.color}>{props.label}</Label>
        </Fill>
      </Inner>
    </Container>
  );
};
