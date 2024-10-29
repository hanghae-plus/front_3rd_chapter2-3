import { createCommentApi } from "../../entities/comment/api"
import { Comments, NewComment } from "../../entities/comment/model/type"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../shared/ui"

interface Props {
  newComment: NewComment
  setComments: React.Dispatch<React.SetStateAction<Comments>>
  setShowAddCommentDialog: React.Dispatch<React.SetStateAction<boolean>>
  setNewComment: React.Dispatch<React.SetStateAction<NewComment>>
  showAddCommentDialog: boolean
}

const CommentAddDialog = ({
  newComment,
  setComments,
  setShowAddCommentDialog,
  setNewComment,
  showAddCommentDialog,
}: Props) => {
  // 댓글 추가
  const addComment = async () => {
    const data = await createCommentApi(newComment)
    setComments((prev: Comments) => ({
      ...prev,
      [data.postId]: [...(prev[data.postId] || []), data],
    }))
    setShowAddCommentDialog(false)
    setNewComment({ body: "", postId: null, userId: 1 })
  }
  return (
    <Dialog open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 댓글 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={newComment.body}
            onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
          />
          <Button onClick={addComment}>댓글 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentAddDialog
