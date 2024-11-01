import { Button, DialogHeader, Textarea, Dialog, DialogContent, DialogTitle } from "../../../shared/ui"
import { Comment } from "../../../entities/comments/model/types"
import { updateCommentMutation } from "../api"

interface CommentUpdateDialogProps {
  isShow: boolean
  handleDialog: () => void
  selectedComment: Comment
  setSelectedComment: (comment: Comment | null) => void
  selectedPostId: number
}

export const CommentUpdateDialog = ({
  isShow,
  handleDialog,
  selectedComment,
  setSelectedComment,
  selectedPostId,
}: CommentUpdateDialogProps) => {
  const { mutate: updateCommentMutate } = updateCommentMutation(selectedPostId)

  return (
    <Dialog open={isShow} onOpenChange={handleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => selectedComment && setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={() => updateCommentMutate(selectedComment)}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
