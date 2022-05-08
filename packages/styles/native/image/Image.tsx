import * as React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import Images from '@racket-styles/assets/images';
import theme from '@racket-styles/core/theme';

type Image = ImageCore & ImageType & ImageSizing;

export const Container = styled.View<Partial<Image>>`
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
`;

export const Inner = styled(FastImage)<Partial<Image>>`
  border-radius: ${({ border }) =>
    border ? theme.radius[border] : theme.radius.xxs};
  height: 100%;
  width: 100%;
  background-color: ${theme.colors.g75};
`;

export const Image: React.FC<Image> = (props) => {
  const isImage = (src: string): src is keyof typeof Images =>
    Object.keys(Images).indexOf(src) !== -1;

  return (
    <Container height={props.height || props.width} width={props.width}>
      <Inner
        source={isImage(props.src) ? Images[props.src] : { uri: props.src }}
        resizeMode={props.resize}
        border={props.border}
      />
    </Container>
  );
};
