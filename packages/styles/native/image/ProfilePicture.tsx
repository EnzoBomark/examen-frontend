import * as React from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import theme from '@racket-styles/core/theme';
import Icons from '@racket-styles/assets/icons';
import { H1 } from '../text/H1';
import { Svg } from '../icon/Svg';

type Image = { user?: User; icon?: keyof typeof Icons } & ImageType &
  ImageSizing;

const Container = styled.View<Partial<Image>>`
  height: ${({ height }) => height || '100%'};
  width: ${({ width }) => width || '100%'};
`;

const Inner = styled(FastImage)<Partial<Image>>`
  border-radius: ${({ border }) =>
    border ? theme.radius[border] : theme.radius.xs};
  height: 100%;
  width: 100%;
  background-color: ${theme.colors.g75};
`;

const NoUser = styled.View<Partial<Image>>`
  align-items: center;
  justify-content: center;
  border-radius: ${({ border }) =>
    border ? theme.radius[border] : theme.radius.xs};
  height: 100%;
  width: 100%;
  background-color: ${theme.colors.g75};
`;

const NoImage = styled.View<Partial<Image>>`
  align-items: center;
  justify-content: center;
  border-radius: ${({ border }) =>
    border ? theme.radius[border] : theme.radius.xs};
  height: 100%;
  width: 100%;
  background-color: ${theme.colors.p300};
`;

const Prefix = styled(H1)<{ width: number }>`
  font-size: ${({ width }) => width / 2.5}px;
`;

export const ProfilePicture: React.FC<Image> = (props) => {
  const width = Number(props.width.replace(/[^0-9]/g, ''));

  return (
    <Container height={props.height || props.width} width={props.width}>
      {!props.user && (
        <NoUser border={props.border}>
          {props.icon && (
            <Svg src={props.icon} width={`${width / 3}px`} color="g200" />
          )}
        </NoUser>
      )}

      {!!props.user && !props.user.picture && (
        <NoImage border={props.border}>
          <Prefix width={width} color="p500">
            {props.user.name[0]}
          </Prefix>
        </NoImage>
      )}

      {!!props.user && props.user.picture && (
        <Inner
          source={{ uri: props.user.picture }}
          resizeMode={props.resize}
          border={props.border}
        />
      )}
    </Container>
  );
};
