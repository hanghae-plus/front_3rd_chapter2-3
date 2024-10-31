// entities/post/ui/PostForm.tsx
import { useState } from "react"
import { PostFormData } from "../../../model/types"
import { Button, Input, Textarea } from "../../../../../shared"

interface PostFormProps {
  onSubmit: (data: PostFormData) => Promise<void>
  isSubmitting: boolean
  onCancel: () => void
  initialValues?: Partial<PostFormData>
}

export const PostForm = ({ 
  onSubmit, 
  isSubmitting,
  onCancel,
  initialValues = {
    title: "",
    body: "",
    userId: 1
  },
}: PostFormProps) => {
  const [formData, setFormData] = useState<PostFormData>({
    title: initialValues.title || "",
    body: initialValues.body || "",
    userId: initialValues.userId || 1
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="title" className="text-sm font-medium">
          제목
        </label>
        <Input
          id="title"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
          placeholder="게시물 제목을 입력하세요"
          required
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="body" className="text-sm font-medium">
          내용
        </label>
        <Textarea
          id="body"
          value={formData.body}
          onChange={(e) =>
            setFormData((prev) => ({
              ...prev,
              body: e.target.value,
            }))
          }
          placeholder="게시물 내용을 입력하세요"
          rows={8}
          required
        />
      </div>
      <div className="flex justify-end space-x-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          취소
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "추가 중..." : "게시물 추가"}
        </Button>
      </div>
    </form>
  )
}