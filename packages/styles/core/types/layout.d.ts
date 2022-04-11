type Spacer = {
  size: keyof theme['space'];
};

type Align = {
  type: keyof theme['align'];
};

type Justify = {
  type: keyof theme['justify'];
};

type Row = {
  justify?: keyof theme['justify'];
  align?: keyof theme['align'];
  reversed?: boolean;
};

type Col = {
  justify?: keyof theme['justify'];
  align?: keyof theme['align'];
  reversed?: boolean;
};

type AvoidKeyboard = {
  behavior?: 'padding' | 'position' | 'height';
  offset?: number;
};

type Space = {
  size: keyof theme['space'];
  vertical?: boolean;
  horizontal?: boolean;
};

type Padding = Space;

type Margin = Space;
