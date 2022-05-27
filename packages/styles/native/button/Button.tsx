import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Spinner } from '../icon/Spinner';
import { Svg } from '../icon/Svg';
import { Label } from '../text/Label';

const screen = Dimensions.get('screen');

const Container = styled.TouchableOpacity``;

const Inner = styled.View<Partial<Button>>`
  position: relative;
  height: ${({ height }) => height || '50px'};
  width: ${({ width }) => width || 'auto'};
  max-width: ${`${screen.width - 32}px`};
  border-radius: ${theme.radius.xxs};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ background }) =>
    background ? theme.colors[background] : theme.colors.p600};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  padding: 0 16px;
`;

const Arrow = styled.View`
  position: absolute;
  right: 16px;
`;

const Icon = styled.View`
  position: absolute;
  left: 16px;
`;

export const Button: React.FC<Button & NativeButton> = (props) => {
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
            <Svg src={props.icon} color={props.color} width="18px" />
          </Icon>
        )}

        {props.loading ? (
          <Spinner color={props.color} />
        ) : (
          <Label color={props.color}>{props.label}</Label>
        )}

        {props.arrow && (
          <Arrow>
            <Svg src="forward" color={props.color} width="12px" />
          </Arrow>
        )}
      </Inner>
    </Container>
  );
};
