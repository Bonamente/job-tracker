import { i18nextInstance as i18n } from './i18n';

export const unauthorizedError = () => i18n.t('toasts.unauthorized');
export const jobCreatedMsg = () => i18n.t('toasts.job_created');
export const jobModifiedMsg = () => i18n.t('toasts.job_modified');
export const jobRemovedMsg = () => i18n.t('toasts.job_removed');
export const userUpdated = () => i18n.t('toasts.user_updated');
export const error = () => i18n.t('toasts.error');
export const greeting = (name: string) =>
  `${i18n.t('toasts.greeting')}${name}!`;
export const welcomeBack = (name: string) =>
  `${i18n.t('toasts.welcome_back')}${name}!`;
