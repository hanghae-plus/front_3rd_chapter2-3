import { TableCell, TableRow } from "../../shared/ui"
import { Post } from "../../shared/type"
import { ThumbsDown, ThumbsUp } from "lucide-react"
import highlightText from "../../shared/ui/highlightText"
import { AuthorInfo } from "./AuthorInfo"
import { PostActions } from "./PostActions"
import { TagItem } from "../tag/TagItem"
import { useParam } from "../../shared/model/useParam"

export function PostTableRow({ post }: { post: Post }) {
  const { searchQuery } = useParam()
  return (
    <TableRow key={post.id}>
      <TableCell>{post.id}</TableCell>
      <TableCell>
        <div className="space-y-1">
          <div>{highlightText(post.title, searchQuery)}</div>

          <div className="flex flex-wrap gap-1">
            {post.tags.map((tag, index) => (
              <TagItem key={index} tag={tag} />
            ))}
          </div>
        </div>
      </TableCell>
      <TableCell>
        <AuthorInfo author={post.author} />
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
        <PostActions post={post} />
      </TableCell>
    </TableRow>
  )
}
