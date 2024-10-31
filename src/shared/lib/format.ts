export const formatDate = (date: string | Date, options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) => {
    const d = typeof date === 'string' ? new Date(date) : date;
    
    try {
      return d.toLocaleDateString('ko-KR', options);
    } catch (error) {
      console.error('Date formatting error:', error);
      return '날짜 형식 오류';
    }
  };