import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import highlightText from "../../../shared/ui/highlightText"
import { Post } from "../../../entities/posts/model/types"
import { CommentsListView } from "../../comments/ui/CommentsListView"
import { Comment } from "../../../entities/comments/model/types"

interface PostDetailDialogProps {
  isShow: boolean
  handleDialog: () => void
  selectedPost: Post | null
  searchQuery: string
  setSelectedComment: (comment: Comment) => void
  setShowEditCommentDialog: (show: boolean) => void
  handleAddComment: () => void
}

export const PostDetailDialog = ({
  isShow,
  handleDialog,
  selectedPost,
  searchQuery,
  setSelectedComment,
  setShowEditCommentDialog,
  handleAddComment,
}: PostDetailDialogProps) => {
  return (
    <Dialog open={isShow} onOpenChange={handleDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title || "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
          {selectedPost?.id && (
            <CommentsListView
              postId={selectedPost.id}
              searchQuery={searchQuery}
              setSelectedComment={setSelectedComment}
              setShowEditCommentDialog={setShowEditCommentDialog}
              handleAddComment={handleAddComment}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
