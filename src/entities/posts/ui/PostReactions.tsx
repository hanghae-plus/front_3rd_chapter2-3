import { Post } from "../model/Post"
import { ThumbsDown, ThumbsUp } from "lucide-react"

interface PostReactionsProps {
  post: Post
}
const PostReactions = ({ post }: PostReactionsProps) => {
  return (
    <>
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{post.reactions?.likes || 0}1</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{post.reactions?.dislikes || 0}</span>
      </div>
    </>
  )
}

export default PostReactions
