import { format } from 'date-fns';

export const getStringDate = (date: Date | string | undefined): string => {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return format(date, 'yyyy-MM-dd');
}

export const getStringDateTime = (date: Date | string | undefined): string => {
  if (!date) {
    return '';
  }
  if (typeof date === 'string') {
    date = new Date(date);
  }

  return format(date, 'yyyy-MM-dd')+ 'T' + format(date, 'HH:mm');
}