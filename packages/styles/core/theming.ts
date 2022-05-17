import { createGlobalStyle } from 'styled-components';
import RobotoBold from '@racket-styles/assets/fonts/Roboto-Bold.ttf';
import RobotoRegular from '@racket-styles/assets/fonts/Roboto-Regular.ttf';

const theming = createGlobalStyle`
  @font-face {
    font-family: 'Roboto-Bold';
    font-style: normal;
    src: url(${RobotoBold}) format('truetype');
    font-weight: 500;
  }

  @font-face {
    font-family: 'Roboto-Regular';
    font-style: normal;
    src: url(${RobotoRegular}) format('truetype');
    font-weight: 300;
  }

  * {
    box-sizing: border-box;

    &::after {
      box-sizing: border-box;
    }

     &::before {
      box-sizing: border-box;
    }
  }

  html, body, div, span, applet, object, iframe,
  h1, h2, h3, h4, h5, h6, p, blockquote, pre,
  a, abbr, acronym, address, big, cite, code,
  del, dfn, em, img, ins, kbd, q, s, samp,
  small, strike, strong, sub, sup, tt, var,
  b, u, i, center,
  dl, dt, dd, ol, ul, li,
  fieldset, form, label, legend,
  table, caption, tbody, tfoot, thead, tr, th, td,
  article, aside, canvas, details, embed, 
  figure, figcaption, footer, header, hgroup, 
  menu, nav, output, ruby, section, summary,
  time, mark, audio, video, input {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }
  /* HTML5 display-role reset for older browsers */
  article, aside, details, figcaption, figure, 
  footer, header, hgroup, menu, nav, section {
    display: block;
  }
  body {
    line-height: 1;
  }
  ol, ul {
    list-style: none;
  }
  blockquote, q {
    quotes: none;
  }
  blockquote:before, blockquote:after,
  q:before, q:after {
    content: '';
    content: none;
  }
  table {
    border-collapse: collapse;
    border-spacing: 0;
  }
  body {
    font-family: 'Roboto-Regular';
    font-size: 16px;
  }
`;
export default theming;
