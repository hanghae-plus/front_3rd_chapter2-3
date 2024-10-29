import { highlightText } from "../../../shared"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import CommentList from "../../comments/ui/CommentList/CommentList"

const PostDetailDialog = () => {
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          <CommentList comments={comments} postId={selectedPost?.id} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostDetailDialog
