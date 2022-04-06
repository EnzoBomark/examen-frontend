import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Svg } from '../icon/Svg';
import { Label } from '../text/Label';

const screen = Dimensions.get('screen');

const Container = styled.TouchableOpacity``;

const Inner = styled.View<Partial<ArrowButton>>`
  position: relative;
  height: ${({ height }) => height || 'auto'};
  width: ${({ width }) => width || `${screen.width - 32}px`};
  border-radius: ${theme.radius.xxs};
  flex-direction: row;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  padding: 0 8px;
`;

const Arrow = styled.View`
  position: absolute;
  right: 8px;
`;

const Icon = styled.View`
  margin-right: ${theme.space.xxs};
`;

export const ArrowButton: React.FC<ArrowButton & NativeButton> = (props) => (
  <Container disabled={props.disabled} onPress={props.onPress}>
    <Inner height={props.height} width={props.width} disabled={props.disabled}>
      {props.icon && (
        <Icon>
          <Svg src={props.icon} color="g400" width="18px" />
        </Icon>
      )}

      <Label color="g600">{props.label}</Label>

      <Arrow>
        <Svg src="forward" color="g400" width="12px" />
      </Arrow>
    </Inner>
  </Container>
);
