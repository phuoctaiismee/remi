import { vi, enUS, Locale } from 'date-fns/locale';
import { useLocale } from 'next-intl';

export type Lang = 'vi' | 'en';

export const localeMap = {
  vi,
  en: enUS,
} satisfies Record<Lang, Locale>;

export function useResolveLocale(lang?: Lang): Locale {
  let defaultLocale = 'vi' as Lang;
  try {
    defaultLocale = useLocale() as Lang;
  } catch {
    // Fallback if not wrapped in Next-Intl Provider
  }
  return localeMap[lang ?? defaultLocale ?? 'vi'];
}
