import { Post } from "../../../entities/post/model/types.ts"

interface Props {
  tags: Post["tags"]
  selectedTag: string
  setParam: (key: "selectedTag", value?: string | number) => void
}

const PostTagFilter = ({ tags, selectedTag, setParam }: Props) => {
  return (
    <div className="flex flex-wrap gap-1">
      <div className="flex flex-wrap gap-1">
        {tags.map((tag) => (
          <span
            key={tag}
            className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
              selectedTag === tag
                ? "text-white bg-blue-500 hover:bg-blue-600"
                : "text-blue-800 bg-blue-100 hover:bg-blue-200"
            }`}
            onClick={() => setParam("selectedTag", tag)}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default PostTagFilter
