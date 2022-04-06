type Theme = {
  colors: {
    p50: string;
    p100: string;
    p200: string;
    p300: string;
    p400: string;
    p500: string;
    p600: string;
    p700: string;
    p800: string;
    s50: string;
    s100: string;
    s200: string;
    s300: string;
    s400: string;
    s500: string;
    s600: string;
    s700: string;
    s800: string;
    g0: string;
    g50: string;
    g100: string;
    g200: string;
    g300: string;
    g400: string;
    g500: string;
    g600: string;
    g700: string;
    g800: string;
    g900: string;
    g1000: string;
    error: string;
    success: string;
    warning: string;
    info: string;
  };

  align: {
    start: string;
    center: string;
    end: string;
  };

  justify: {
    start: string;
    center: string;
    end: string;
    even: string;
    around: string;
    between: string;
  };

  font: {
    xxs: string;
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };

  space: {
    xxs: string;
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };

  radius: {
    xxs: string;
    xs: string;
    s: string;
    m: string;
    l: string;
    xl: string;
    xxl: string;
    xxxl: string;
  };

  shadow: {
    shadowColor: string;
    shadowOffset: {
      width: number;
      height: number;
    };
    shadowOpacity: number;
    shadowRadius: number;
    elevation: number;
  };
};
