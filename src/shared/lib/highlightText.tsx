const getSpanText = (text: string) => <span>{text}</span>
const validate = (text: string, highlight: string) => {
  if (!text) return null
  if (!highlight.trim()) {
    return getSpanText(text)
  }

  return true
}

const highlightPartsByRegexp = (parts: string[], regexp: RegExp) => (
  <span>{parts.map((part, i) => (regexp.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}</span>
)

export const highlightText = (text: string, highlight: string) => {
  const validated = validate(text, highlight)
  if (validated !== true) return validated

  const regexp = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regexp)
  return highlightPartsByRegexp(parts, regexp)
}
