import { ChangeEvent, useState } from "react"
import { NewComment } from "../../../entities/comment/model/types"
import { Button, Textarea } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { useDialog } from "../../post/model/dialogStore"

const initialNewComment: NewComment = { body: "", postId: null, userId: 1, likes: 0 }
export const CommentAddDialog: React.FC<{
  postId: number
  addComment: (newComment: NewComment) => void
}> = ({ postId, addComment }) => {
  
  const {
    showCommentAddDialog,
    setShowCommentAddDialog,
  } = useDialog()

  const [newComment, setNewComment] = useState<NewComment>(initialNewComment)
  
  const handleAddComment = () => {
    addComment({ ...newComment, postId })
    setShowCommentAddDialog(false)
    setNewComment({ ...initialNewComment, postId })
  }

  return (
    <CustomDialog open={showCommentAddDialog} onOpenChange={setShowCommentAddDialog} title={"새 댓글 추가"}>
      <>
        <Textarea
          placeholder="댓글 내용"
          value={newComment.body}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewComment({ ...newComment, body: e.target.value })}
        />
        <Button onClick={handleAddComment}>댓글 추가</Button>
      </>
    </CustomDialog>
  )
}
