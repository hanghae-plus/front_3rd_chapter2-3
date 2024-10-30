import { User } from "../../model/types"

export const UserAvatar = ({
  user,
  onClick,
}: {
  user: User
  onClick: (user: User) => void
}) => {
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => {
        onClick(user)
      }}
    >
      <img
        src={user?.image}
        alt={user?.username}
        className="w-8 h-8 rounded-full"
      />
      <span>{user?.username}</span>
    </div>
  )
}
