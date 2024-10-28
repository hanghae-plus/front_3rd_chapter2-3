import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import { CommentView } from "../../../widgets/comment/ui/CommentView"
import { usePostsContext } from "../../../entities/post/model/PostContext"
import { usePostParamsContext } from "../../../entities/post/model/PostParamsContext"

export const PostDetailModal = () => {
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePostsContext()
  const { searchQuery } = usePostParamsContext()

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title, searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body, searchQuery)}</p>
          {selectedPost && <CommentView postId={selectedPost.id} />}
        </div>
      </DialogContent>
    </Dialog>
  )
}
