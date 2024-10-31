import { ThumbsDown, ThumbsUp } from "lucide-react"
import { TableCell } from "../../../shared/ui/table"

interface Props {
  post: any
}

const PostReactionCell = ({ post }: Props) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{post.reactions?.likes || 0}</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{post.reactions?.dislikes || 0}</span>
      </div>
    </TableCell>
  )
}

export default PostReactionCell
