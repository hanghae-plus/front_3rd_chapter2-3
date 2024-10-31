import { Post } from "../../../entities/post"
import { Button, Input, Textarea } from "../../../shared/ui"
import { usePostForm } from "../model/usePostForm"

interface PostFormProps {
  post?: Post | null
  onSubmit: () => void
  onCancel: () => void
}

export const PostForm = ({ post, onSubmit, onCancel }: PostFormProps) => {
  const { formData, setFormData, handleSubmit } = usePostForm(post)

  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault()
        await handleSubmit()
        onSubmit()
      }}
    >
      <Input
        placeholder="제목"
        value={formData.title}
        onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
      />
      <Textarea
        rows={15}
        placeholder="내용"
        value={formData.body}
        onChange={(e) => setFormData((prev) => ({ ...prev, body: e.target.value }))}
      />
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          취소
        </Button>
        <Button type="submit">{post ? "수정" : "추가"}</Button>
      </div>
    </form>
  )
}
