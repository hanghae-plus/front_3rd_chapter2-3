import { Post } from "../model/types.ts"

interface Props {
  tags: Post["tags"]
  selectedTag?: string
  onTagClick?: (tag: string) => void
}

const PostTagsItem = ({ tags, selectedTag, onTagClick }: Props) => {
  return (
    <div className="flex flex-wrap gap-1">
      {tags.map((tag) => (
        <span
          key={tag}
          className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
            selectedTag === tag
              ? "text-white bg-blue-500 hover:bg-blue-600"
              : "text-blue-800 bg-blue-100 hover:bg-blue-200"
          }`}
          onClick={() => onTagClick && onTagClick(tag)}
        >
          {tag}
        </span>
      ))}
    </div>
  )
}

export default PostTagsItem
