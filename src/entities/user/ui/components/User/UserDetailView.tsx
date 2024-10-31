import { User } from "../../../../../feature/users/model/types"
import { UserAvatar } from "./UserAvatar"
import { UserInfo } from "./UserInfo"

interface UserDetailsViewProps {
  user: User
}

export const UserDetailsView = ({ user }: UserDetailsViewProps) => (
  <div className="space-y-4">
    <UserAvatar image={user.image} username={user.username} />
    <h3 className="text-xl font-semibold text-center">
      {user.username}
    </h3>
    <UserInfo user={user} />
  </div>
)