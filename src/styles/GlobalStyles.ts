import { createGlobalStyle } from 'styled-components';
import { LightTheme, DarkTheme } from 'src/themes';

type GlobalStylesProps = {
  theme: LightTheme | DarkTheme;
};

const GlobalStyles = createGlobalStyle<GlobalStylesProps>`
  body {
    background-color: ${({ theme }) => theme.bodyBackground};
    color: ${({ theme }) => theme.text};
  }
`;

export default GlobalStyles;
