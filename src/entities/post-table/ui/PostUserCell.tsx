import { UserType } from "../../../shared/type"
import { TableCell } from "../../../shared/ui/table"

interface Props {
  openUserModal: any
  post: any
}

const UserModalButton = ({ openUserModal, post }: Props) => {
  return (
    <TableCell>
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => openUserModal(post.author as UserType)}
      >
        <img src={post.author?.image} alt={post.author?.username} className="w-8 h-8 rounded-full" />
        <span>{post.author?.username}</span>
      </div>
    </TableCell>
  )
}

export default UserModalButton
