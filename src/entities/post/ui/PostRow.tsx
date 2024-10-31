import { type FC } from "react"
import { Edit2, MessageSquare, ThumbsDown, ThumbsUp, Trash2 } from "lucide-react"
import { Button } from "@/shared/ui/components/button"
import { TableCell, TableRow } from "@/shared/ui/layouts/table"
import type { Post } from "../model/types"

interface PostRowProps {
  post: Post
  searchQuery?: string
  onEdit: (post: Post) => void
  onDelete: (id: number) => void
  onCommentClick: (post: Post) => void
  onUserClick: (userId: number) => void
}

export const PostRow: FC<PostRowProps> = ({ post, searchQuery, onEdit, onDelete, onCommentClick, onUserClick }) => {
  // 검색어 하이라이트 함수
  const highlightText = (text: string, query: string) => {
    if (!query) return text
    const parts = text.split(new RegExp(`(${query})`, "gi"))
    return parts.map((part, i) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={i} className="bg-yellow-200">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  return (
    <TableRow>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="font-medium">{highlightText(post.title, searchQuery || "")}</div>
        <div className="flex gap-1">
          {post.tags.map((tag) => (
            <span
              className="px-1 text-[9px] font-semibold rounded-[4px] cursor-pointer text-blue-800 bg-blue-100 hover:bg-blue-200"
              key={tag}
            >
              {tag}
            </span>
          ))}
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onUserClick(post.userId)}>
          <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
          <span>{post.author?.username}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <ThumbsUp />
          <span>{post.reactions?.likes || 0}</span>
          <ThumbsDown />
          <span>{post.reactions?.dislikes || 0}</span>
        </div>
      </TableCell>
      <TableCell>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon" onClick={() => onCommentClick(post)}>
            <MessageSquare className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onEdit(post)}>
            <Edit2 className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(post.id)}>
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  )
}
