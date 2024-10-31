import { ChangeEvent } from "react"
import { Textarea, Button } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { useDialog } from "../../post/model/dialogStore"
import { useCommentMutations, useComments } from "../model/commentStore"

export const CommentUpdateDialog = () => {
  const { showCommentUpdateDialog, setShowCommentUpdateDialog } = useDialog()
  const { selectedComment, setSelectedComment } = useComments()
  const { updateComment } = useCommentMutations(selectedComment?.postId ?? 0)

  const handleCommentUpdate = () => {
    if (!selectedComment) return
    updateComment.mutate(selectedComment)
    setShowCommentUpdateDialog(false)
  }

  const handleCommentBodyUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedComment) return
    setSelectedComment({ ...selectedComment, body: e.target.value })
  }

  return (
    <CustomDialog open={showCommentUpdateDialog} onOpenChange={setShowCommentUpdateDialog} title={"댓글 수정"}>
      <>
        <Textarea
          placeholder="댓글 내용"
          value={selectedComment?.body || ""}
          onChange={handleCommentBodyUpdate}
        />
        <Button onClick={handleCommentUpdate}>댓글 업데이트</Button>
      </>
    </CustomDialog>
  )
}
