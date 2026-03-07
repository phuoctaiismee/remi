import {
  format as dfFormat,
  formatDistanceToNowStrict,
} from 'date-fns';
import { toDate, DateInput } from './parse';
import { useResolveLocale, Lang } from './locale';

export function useFormatDate() {
  const resolveLocale = useResolveLocale();

  return function formatDate(
    input: DateInput,
    pattern: string,
    lang?: Lang
  ) {
    return dfFormat(toDate(input), pattern, {
      locale: lang ? useResolveLocale(lang) : resolveLocale,
    });
  };
}

export function useFromNowStrict() {
  const resolveLocale = useResolveLocale();

  return function fromNowStrict(
    input: DateInput,
    lang?: Lang,
    addSuffix = true
  ) {
    return formatDistanceToNowStrict(toDate(input), {
      locale: lang ? useResolveLocale(lang) : resolveLocale,
      addSuffix,
    });
  };
}