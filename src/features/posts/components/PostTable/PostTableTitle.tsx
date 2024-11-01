import { Post } from "../../../../entities/posts/model/Post"
import { usePost } from "../../../../shared/hooks"
import HighlightText from "../../../../shared/ui/HighlightText"

interface PostTableProps {
  post: Post
}
const PostTableTitle = ({ post }: PostTableProps) => {
  const { searchQuery, selectedTag, setSelectedTag } = usePost()
  function handleSelectedTag(tag: string) {
    setSelectedTag(tag)
  }
  return (
    <>
      <div className="space-y-1">
        <div>
          <HighlightText text={post.title} highlight={searchQuery} />
        </div>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                selectedTag === tag
                  ? "text-white bg-blue-500 hover:bg-blue-600"
                  : "text-blue-800 bg-blue-100 hover:bg-blue-200"
              }`}
              onClick={() => {
                handleSelectedTag(tag)
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </>
  )
}

export default PostTableTitle
