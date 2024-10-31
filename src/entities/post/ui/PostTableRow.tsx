import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button, TableCell, TableRow } from "../../../shared/ui"
import { Post } from "../model/types"
import { HighlightedText } from "../../../shared/ui/HighlightedText"

export const PostTableRow: React.FC<{
  post: Post
  searchQuery: string
  selectedTag: string
  updateURL: () => void
  setSelectedTag: (tag: string) => void
  setSelectedPost: (post: Post) => void
  openUserModal: (userId: number) => void
  setShowPostUpdateDialog: (value: boolean) => void
  openPostDetail: (post: Post) => void
  deletePost: (postId: number) => void
}> = ({
  post,
  searchQuery,
  selectedTag,
  updateURL,
  setSelectedTag,
  setSelectedPost,
  openUserModal,
  setShowPostUpdateDialog,
  openPostDetail,
  deletePost,
}) => {
  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>
            <HighlightedText text={post.title} highlight={searchQuery} />
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
      <TableCell>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author.id)}>
          <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
          <span>{post.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp className="w-4 h-4" />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown className="w-4 h-4" />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedPost(post)
              setShowPostUpdateDialog(true)
            }}
          >
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
