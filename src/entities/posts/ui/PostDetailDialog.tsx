import CommentsSection from "../../../features/comments/components/CommentsSection"
import { highlightText } from "../../../features/lib/commonUtils"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { SelectedPost } from "../model/Post"

interface PostDetailDialogProps {
  showPostDetailDialog: boolean
  setShowPostDetailDialog: (show: boolean) => void
  selectedPost: SelectedPost
  searchQuery: string
}

const PostDetailDialog = ({
  showPostDetailDialog,
  setShowPostDetailDialog,
  selectedPost,
  searchQuery,
}: PostDetailDialogProps) => {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {selectedPost.id && <CommentsSection postId={selectedPost?.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
