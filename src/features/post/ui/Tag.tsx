import { useAtom } from "jotai";
import { selectedTagAtom } from "../../../entities/tag/model/tagAtom";

interface TagProps {
  tag: string
}

const Tag: React.FC<TagProps> = ({ tag }) => {
  const [selectedTag, setSelectedTag] = useAtom(selectedTagAtom);
  
  const isSelected = selectedTag === tag
  const tagClass = isSelected
    ? "text-white bg-blue-500 hover:bg-blue-600"
    : "text-blue-800 bg-blue-100 hover:bg-blue-200"

  return (
    <span
      key={tag}
      className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${tagClass}`}
      onClick={() => {
        setSelectedTag(tag);
        updateURL();
      }}
    >
      {tag}
    </span>
  )
}

export default Tag