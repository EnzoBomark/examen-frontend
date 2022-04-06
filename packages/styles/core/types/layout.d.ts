type SpacerType = {
  size: keyof Theme['space'];
};

type AlignType = {
  type: keyof Theme['align'];
};

type JustifyType = {
  type: keyof Theme['justify'];
};

type Row = {
  justify?: keyof Theme['justify'];
  align?: keyof Theme['align'];
  reversed?: boolean;
};

type Col = {
  justify?: keyof Theme['justify'];
  align?: keyof Theme['align'];
  reversed?: boolean;
};
