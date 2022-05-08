import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Svg } from '../icon/Svg';
import { Label } from '../text/Label';

const Container = styled.TouchableOpacity``;

const Inner = styled.View<SmallButton>`
  position: relative;
  height: ${({ height }) => height || '36px'};
  width: ${({ width }) => width || 'auto'};
  border-radius: ${theme.radius.xxs};
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  background-color: ${({ background }) =>
    background ? theme.colors[background] : theme.colors.p600};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  padding: 0 16px;
`;

const Icon = styled.View`
  margin-right: 5px;
  margin-left: -5px;
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
          <Icon>
            <Svg src={props.icon} color={props.color} width="12px" />
          </Icon>
        )}

        <Label color={props.color}>{props.label}</Label>
      </Inner>
    </Container>
  );
};
