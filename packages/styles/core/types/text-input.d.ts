import Icons from '@racket-styles/assets/icons';

declare global {
  type NativeTextInput = {
    value?: string;
    type?: 'default' | 'email-address' | 'phone-pad';
    onTextChange?: ((event: GestureResponderEvent) => void) | undefined;
  };

  type WebTextInput = {
    value?: string;
    onChange?: ((event: GestureResponderEvent) => void) | undefined;
  };

  type TextInput = {
    active?: boolean;
    disabled?: boolean;
    error?: string | (string | undefined)[];
    icon?: keyof typeof Icons;
    label?: boolean;
    placeholder?: string;
    width?: string;
    height?: string;
    password?: boolean;
    static?: boolean;
  };

  type TextArea = {
    active?: boolean;
    disabled?: boolean;
    error?: string | (string | undefined)[];
    label?: boolean;
    placeholder?: string;
    width?: string;
    height?: string;
  };

  type ListInput = {
    active?: boolean;
    disabled?: boolean;
    error?: string | (string | undefined)[];
    icon?: keyof typeof Icons;
    placeholder?: string;
    label?: string;
    width?: string;
    height?: string;
  };
}
