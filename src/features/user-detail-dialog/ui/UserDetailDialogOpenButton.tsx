import { Post } from "@/shared/types"

interface Props {
  post: Post
  onClick: React.MouseEventHandler<HTMLDivElement>
}

const UserDetailDialogOpenButton = ({ post, onClick }: Props) => {
  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={onClick}>
      <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
      <span>{post.author?.username}</span>
    </div>
  )
}

export default UserDetailDialogOpenButton
