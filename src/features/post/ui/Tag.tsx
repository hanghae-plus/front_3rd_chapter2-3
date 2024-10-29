interface TagProps {
  tag: string
  selectedTag: string
  onTagSelect: (tag: string) => void
}

const Tag: React.FC<TagProps> = ({ tag, selectedTag, onTagSelect }) => {
  const isSelected = selectedTag === tag
  const tagClass = isSelected
    ? "text-white bg-blue-500 hover:bg-blue-600"
    : "text-blue-800 bg-blue-100 hover:bg-blue-200"

  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${tagClass}`}
      onClick={() => onTagSelect(tag)}
    >
      {tag}
    </span>
  )
}

export default Tag