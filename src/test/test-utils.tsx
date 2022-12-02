/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/function-component-definition */
/* eslint-disable import/prefer-default-export */
import { render } from '@testing-library/react';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import {
  BrowserRouter,
  createMemoryRouter,
  RouterProvider,
} from 'react-router-dom';

import { lightTheme } from 'src/themes';
import type { LightTheme, DarkTheme } from 'src/themes';
import GlobalStyles from 'src/styles/GlobalStyles';
import { setupStore } from 'src/store';
import type { AppStore, RootState } from 'src/store';

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  theme?: LightTheme | DarkTheme;
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
  isRoutingTesting?: boolean;
}

export const renderWithProviders = (
  ui: React.ReactElement,
  {
    theme = lightTheme,
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    isRoutingTesting = false,
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return isRoutingTesting ? (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Provider store={store}>{children}</Provider>
      </ThemeProvider>
    ) : (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Provider store={store}>{children}</Provider>
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};

// Use to test routing works properly (for React Router v6).
export const renderWithRouter = (
  initialRoute: string,
  component: React.ReactElement
) => {
  const router = createMemoryRouter([
    {
      path: initialRoute,
      element: component,
    },
  ]);

  renderWithProviders(<RouterProvider router={router} />, {
    isRoutingTesting: true,
  });

  return { router };
};

export * from '@testing-library/react';
