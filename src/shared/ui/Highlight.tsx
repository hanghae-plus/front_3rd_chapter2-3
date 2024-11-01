import { FC } from 'react';

interface HighlightTextProps {
  text: string | undefined;
  highlight: string;
}

const HighlightText: FC<HighlightTextProps> = ({ text, highlight }) => {
  if (!text) return null;
  if (!highlight.trim()) return <span>{text}</span>;

  const regex = new RegExp(`(${highlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
    </span>
  );
};

export default HighlightText;
