/* eslint-disable import/no-mutable-exports */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '../locales';

// to get direct access to the instance of i18n, so as not to use Trans component or useTranslation hook.
export let i18nextInstance: typeof i18n;

const initI18n = async () => {
  const currentLanguage = localStorage.getItem('currentLang') || 'ru';

  i18nextInstance = i18n.createInstance();
  await i18nextInstance.use(initReactI18next).init({
    lng: currentLanguage,
    resources,
  });
};

export default initI18n;
