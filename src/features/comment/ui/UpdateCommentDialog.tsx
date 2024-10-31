// 댓글 수정 대화상자
import { Button } from "../../../shared/ui/Button"
import { Textarea } from "../../../shared/ui/Textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/Dialog"
import { useComment } from "../model/useComment"
import { Comment } from "../model/types"
import useMutationUpdateComment from "../api/useMutationUpdateComment"

const UpdateCommentDialog = () => {
  const { selectedComment, setSelectedComment, showEditCommentDialog, setShowEditCommentDialog } = useComment()
  const { mutate: mutateUpdateComment } = useMutationUpdateComment()

  // 댓글 업데이트
  const handleUpdateComment = () => {
    try {
      mutateUpdateComment()
    } catch (error) {
      console.error("댓글 업데이트 오류:", error)
    }
  }
  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>댓글 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e) => setSelectedComment({ ...(selectedComment as Comment), body: e.target.value })}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UpdateCommentDialog
