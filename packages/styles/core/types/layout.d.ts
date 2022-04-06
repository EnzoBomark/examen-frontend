type Spacer = {
  size: keyof theme['space'];
};

type Padding = {
  size: keyof theme['space'];
  vertical?: boolean;
  horizontal?: boolean;
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
