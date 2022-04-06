import Icons from '@racket-styles/assets/icons';

declare global {
  type NativeTextInput = {
    value?: string;
    onTextChange?: ((event: GestureResponderEvent) => void) | undefined;
  };

  type WebTextInput = {
    value?: string;
    onChange?: ((event: GestureResponderEvent) => void) | undefined;
  };

  type TextInput = {
    active?: boolean;
    disabled?: boolean;
    error?: string;
    icon?: keyof typeof Icons;
    label?: string;
    placeholder?: string;
    width?: string;
    height?: string;
    password?: boolean;
  };
}
