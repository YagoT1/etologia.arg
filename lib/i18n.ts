import { i18nConfig, type Locale } from '@/config/i18n';

export async function getMessages(locale: Locale) {
  if (!i18nConfig.locales.includes(locale)) return import('@/messages/es.json');
  return import(`@/messages/${locale}.json`);
}
