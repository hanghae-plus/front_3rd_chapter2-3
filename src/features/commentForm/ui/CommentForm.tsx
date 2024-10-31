import { Comment } from "../../../entities/comment"
import { Button, Textarea } from "../../../shared/ui"
import { useCommentForm } from "../model/useCommentForm"

interface CommentFormProps {
  postId: number
  comment?: Comment
  onSubmit: () => void
  onCancel: () => void
}

export const CommentForm = ({ postId, comment, onSubmit, onCancel }: CommentFormProps) => {
  const { formData, setFormData, handleSubmit } = useCommentForm(comment)

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault()
        await handleSubmit()
        onSubmit()
      }}
    >
      <Textarea
        placeholder="댓글 내용"
        value={formData.body}
        onChange={(e) =>
          setFormData((prev) => ({
            ...prev,
            body: e.target.value,
            postId,
          }))
        }
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">{comment ? "수정" : "추가"}</Button>
      </div>
    </form>
  )
}
