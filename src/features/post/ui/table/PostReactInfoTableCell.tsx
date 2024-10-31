import { useMutationPostDelete } from "@features/post/api/useMutationPostDelete"
import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { Post } from "@entities/post/model"
import { Button } from "@shared/ui/button"
import { TableCell } from "@shared/ui/table"

type PropsType = {
  post: Post
  openEditModal: (post: Post) => void
  openPostDetail: (post: Post) => void
}

export const PostReactInfoTableCell: React.FC<PropsType> = ({
  post,
  openEditModal,
  openPostDetail,
}) => {
  const { deletePost } = useMutationPostDelete()

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => openEditModal(post)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  )
}
