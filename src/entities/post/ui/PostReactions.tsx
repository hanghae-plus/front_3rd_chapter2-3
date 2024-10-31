import { Reactions } from '@entities/post/model/post.types'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { FC } from 'react'

interface PostReactionsProps {
  reactions: Reactions
}

export const PostReactions: FC<PostReactionsProps> = ({ reactions }) => {
  return (
    reactions && (
      <div className="flex items-center gap-2">
        <ThumbsUp className="w-4 h-4" />
        <span>{reactions.likes}</span>
        <ThumbsDown className="w-4 h-4" />
        <span>{reactions.dislikes}</span>
      </div>
    )
  )
}
