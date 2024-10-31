import { useComments } from "../../../entities/Comment/model/useComment"
import { useCommentDialog } from "../../../entities/Comment/model/useCommentDialog"
import usePost from "../../../entities/Post/model/usePost"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"

export const AddCommentDialog: React.FC = ({}) => {
  const { showAddCommentDialog, setShowAddCommentDialog } = useCommentDialog()
  const { selectedPost } = usePost()
  const { newComment, setNewComment, addComment } = useComments(selectedPost?.id ?? 0)

  const handleNewCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNewComment({ ...newComment, body: e.target.value })
  }

  const handleAddComment = () => {
    addComment(newComment)
    setShowAddCommentDialog(false)
  }

  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea placeholder="댓글 내용" value={newComment.body} onChange={handleNewCommentChange} />
          <Button onClick={handleAddComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
