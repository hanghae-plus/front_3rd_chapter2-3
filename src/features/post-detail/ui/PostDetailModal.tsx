import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { highlightText } from "../../../shared/lib/highlightText"
import { CommentView } from "../../../widgets/comment/ui/CommentView"
import { usePosts } from "../../post/model/postStore"
import { usePostParams } from "../../post/model/postParamsStore"

export const PostDetailModal = () => {
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePosts()
  const { searchQuery } = usePostParams()

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
