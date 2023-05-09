import { createGlobalStyle } from 'styled-components';
import Roboto from '../fonts/Roboto-Thin.ttf';

export default createGlobalStyle`
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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
  }

  html{
    background: var(--primary);
  }

  :root{
    --primary: #FFFFFF;
  }
`;
