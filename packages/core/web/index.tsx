import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import Theming from '@racket-styles/core/theming';
import theme from '@racket-styles/core/theme';
import Routing from '@racket-web/router';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <Theming />
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
