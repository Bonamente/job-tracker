import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '../locales';

const initI18n = async () => {
  const currentLanguage = localStorage.getItem('currentLang') || 'ru';

  const i18nextInstance = i18n.createInstance();
  await i18nextInstance.use(initReactI18next).init({
    lng: currentLanguage,
    resources,
  });
};

export default initI18n;
