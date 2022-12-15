/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable react/function-component-definition */
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { PropsWithChildren } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import type { RenderOptions } from '@testing-library/react';
import type { PreloadedState } from '@reduxjs/toolkit';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

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
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <BrowserRouter>
          <Provider store={store}>{children}</Provider>
          <ToastContainer position="top-center" autoClose={2000} />
        </BrowserRouter>
      </ThemeProvider>
    );
  }

  return {
    user: userEvent.setup(),
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
};

export * from '@testing-library/react';
