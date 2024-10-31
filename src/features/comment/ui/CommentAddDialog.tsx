import { ChangeEvent } from "react"
import { NewComment } from "../../../entities/comment/model/types"
import { Button, Textarea } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"

export const CommentAddDialog: React.FC<{
  showCommentAddDialog: boolean
  setShowCommentAddDialog: (value: boolean) => void
  newComment: NewComment
  setNewComment: (newComment: NewComment) => void
  addComment: (newComment: NewComment) => void
}> = ({ showCommentAddDialog, setShowCommentAddDialog, newComment, setNewComment, addComment }) => {
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
