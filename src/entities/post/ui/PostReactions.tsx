import { Reactions } from '@entities/comment/model/types'
import { ThumbsDown, ThumbsUp } from 'lucide-react'
import { FC } from 'react'

interface PostReactionsProps {
  reactions: Reactions
}

export const PostReactions: FC<PostReactionsProps> = ({ reactions }) => {
  return (
    <div className="flex items-center gap-2">
      <ThumbsUp className="w-4 h-4" />
      <span>{reactions?.likes || 0}</span>
      <ThumbsDown className="w-4 h-4" />
      <span>{reactions?.dislikes || 0}</span>
    </div>
  )
}
