import { ChangeEvent } from "react"
import { NewComment } from "../../../entities/comment/model/types"
import { Button, Textarea } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { useDialog } from "../../post/model/dialogStore"

export const CommentAddDialog: React.FC<{
  newComment: NewComment
  setNewComment: (newComment: NewComment) => void
  addComment: (newComment: NewComment) => void
}> = ({ newComment, setNewComment, addComment }) => {
  
  const {
    showCommentAddDialog,
    setShowCommentAddDialog,
  } = useDialog()
  
  return (
    <CustomDialog open={showCommentAddDialog} onOpenChange={setShowCommentAddDialog} title={"새 댓글 추가"}>
      <>
        <Textarea
          placeholder="댓글 내용"
          value={newComment.body}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewComment({ ...newComment, body: e.target.value })}
        />
        <Button onClick={() => addComment(newComment)}>댓글 추가</Button>
      </>
    </CustomDialog>
  )
}
