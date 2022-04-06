import Icons from '@racket-styles/assets/icons';

declare global {
  type NativeInputFunctions = {
    value?: string;
    onTextChange?: ((event: GestureResponderEvent) => void) | undefined;
  };

  type WebInputFunctions = {
    value?: string;
    onChange?: ((event: GestureResponderEvent) => void) | undefined;
  };

  type InputType = {
    active?: boolean;
    disabled?: boolean;
    error?: string;
  };

  type InputAddons = {
    icon?: keyof typeof Icons;
    label?: string;
    placeholder?: string;
  };

  type PasswordAddons = {
    label?: string;
    placeholder?: string;
  };

  type InputSizing = {
    width?: string;
    height?: string;
  };
}
