import Icons from '@racket-styles/assets/icons';

declare global {
  type Svg = {
    src: keyof typeof Icons;
    width: string;
    color?: keyof theme['colors'];
    height?: string;
  };
}
