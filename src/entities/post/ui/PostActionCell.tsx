import { usePostDelete } from "@entities/post/hooks/usePostDelete"
import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { Post } from "@entities/post/types"
import { Button } from "@shared/ui/button"
import { TableCell } from "@shared/ui"

type PropsType = {
  post: Post
  openEditDialog: (post: Post) => void
  openPostDetail: (post: Post) => void
}

export const PostActionCell: React.FC<PropsType> = ({
  post,
  openEditDialog,
  openPostDetail,
}) => {
  const { deletePost } = usePostDelete()

  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => openEditDialog(post)}>
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  )
}
