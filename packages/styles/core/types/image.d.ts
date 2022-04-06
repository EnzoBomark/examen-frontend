import Images from '@racket-styles/assets/images';

declare global {
  type ImageCore = {
    src: keyof typeof Images | string;
  };

  type ImageType = {
    resize?: 'center' | 'stretch' | 'contain' | 'cover';
    border?: keyof Theme['radius'];
  };

  type ImageSizing = {
    height?: string;
    width: string;
  };
}
