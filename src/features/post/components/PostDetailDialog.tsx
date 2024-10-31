import { Post } from "../../../entities/post/model/types"
import { highlightText } from "../../../shared/lib/text"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import CommentList from "../../comment/components/CommentList"

export interface PostDetailDialogProps {
  postId: number
  post: Post | null
  searchQuery: string
  onOpenChange: (open: boolean) => void
}

const PostDetailDialog = ({ onOpenChange, post, postId, searchQuery }: PostDetailDialogProps) => {
  if (!post) return

  return (
    <Dialog open={true} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>

          <CommentList postId={postId} searchQuery={searchQuery} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
