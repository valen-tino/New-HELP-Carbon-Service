export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const getPeriodLabel = (period: 'week' | 'month' | 'year'): string => {
  switch (period) {
    case 'week':
      return 'Past 7 Days';
    case 'month':
      return 'Past Month';
    case 'year':
      return 'Past Year';
    default:
      return '';
  }
};