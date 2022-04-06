import * as React from 'react';
import RootStack from '@racket-native/router';
import theme from '@racket-styles/core/theme';
import { ThemeProvider } from 'styled-components/native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';

const appTheme = DefaultTheme;

appTheme.colors.background = theme.colors.g50;

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer theme={appTheme}>
        <RootStack />
      </NavigationContainer>
    </ThemeProvider>
  );
};

export default App;
