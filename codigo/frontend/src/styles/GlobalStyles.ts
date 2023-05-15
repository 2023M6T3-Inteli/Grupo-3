import { createGlobalStyle } from 'styled-components';
import RobotoLight from '../fonts/Roboto-Light-webfont.woff';

export default createGlobalStyle`
  @font-face {
    font-family: 'Roboto';
    src: url(${RobotoLight}) format('woff');
    font-weight: 400;
    font-style: normal;
  }

  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html, body, #root{
    max-height: 100vh;
    max-width: 100vw;

    height: 100%;
    width: 100%;

    margin-top: 5px;
    margin-bottom: 5px;
    padding-bottom: 60px;
  }

  *, button, input{
    border: 0;
    background: none;
    font-family: 'Roboto';
  }

  html{
    background: var(--primary);
  }

  h1, h2, h3, h4{
    font-weight: normal;
  }

  p{
    font-size: 14px;
  }

  :root{
    --primary: #FFFFFF;
  }
`;
