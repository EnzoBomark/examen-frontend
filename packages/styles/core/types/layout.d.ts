type SpacerType = {
  size: keyof theme['space'];
};

type AlignType = {
  type: keyof theme['align'];
};

type JustifyType = {
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
