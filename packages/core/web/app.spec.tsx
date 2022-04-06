import React from 'react';
import App from './index';
import { render } from '@racket-core/testing';

it('Renders without crashing', () => {
  render(<App />);
});
