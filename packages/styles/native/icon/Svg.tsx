import * as React from 'react';
import { SvgXml } from 'react-native-svg';
import { NativeIcons } from '@racket-styles/assets/icons';
import theme from '@racket-styles/core/theme';

export const Svg: React.FC<Svg> = (props) => {
  const icon = NativeIcons[props.src];

  const isColor = (color?: string): color is keyof typeof theme.colors =>
    Object.keys(theme.colors).indexOf(color || '') !== -1;

  return typeof icon === 'string' ? (
    <SvgXml
      width={props.width}
      height={props.height || props.width}
      color={
        isColor(props.color)
          ? theme.colors[props.color]
          : props.color || theme.colors.g0
      }
      xml={icon}
    />
  ) : (
    React.createElement(icon, {
      width: props.width,
      height: props.height || props.width,
      color: isColor(props.color)
        ? theme.colors[props.color]
        : props.color || theme.colors.g0,
    })
  );
};
