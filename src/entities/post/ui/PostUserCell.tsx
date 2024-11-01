import { useAuthor } from "@entities/user/hooks/useAuthor"
import { User } from "@entities/user/types"
import { TableCell } from "@shared/ui"

type PropsType = {
  userId: number
  openUserModal: (user: User) => void
}

export const PostUserCell: React.FC<PropsType> = ({
  userId,
  openUserModal,
}) => {
  const { author } = useAuthor(userId)

  return (
    <TableCell>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => openUserModal(author)}
      >
        <img
          src={author.image}
          alt={author.username}
          className="w-8 h-8 rounded-full"
        />
        <span>{author.username}</span>
      </div>
    </TableCell>
  )
}
