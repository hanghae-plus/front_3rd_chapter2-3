import React from 'react'

interface HighlightTextProps {
  text: string | undefined
  highlight: string
}

export const HighlightText: React.FC<HighlightTextProps> = ({ text, highlight }) => {
  if (!text) return <span />
  if (!highlight.trim()) {
    return <span>{text}</span>
  }

  try {
    const regex = new RegExp(`(${highlight})`, 'gi')
    const parts = text.split(regex)
    
    return (
      <span>
        {parts.map((part, i) => (
          regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
        ))}
      </span>
    )
  } catch (error) {
    console.error('Error in HighlightText:', error)
    return <>{text}</>
  }
}

export const highlightText = (text: string, highlight: string): JSX.Element => {
  if (!text) return <span />
  if (!highlight.trim()) {
    return <span>{text}</span>
  }

  const regex = new RegExp(`(${highlight})`, 'gi')
  const parts = text.split(regex)
  
  return (
    <span>
      {parts.map((part, i) => (
        regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>
      ))}
    </span>
  )
}
