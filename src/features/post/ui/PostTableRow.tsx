import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { Post } from "../../../entities/post/model/type"
import { TagName } from "../../../entities/tag/model/type"
import { useComment } from "../../comment/model/store"
import { usePost } from "../model/store"
import { Button, TableCell, TableRow } from "../../../shared/ui"
import HighlightText from "../../../widgets/HighlightText"
import { PostAuthor } from "./PostAuthor"
import { PostReaction } from "../../../entities/post/ui/PostReaction"
import { PostTag } from "./PostTag"
import { Key } from "react"
import { useSearch } from "../../../shared/model/useSearch"

export const PostTableRow = ({ post }: { key: Key; post: Post }) => {
  const { fetchComments } = useComment()
  const { setSelectedPost, setShowPostDetailDialog, deletePost, setShowEditDialog } = usePost()
  const { searchQuery } = useSearch()
  // 게시물 상세 보기
  const openPostDetail = (post: Post) => {
    setSelectedPost(post)
    fetchComments(post.id)
    setShowPostDetailDialog(true)
  }

  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>
            <HighlightText text={post.title} highlight={searchQuery} />
          </div>
          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag: TagName) => (
              <PostTag key={tag} tag={tag} />
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <PostAuthor author={post.author} />
      </TableCell>
      <TableCell>
        <PostReaction reactions={post.reactions} />
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
              setShowEditDialog(true)
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
