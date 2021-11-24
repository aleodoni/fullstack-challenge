import { parseISO, format } from 'date-fns';

const formatDateString = (date: string) => {
  try {
    const dateFormatted = format(parseISO(date), 'dd/MM/yyyy');
    return dateFormatted;
  } catch {
    return '';
  }
}

const formatDate = (date: Date) => {
  try {
    if (date) {
      const dateFormatted = format(parseISO(date.toString()), 'dd/MM/yyyy');
      return dateFormatted;
    }
    return ''
  } catch(err) {
    return '';
  }
}

const formatDateApi = (date: Date) => {
  try {
    if (date) {
      const dateFormatted = format(parseISO(date.toISOString()), 'yyyy-MM-dd');
      return dateFormatted;
    }
    return ''
  } catch(err) {
    return '';
  }
}

export { formatDateString, formatDate, formatDateApi };
