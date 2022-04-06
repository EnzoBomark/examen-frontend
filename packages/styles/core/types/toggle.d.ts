import Images from '@racket-styles/assets/images';
import Icons from '@racket-styles/assets/icons';

declare global {
  type NativeToggle = {
    toggle?: Dispatch<SetStateAction<boolean>>;
  };

  type WebToggle = {
    toggle?: Dispatch<SetStateAction<boolean>>;
  };

  type Toggle = {
    active?: boolean;
    disabled?: boolean;
    invert?: boolean;
    image?: keyof typeof Images | string;
    icon?: keyof typeof Icons;
    label?: string;
    width?: string;
    height?: string;
  };
}
