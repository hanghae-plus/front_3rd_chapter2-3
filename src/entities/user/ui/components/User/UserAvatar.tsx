interface UserAvatarProps {
  image: string
  username: string
  className?: string
}

export const UserAvatar = ({ image, username, className = "" }: UserAvatarProps) => (
  <img
    src={image}
    alt={username}
    className={`w-24 h-24 rounded-full mx-auto ${className}`}
  />
)