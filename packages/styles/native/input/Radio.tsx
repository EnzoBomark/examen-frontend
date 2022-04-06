import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Svg } from '../icon/Svg';
import { Body } from '../text/Body';

const screen = Dimensions.get('screen');

const Container = styled.TouchableOpacity``;

const Inner = styled.View<Partial<Toggle>>`
  position: relative;
  height: ${({ height }) => height || 'auto'};
  width: ${({ width, label }) =>
    label ? `${screen.width - 32}px` : width || `auto`};
  flex-direction: ${({ invert }) => (invert ? 'row-reverse' : 'row')};
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  padding: 0 ${theme.space.xxs};
`;

const LabelWrapper = styled.View<Partial<Toggle>>`
  padding-left: ${({ invert, icon }) =>
    invert ? theme.space.xxs : icon ? theme.space.xxs : 0};
  margin-left: ${({ invert }) => (invert ? 'auto' : 0)};
  margin-right: ${({ invert }) => (invert ? 0 : 'auto')};
`;

export const Radio: React.FC<Toggle & NativeToggle> = (props) => {
  const toggle = () => props.toggle((prev: boolean) => !prev);

  return (
    <Container {...props} onPress={toggle}>
      <Inner {...props}>
        {props.icon && <Svg src={props.icon} width="18px" color="g400" />}

        {props.label && (
          <LabelWrapper {...props}>
            <Body color="g500">{props.label}</Body>
          </LabelWrapper>
        )}

        <Svg
          src={props.active ? 'radioFill' : 'radio'}
          width="18px"
          color={props.active ? 'p600' : 'g400'}
        />
      </Inner>
    </Container>
  );
};
