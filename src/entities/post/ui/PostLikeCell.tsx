import { ThumbsDown, ThumbsUp } from "lucide-react"
import { TableCell } from "@shared/ui"

type PropsType = {
  reactions: { likes: number; dislikes: number }
}

export const PostLikeCell: React.FC<PropsType> = ({ reactions }) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{reactions.likes}</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{reactions.dislikes}</span>
      </div>
    </TableCell>
  )
}
