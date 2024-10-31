import { TableCell } from "../../../shared/ui/table"

interface Props {
  post: any
  highlightText: any
  searchQuery: any
  selectedTag: any
  setSelectedTag: any
  updateURL: any
}

const PostTitleCell = ({ post, highlightText, searchQuery, selectedTag, setSelectedTag, updateURL }: Props) => {
  return (
    <TableCell>
      <div className="space-y-1">
        <div>{highlightText(post.title, searchQuery)}</div>
        <div className="flex flex-wrap gap-1">
          {post?.tags?.map((tag: any) => (
            <span
              key={tag}
              className={`px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer ${
                selectedTag === tag
                  ? "text-white bg-blue-500 hover:bg-blue-600"
                  : "text-blue-800 bg-blue-100 hover:bg-blue-200"
              }`}
              onClick={() => {
                setSelectedTag(tag)
                updateURL()
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </TableCell>
  )
}

export default PostTitleCell
