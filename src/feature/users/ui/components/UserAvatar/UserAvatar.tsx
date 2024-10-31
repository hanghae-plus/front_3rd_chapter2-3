import { useUserQuery } from "../../../lib/hooks/useUserQuery"
import { User } from "../../../model/types"

export const UserAvatar = ({
  user,
  onClick,
}: {
  user: number
  onClick: (user: User) => void
}) => {
  const { data: userInfo, isPending } = useUserQuery(user)

  if (!userInfo) return
  if (isPending) {
    return <div>로딩 중...</div>
  }
  return (
    <div
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => {
        onClick(userInfo)
      }}
    >
      <img
        src={userInfo?.image}
        alt={userInfo?.username}
        className="w-8 h-8 rounded-full"
      />
      <span>{userInfo?.username}</span>
    </div>
  )
}
