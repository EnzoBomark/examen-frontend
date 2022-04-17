import * as React from 'react';
import theme from '@racket-styles/core/theme';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { Spinner } from '../icon/Spinner';
import { Svg } from '../icon/Svg';

const screen = Dimensions.get('screen');

const Container = styled.TouchableOpacity``;

const Inner = styled.View<Partial<IconButton>>`
  position: relative;
  height: ${({ height }) => height || '54px'};
  width: ${({ width }) => width || '54px'};
  border-radius: 18px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({ background }) =>
    background ? theme.colors[background] : theme.colors.p600};
  opacity: ${({ disabled }) => (disabled ? 0.3 : 1)};
  padding: 0 16px;
`;

export const IconButton: React.FC<IconButton & NativeButton> = (props) => {
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
          props.icon && (
            <Svg src={props.icon} color={props.color} width="20px" />
          )
        )}
      </Inner>
    </Container>
  );
};
