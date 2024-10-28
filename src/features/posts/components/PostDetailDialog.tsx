import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Button
} from '../../../shared/ui'
import { Post } from "../../../entity/post/model"
import { Comment } from "../../../entity/comment/model"
import { CommentsList } from '../../../features/comments/components/CommentsList'

interface PostDetailDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  post: Post | null
  comments: Comment[]
  searchQuery: string
  onAddComment: () => void
  onEditComment: (comment: Comment) => void
  onDeleteComment: (commentId: number) => void
  highlightText: (text: string, highlight: string) => JSX.Element
}

export const PostDetailDialog = ({
  isOpen,
  onOpenChange,
  post,
  comments,
  searchQuery,
  onAddComment,
  onEditComment,
  onDeleteComment,
  highlightText
}: PostDetailDialogProps) => {
  if (!post) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(post.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(post.body, searchQuery)}</p>
          <div className="flex justify-between items-center">
            <h4 className="font-semibold">댓글</h4>
            <Button variant="outline" size="sm" onClick={onAddComment}>
              댓글 추가
            </Button>
          </div>
          <CommentsList
            comments={comments}
            onEdit={onEditComment}
            onDelete={onDeleteComment}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
