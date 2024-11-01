import { useQueryPostAuthor } from "@features/user/api/useQueryPostAuthor"
import { User } from "@entities/user/model"
import { TableCell } from "@shared/ui/table"

type PropsType = {
  userId: number
  openUserModal: (user: User) => void
}

export const PostUserInfoTableCell: React.FC<PropsType> = ({
  userId,
  openUserModal,
}) => {
  const { author } = useQueryPostAuthor(userId)

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
