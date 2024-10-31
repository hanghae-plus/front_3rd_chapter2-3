import { Post } from "../../../entities/post/model/type"
import { fetchUserApi } from "../../../entities/user/api"
import { User } from "../../../entities/user/model/type"
import { useUser } from "../../user/model/store"

export const PostAuthor = ({ author }: { author: Post["author"] }) => {
  const { setSelectedUser, setShowUserModal } = useUser()
  const openUserModal = async (user: User) => {
    const userData = await fetchUserApi(user.id)
    setSelectedUser(userData)
    setShowUserModal(true)
  }
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => author && openUserModal(author)}>
      <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
      <span>{author?.username}</span>
    </div>
  )
}
