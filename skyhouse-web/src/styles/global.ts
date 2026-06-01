import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  * {
    margin: 0;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    background: ${({ theme }) => theme.color.canvas};
    color: ${({ theme }) => theme.color.text.primary};
    font-family: ${({ theme }) => theme.font.sans};
    font-size: 15px;
    line-height: 1.5;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-feature-settings: 'cv05' 1, 'ss01' 1;
  }

  table, [data-numeric] {
    font-variant-numeric: tabular-nums;
  }

  button, input {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
  }

  :focus-visible {
    outline: 2px solid ${({ theme }) => theme.color.accent.solid};
    outline-offset: 2px;
    border-radius: 4px;
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;
