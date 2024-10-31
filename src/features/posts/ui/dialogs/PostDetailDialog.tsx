import { useParams } from "react-router-dom"
import { highlightText } from "../../../../shared"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../../shared/ui/dialog"
import CommentList from "../../../comments/ui/CommentList/CommentList"
import { PostDetailDialogProps } from "../../model/type"

const PostDetailDialog = ({ isOpen, close, post }: PostDetailDialogProps) => {
  const { searchQuery } = useParams()

  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post?.title, searchQuery ?? "")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post?.body, searchQuery ?? "")}</p>
          <CommentList postId={post?.id} />
        </div>
      </DialogContent>
      s
    </Dialog>
  )
}

export default PostDetailDialog
