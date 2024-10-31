import { useEffect } from "react"
import updateComment from "../../../entities/comment/model/updateComment"
import useCommentStore from "../../../entities/comment/model/useCommentStore"
import { CommentType } from "../../../shared/type"
import { Button } from "../../../shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Textarea } from "../../../shared/ui/textarea"

const CommentEditModal = () => {
  const { showEditCommentDialog, setShowEditCommentDialog, selectedComment, setSelectedComment } =
    useCommentStore.getState()

  useEffect(() => {}, [showEditCommentDialog])

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
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setSelectedComment({ ...selectedComment, body: e.target.value } as CommentType)
            }
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentEditModal
