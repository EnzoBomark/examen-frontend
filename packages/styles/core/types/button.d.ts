import Icons from '@racket-styles/assets/icons';

declare global {
  type NativeButton = {
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    accessibilityRole?: AccessibilityRole;
    accessibilityState?: AccessibilityState;
    accessibilityLabel?: string;
  };

  type WebButton = {
    onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  };

  interface BaseButton {
    disabled?: boolean;
    width?: string;
    height?: string;
    loading?: boolean;
    color?: keyof Theme['colors'];
    background?: keyof Theme['colors'];
  }

  interface Button extends BaseButton {
    label: string;
    icon?: keyof typeof Icons;
    arrow?: boolean;
  }

  interface SmallButton extends BaseButton {
    icon?: keyof typeof Icons;
    label?: string;
  }

  interface IconButton extends BaseButton {
    icon: keyof typeof Icons;
  }

  interface OutlineButton extends BaseButton {
    label?: string;
  }

  interface ArrowButton {
    label: string;
    icon?: keyof typeof Icons;
    disabled?: boolean;
    width?: string;
    height?: string;
  }

  interface Clickable {
    disabled?: boolean;
  }
}
