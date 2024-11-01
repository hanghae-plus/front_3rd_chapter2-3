import { Dialog, DialogContent, DialogHeader, DialogTitle, Button } from "../../shared/ui"
import { Plus } from "lucide-react"
import highlightText from "../../shared/ui/highlightText"
import { usePostDialog } from "../../features/post/model/usePostDialog"
import { usePost } from "../../features/post/model/usePost"
import { useComment } from "../../features/comment/model/useComment"
import { useCommentDialog } from "../../features/comment/model/useCommentDialog"
import { useParam } from "../../shared/model/useParam"
import { CommentItem } from "../comment/CommentItem"

export function PostDetailDialog() {
  const { selectedPost } = usePost()
  const { showPostDetailDialog, setShowPostDetailDialog } = usePostDialog()
  const { comments, setNewComment } = useComment()
  const { setShowAddCommentDialog } = useCommentDialog()
  const { searchQuery } = useParam()

  const renderComments = (postId: number) => (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment((prev) => ({ ...prev, postId }))
            setShowAddCommentDialog(true)
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {comments[postId]?.map((comment) => <CommentItem comment={comment} postId={postId} />)}
      </div>
    </div>
  )

  return (
    <Dialog open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{highlightText(selectedPost?.title || "", searchQuery)}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>{highlightText(selectedPost?.body || "", searchQuery)}</p>
          {selectedPost && renderComments(selectedPost.id)}
        </div>
      </DialogContent>
    </Dialog>
  )
}
