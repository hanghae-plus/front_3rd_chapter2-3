import { User } from '@entities/user/model/user.types'
import { FC } from 'react'

interface UserAvatarProps {
  author: User
  onClick: (user: User) => void
}

export const UserAvatar: FC<UserAvatarProps> = ({
  author,
  onClick,
}: {
  author: User
  onClick: (user: User) => void
}) => {
  return (
    author && (
      <div className="flex items-center space-x-2 cursor-pointer" onClick={() => onClick(author)}>
        <img src={author.image} alt={author.username} className="w-8 h-8 rounded-full" />
        <span>{author.username}</span>
      </div>
    )
  )
}
