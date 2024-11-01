import { NewComment } from "../../../entities/comment/model/types"
import { Button } from "../../../shared/ui"
import { useAddCommentMutation } from "../api/useAddCommentMutation"

type Props = {
  newComment: NewComment
  onAddSuccess: VoidFunction
}

export const CommentAddButton = ({
  newComment,
  onAddSuccess: onSuccess,
}: Props) => {
  const { mutate: addCommentMutate } = useAddCommentMutation()

  const addComment = () => {
    addCommentMutate(newComment, {
      onSuccess,
    })
  }

  return <Button onClick={addComment}>댓글 추가</Button>
}
