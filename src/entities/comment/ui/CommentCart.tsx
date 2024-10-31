import { HighlightText } from '@shared/ui'
import { FC } from 'react'

interface CommentCardProps {
  username: string
  text: string
  searchQuery: string
}

export const CommentCard: FC<CommentCardProps> = ({ username, text, searchQuery }) => {
  return (
    <div className="flex items-center space-x-2 overflow-hidden">
      <span className="font-medium truncate">{username}:</span>
      <span className="truncate">
        <HighlightText text={text} highlight={searchQuery} />
      </span>
    </div>
  )
}
