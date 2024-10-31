import { Edit2, MessageSquare, Trash2 } from "lucide-react"
import { Button } from "../../../shared/ui/button"
import { TableCell } from "../../../shared/ui/table"

interface Props {
  post: any
  setSelectedPost: any
  setShowEditDialog: any
  openPostDetail: any
  deletePost: any
}

const PostActionCell = ({ post, setSelectedPost, setShowEditDialog, openPostDetail, deletePost }: Props) => {
  return (
    <TableCell>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={() => openPostDetail(post)}>
          <MessageSquare className="w-4 h-4" />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setSelectedPost(post)
            setShowEditDialog(true)
          }}
        >
          <Edit2 className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)}>
          <Trash2 className="w-4 h-4" />
        </Button>
      </div>
    </TableCell>
  )
}

export default PostActionCell
