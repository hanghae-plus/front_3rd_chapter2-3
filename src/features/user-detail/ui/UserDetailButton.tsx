import { Post } from "../../../entities/post/model/types"
import { useUserStore } from "../../user/model/userStore"

interface Props {
  post: Post
}

export const UserDetailButton = ({ post }: Props) => {
  const { openUserModal } = useUserStore()

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => openUserModal(post.author)}>
      <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
      <span>{post.author?.username}</span>
    </div>
  )
}
