export const lightTheme = {
  name: 'light',
  text: '#363537',
  bodyBackground: 'hsl(225deg, 25%, 95%)',
  primaryBackground: '#ffffff',
  secondaryBackground: '#ffffff',
  activeNavLinkColor: '#363537',
  navLinkBgColor: 'hsl(225deg, 25%, 95%)',
};

export const darkTheme = {
  name: 'dark',
  text: '#fafafa',
  bodyBackground: 'hsl(210deg, 30%, 8%)',
  primaryBackground: 'hsl(210deg, 30%, 8%)',
  secondaryBackground: 'hsl(210deg, 22%, 15%)',
  activeNavLinkColor: '#3b82f6',
  navLinkBgColor: 'hsl(210deg, 22%, 15%)',
};

export type LightTheme = typeof lightTheme;
export type DarkTheme = typeof darkTheme;
