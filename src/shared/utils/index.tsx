import React from 'react';

/**
 * 문자열을 정규 표현식에서 안전하게 사용하기 위해 이스케이프 처리합니다.
 * @param string 문자열
 * @returns 이스케이프 처리된 문자열
 */
const escapeRegExp = (string: string): string => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

/**
 * highlightText 함수는 주어진 텍스트에서 특정 단어를 하이라이트하여 반환합니다.
 *
 * @param text - 하이라이트할 전체 텍스트
 * @param highlight - 하이라이트할 단어 또는 구문 (선택적)
 * @returns React.ReactNode 또는 null
 */
export const highlightText = (
  text: string,
  highlight?: string
): React.ReactNode | null => {
  if (!text) return null;

  if (!highlight?.trim()) {
    return <span>{text}</span>;
  }

  // 하이라이트 단어를 대소문자 구분 없이 찾기 위한 정규 표현식
  const escapedHighlight = escapeRegExp(highlight);
  const regex = new RegExp(`(${escapedHighlight})`, 'gi');
  const parts = text.split(regex);

  return (
    <span>
      {parts.map((part, index) => {
        const isMatch = part.match(regex);
        return isMatch ? (
          <mark key={index}>{part}</mark>
        ) : (
          <span key={index}>{part}</span>
        );
      })}
    </span>
  );
};
