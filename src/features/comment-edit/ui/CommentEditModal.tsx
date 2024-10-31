import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { useMutationCommentUpdate } from "../../comment/api/useMutationCommentUpdate"
import { useCommentsStore } from "../../comment/model/commentStore"

export const CommentEditModal = () => {
  const { showEditCommentDialog, setShowEditCommentDialog, selectedComment, setSelectedComment } = useCommentsStore()

  const { mutate: updateCommentMutate } = useMutationCommentUpdate()

  const handleUpdateComment = () => {
    if (!selectedComment) return
    if (selectedComment.body === "") {
      alert("댓글을 입력해주세요.")
      return
    }

    updateCommentMutate(selectedComment)

    setShowEditCommentDialog(false)
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
            onChange={(e) => {
              setSelectedComment({ ...selectedComment!, body: e.target.value })
            }}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
