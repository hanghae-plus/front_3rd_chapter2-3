import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui"
import { CommentList } from "../comment/CommentList"
import { highlightText } from "../../../shared/lib/highlight"
import { usePost } from "../../../shared/model/usePost"
import { useURLParams } from "../../../shared/model/useURLParams"
import { useComment } from "../../../features/model/useComment"

export const PostDetailDialog = () => {
  const { showPostDetailDialog, setShowPostDetailDialog, selectedPost } = usePost()
  const { params } = useURLParams()
  const { search: searchQuery } = params
  const { setNewComment, setShowAddCommentDialog, setShowEditCommentDialog, setSelectedComment } = useComment()
  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title || "", searchQuery as string)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body || "", searchQuery as string)}</p>
          <CommentList
            postId={selectedPost?.id as number}
            searchQuery={searchQuery as string}
            onAddClick={() => {
              setNewComment((prev) => ({ ...prev, postId: selectedPost?.id as number }))
              setShowAddCommentDialog(true)
            }}
            onEditClick={(comment) => {
              setSelectedComment(comment)
              setShowEditCommentDialog(true)
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}
