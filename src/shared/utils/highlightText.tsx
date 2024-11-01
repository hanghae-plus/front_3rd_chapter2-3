interface HighlightedPart {
  text: string
  isMatch: boolean
  key: string
}

export const highlightText = (text: string, searchTerm: string): JSX.Element | null => {
  if (!text) return null
  if (!searchTerm?.trim()) return <span>{text}</span>

  try {
    const searchRegex = new RegExp(`(${searchTerm})`, "gi")
    
    const textParts: HighlightedPart[] = text.split(searchRegex).map((part, index) => ({
      text: part,
      isMatch: searchRegex.test(part),
      key: `highlight-${index}-${part}`
    }))

    return (
      <span className="highlighted-text">
        {textParts.map(({ text: part, isMatch, key }) => 
          isMatch ? (
            <mark 
              key={key}
              className="bg-yellow-200 rounded-sm px-0.5"
            >
              {part}
            </mark>
          ) : (
            <span key={key}>{part}</span>
          )
        )}
      </span>
    )
  } catch (error) {
    return <span>{text}</span>
  }
}