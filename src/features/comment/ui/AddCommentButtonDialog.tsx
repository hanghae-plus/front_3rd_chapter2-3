import { useState } from "react"
import { Button } from "../../../shared/ui/button"
import { Textarea } from "../../../shared/ui/textarea"
import DialogContainer from "../../../widgets/dialog/ui/DialogContainer"
import { Plus } from "lucide-react"
import { PostType } from "../../../entities/post/api/types"
import useCommentStore from "../../../entities/comment/model/useCommentStore"

const initalState = {
  body: "",
  userId: 1,
}

interface Props {
  postId: PostType["id"]
}

const AddCommentButtonDialog: React.FC<Props> = ({ postId }) => {
  const { fetchAddStore } = useCommentStore()

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [comment, setComment] = useState(initalState)

  const initPost = () => {
    setComment(initalState)
  }

  const dialogToggle = () => {
    setShowAddDialog((prev) => !prev)
  }

  const addComment = async () => {
    const newComment = {
      ...comment,
      postId,
    }
    await fetchAddStore(newComment)

    initPost()
    dialogToggle()
  }

  const DialogContent = () => {
    return (
      <div className="space-y-4">
        <Textarea
          placeholder="댓글 내용"
          value={comment.body}
          onChange={(e) => setComment({ ...comment, body: e.target.value })}
        />
        <Button onClick={addComment} disabled={!comment.body}>
          댓글 추가
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button size="sm" onClick={() => setShowAddDialog(true)}>
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
      <DialogContainer
        isOpen={showAddDialog}
        setOpen={(value: boolean) => setShowAddDialog(value)}
        title="새 댓글 추가"
      >
        <DialogContent />
      </DialogContainer>
    </>
  )
}

export default AddCommentButtonDialog
