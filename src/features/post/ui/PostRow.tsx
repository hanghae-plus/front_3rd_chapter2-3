import { TableRow, TableCell } from "../../../shared/ui/Table"
import { Button } from "../../../shared/ui/Button/Button"
import { ThumbsUp, ThumbsDown, Edit2, Trash2, MessageSquare } from "lucide-react"
import Tag from "./Tag"

interface PostRowProps {
  post: Post
  onEdit: (post: Post) => void
  onDelete: (postId: number) => void
  onDetail: (post: Post) => void
  onTagSelect: (tag: string) => void
  selectedTag: string
  highlightText: (text: string, highlight: string) => React.ReactNode
  searchQuery: string
  openUserModal: (user: User) => void
}

const PostRow: React.FC<PostRowProps> = ({
  post,
  onEdit,
  onDelete,
  onDetail,
  onTagSelect,
  selectedTag,
  highlightText,
  searchQuery,
  openUserModal
}) => (
  <TableRow key={post.id}>
    <TableCell>{post.id}</TableCell>
    <TableCell>
      <div className="space-y-1">
        <div>{highlightText(post.title, searchQuery)}</div>
        <div className="flex flex-wrap gap-1">
          {post.tags.map((tag) => (
            <Tag key={tag} tag={tag} selectedTag={selectedTag} onTagSelect={onTagSelect} />
          ))}
        </div>
      </div>
    </TableCell>
    <TableCell>
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
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
        <Button variant="ghost" size="sm" onClick={() => onDetail(post)}>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onEdit(post)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => onDelete(post.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  </TableRow>
)

export default PostRow