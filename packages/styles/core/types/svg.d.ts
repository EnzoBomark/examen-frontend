import Icons from '@racket-styles/assets/icons';

declare global {
  type SvgCore = {
    src: keyof typeof Icons;
  };

  type SvgType = {
    color?: keyof theme['colors'];
  };

  type SvgSizing = {
    height?: string;
    width: string;
  };
}
