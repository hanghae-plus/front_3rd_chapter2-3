import { Comment } from "../../../entities/comment/model/types"
import { Button } from "../../../shared/ui"
import { useUpdateCommentMutation } from "../api/useUpdateCommentMutation"

type Props = {
  selectedComment: Comment | null
  onUpdateSuccess: VoidFunction
}

export const CommentUpdateButton = ({
  selectedComment,
  onUpdateSuccess: onSuccess,
}: Props) => {
  const { mutate: updateCommentMutate } = useUpdateCommentMutation()

  const updateComment = (selectedComment: Comment | null) => {
    if (!selectedComment) return

    updateCommentMutate(selectedComment, {
      onSuccess,
    })
  }

  return (
    <Button onClick={() => updateComment(selectedComment)}>
      댓글 업데이트
    </Button>
  )
}
