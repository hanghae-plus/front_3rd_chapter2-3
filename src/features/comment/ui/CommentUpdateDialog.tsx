import { ChangeEvent, useEffect, useState } from "react"
import { Comment } from "../../../entities/comment/model/types"
import { Textarea, Button } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { useDialog } from "../../post/model/dialogStore"
import { useCommentMutations } from "../model/commentStore"

export const CommentUpdateDialog: React.FC<{
  selectedComment: Comment
}> = ({ selectedComment }) => {
  const { showCommentUpdateDialog, setShowCommentUpdateDialog } = useDialog()

  const [updatingComment, setUpdatingComment] = useState({ ...selectedComment })

  const { updateComment } = useCommentMutations(selectedComment.postId)

  const handleCommentUpdate = () => {
    updateComment.mutate(updatingComment)
    setShowCommentUpdateDialog(false)
  }

  useEffect(() => {
    if (showCommentUpdateDialog) {
      setUpdatingComment({ ...selectedComment })
    }
  }, [showCommentUpdateDialog, selectedComment])

  return (
    <CustomDialog open={showCommentUpdateDialog} onOpenChange={setShowCommentUpdateDialog} title={"댓글 수정"}>
      <>
        <Textarea
          placeholder="댓글 내용"
          value={updatingComment?.body || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUpdatingComment((prevComment) => ({ ...prevComment, body: e.target.value }))
          }
        />
        <Button onClick={handleCommentUpdate}>댓글 업데이트</Button>
      </>
    </CustomDialog>
  )
}
