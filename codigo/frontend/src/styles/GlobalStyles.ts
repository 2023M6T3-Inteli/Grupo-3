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
    max-width: 100vh;

    height: 100%;
    width: 100%;
  }

  *, button, input{
    border: 0;
    background: none;
    font-family: 'Roboto';
  }

  html{
    background: var(--primary);
  }

  h1{
    font-weight: normal;
  }

  h2{
    font-weight: normal;
  }

  h3{
    font-weight: normal;
  }

  h4{
    font-weight: normal;
  }

  p{
    font-size: 14px;
  }

  :root{
    --primary: #FFFFFF;
  }
`;
