import { ThumbsDown, ThumbsUp } from "lucide-react"
import { Post } from "../model/type"

export const PostReaction = ({ reactions }: { reactions: Post["reactions"] }) => (
  <div className="flex items-center gap-2">
    <ThumbsUp className="w-4 h-4" />
    <span>{reactions?.likes || 0}</span>
    <ThumbsDown className="w-4 h-4" />
    <span>{reactions?.dislikes || 0}</span>
  </div>
)
