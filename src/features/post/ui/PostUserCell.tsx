import { TableCell } from "@/shared/ui"
import { User } from "@/entities/user"
import { PostWithUsers } from "@/features/post"
import { useUserStore } from "@/features/user"
import { useModalStore } from "@/features/modal"

type UserCellProps = {
  post: PostWithUsers
}

export const PostUserCell = ({ post }: UserCellProps) => {
  const { updateCurrentUserId } = useUserStore()
  const { openUserModal } = useModalStore()

  const handleClickUser = (user: User) => {
    updateCurrentUserId(user.id)
    openUserModal()
  }

  return (
    <TableCell>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => {
          handleClickUser(post.author)
        }}
      >
        <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
        <span>{post.author?.username}</span>
      </div>
    </TableCell>
  )
}
