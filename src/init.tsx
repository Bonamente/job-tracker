import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import initI18n from './utils/i18n';
import { store } from './store';
import App from './App';

const runApp = async () => {
  await initI18n();

  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
};

export default runApp;
