export const HighlightedText: React.FC<{
  text: string
  highlight: string | undefined
}> = ({ text, highlight }) => {
  if (!text) return <></>
  if (!highlight || !highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
    </span>
  )
}
