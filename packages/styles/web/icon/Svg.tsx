import * as React from 'react';
import { WebIcons } from '@racket-styles/assets/icons';
import theme from '@racket-styles/core/theme';

export const Svg: React.FC<Svg> = (props) => {
  const icon = WebIcons[props.src];

  const isColor = (color?: string): color is keyof typeof theme.colors =>
    Object.keys(theme.colors).indexOf(color || '') !== -1;

  return React.createElement(icon, {
    width: props.width,
    height: props.height || props.width,
    color: isColor(props.color)
      ? theme.colors[props.color]
      : props.color || theme.colors.g0,
  });
};
