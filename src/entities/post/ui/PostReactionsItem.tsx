import { ThumbsDown, ThumbsUp } from "lucide-react"
import { Post } from "../model/types.ts"

interface Props {
  reactions: Post["reactions"]
}

const PostReactionsItem = ({ reactions }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{reactions?.likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{reactions?.dislikes || 0}</span>
    </div>
  )
}

export default PostReactionsItem
