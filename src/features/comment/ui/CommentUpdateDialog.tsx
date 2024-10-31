import { ChangeEvent, useEffect, useState } from "react"
import { Comment } from "../../../entities/comment/model/types"
import { Textarea, Button } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { useDialog } from "../../post/model/dialogStore"
import { useCommentMutations, useComments } from "../model/commentStore"

export const CommentUpdateDialog = () => {
  const { showCommentUpdateDialog, setShowCommentUpdateDialog } = useDialog()
  const { selectedComment } = useComments()
  const [updatingComment, setUpdatingComment] = useState<Comment|null>(selectedComment)
  const { updateComment } = useCommentMutations(selectedComment?.postId ?? 0)

  const handleCommentUpdate = () => {
    if (!updatingComment) return
    updateComment.mutate(updatingComment)
    setShowCommentUpdateDialog(false)
  }

  const handleCommentBodyUpdate = (e: ChangeEvent<HTMLTextAreaElement>) => {
    if (!updatingComment) return
    setUpdatingComment({ ...updatingComment, body: e.target.value })
  }

  useEffect(() => {
    if (showCommentUpdateDialog && selectedComment) {
      setUpdatingComment({ ...selectedComment })
    }
  }, [showCommentUpdateDialog, selectedComment])

  return (
    <CustomDialog open={showCommentUpdateDialog} onOpenChange={setShowCommentUpdateDialog} title={"댓글 수정"}>
      <>
        <Textarea
          placeholder="댓글 내용"
          value={updatingComment?.body || ""}
          onChange={handleCommentBodyUpdate}
        />
        <Button onClick={handleCommentUpdate}>댓글 업데이트</Button>
      </>
    </CustomDialog>
  )
}
