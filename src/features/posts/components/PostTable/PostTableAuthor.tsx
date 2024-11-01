import { useEffect, useState } from "react"
import { useUser } from "../../../../shared/hooks"
import { Author, Post } from "../../../../entities/posts/model/Post"
import { useFetchUserModalInfo } from "../../../users/api/userFeaturesApi"
import { Users } from "../../../../entities/users/model/User"

interface PostTableAuthorProps {
  post: Post
}
const PostTableAuthor = ({ post }: PostTableAuthorProps) => {
  const { showUserModal, setSelectedUser } = useUser()
  const [postAuthor, setPostAuthor] = useState<Author>({ id: 0, image: "", username: "", fullName: "" })

  const { data: userModalInfo, error: modalError, isLoading: isModalLoading } = useFetchUserModalInfo(postAuthor)
  useEffect(() => {
    if (userModalInfo && !isModalLoading && !modalError) {
      setSelectedUser(userModalInfo)
    }
  }, [userModalInfo, isModalLoading, modalError, showUserModal])

  const openUserModal = async (user: Users) => {
    setPostAuthor(user)
  }
  return (
    <div>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => post?.author && openUserModal(post.author)}
      >
        <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
        <span>{post.author?.username}</span>
      </div>
    </div>
  )
}

export default PostTableAuthor
