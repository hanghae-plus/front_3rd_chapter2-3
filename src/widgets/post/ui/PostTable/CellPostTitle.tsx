import { UpdatePostQueryParam } from "../../../../entities/post"
import { Post } from "../../../../entities/post/model/types"
import { TextHighlighter } from "../../../../shared/ui"

type PostTitleProps = Pick<Post, "title" | "tags"> & {
  searchQuery: string
  selectedTag: string
  updateQueryParam: UpdatePostQueryParam
}

export const CellPostTitle = ({
  title,
  tags,
  searchQuery,
  selectedTag,
  updateQueryParam,
}: PostTitleProps) => {
  const handleTagClick = (tag: string) => {
    updateQueryParam({ tag })
  }

  return (
    <div className="space-y-1">
      <TextHighlighter text={title} highlight={searchQuery} />
      <div className="flex flex-wrap gap-1">
        {tags?.map((tag) => (
          <span
            key={tag}
            className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
              selectedTag === tag
                ? "text-white bg-blue-500 hover:bg-blue-600"
                : "text-blue-800 bg-blue-100 hover:bg-blue-200"
            }`}
            onClick={() => handleTagClick(tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}
