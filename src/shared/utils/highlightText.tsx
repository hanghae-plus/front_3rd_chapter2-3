export const highlightText = (text: string, highlight: string) => {
  if (!text) return null
  if (!highlight.trim()) return <span>{text}</span>

  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={`${i}th-${part}`}>{part}</mark>
        ) : (
          <span key={`${i}th-${part}`}>{part}</span>
        ),
      )}
    </span>
  )
}
