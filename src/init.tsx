import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import initI18n from './utils/i18n';
import { setupStore } from './store';
import App from './App';

const runApp = async () => {
  await initI18n();

  createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <Provider store={setupStore()}>
          <App />
        </Provider>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export default runApp;
