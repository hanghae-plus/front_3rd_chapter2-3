import * as React from 'react';

export const highlightText = (text: string, searchQuery: string) => {
    if (!text) return null;
    if (!searchQuery.trim()) {
      return <span>{text}</span>;
    }
  
    const regex = new RegExp(`(${searchQuery})`, "gi");
    const parts = text.split(regex);
  
    return (
      <span>
        {parts.map((part, i) => (
          regex.test(part) ? (
            <mark key={i} className="bg-yellow-200 rounded px-[2px]">
              {part}
            </mark>
          ) : (
            <span key={i}>{part}</span>
          )
        ))}
      </span>
    );
  };