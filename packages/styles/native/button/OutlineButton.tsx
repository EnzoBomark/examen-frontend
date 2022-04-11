import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Spinner } from '../icon/Spinner';
import { Label } from '../text/Label';

const screen = Dimensions.get('screen');

const Container = styled.TouchableOpacity``;

const Inner = styled.View<OutlineButton>`
  position: relative;
  height: ${({ height }) => height || '50px'};
  width: ${({ width }) => width || 'auto'};
  max-width: ${`${screen.width - 32}px`};
  border-radius: ${theme.radius.xxs};
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-color: ${({ background }) =>
    background ? theme.colors[background] : theme.colors.p600};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  padding: 0 16px;
`;

export const OutlineButton: React.FC<OutlineButton & NativeButton> = (
  props
) => {
  return (
    <Container disabled={props.disabled} onPress={props.onPress}>
      <Inner
        height={props.height}
        width={props.width}
        background={props.background}
        disabled={props.disabled}
      >
        {props.loading ? (
          <Spinner color={props.color} />
        ) : (
          <Label color={props.color}>{props.label}</Label>
        )}
      </Inner>
    </Container>
  );
};
