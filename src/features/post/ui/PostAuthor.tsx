import { Post } from "../../../entities/post/model/type"
import { useUser } from "../../user/model/store"

export const PostAuthor = ({ author }: { author: Post["author"] }) => {
  const { openUserModal } = useUser()
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => author && openUserModal(author)}>
      <img src={author?.image} alt={author?.username} className="w-8 h-8 rounded-full" />
      <span>{author?.username}</span>
    </div>
  )
}
