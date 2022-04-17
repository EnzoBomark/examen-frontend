import * as React from 'react';
import * as Localize from 'react-native-localize';
import RootStack from '@racket-native/router';
import theme from '@racket-styles/core/theme';
import languages from '@racket-traits/lang/data';
import { LanguageProvider } from '@racket-traits/lang';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const appTheme = DefaultTheme;

appTheme.colors.background = theme.colors.g50;

const App: React.FC = () => {
  const [language, setLanguage] = React.useState('en');

  React.useEffect(() => {
    const currentLang = Localize.findBestAvailableLanguage(
      Object.keys(languages)
    );

    const tag = currentLang?.languageTag;

    const fallback = 'en';

    setLanguage(tag || fallback);
  }, []);

  return (
    <LanguageProvider lang={language as keyof typeof languages}>
      <ThemeProvider theme={theme}>
        <NavigationContainer theme={appTheme}>
          <RootStack />
        </NavigationContainer>
      </ThemeProvider>
    </LanguageProvider>
  );
};

export default App;
