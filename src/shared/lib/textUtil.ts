export const getHighlightText = (text: string, highlight: string) => {
  const regex = new RegExp(`(${highlight})`, 'gi');

  return text.split(regex);
};
