import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../shared/ui/dialog"
import { useUpdatePostMutation } from "../../../lib/hooks/usePostsQuery"
import type { Post } from "../../../model/types"
import { Button, Input, Textarea } from "../../../../../shared"

interface EditPostDialogProps {
  post: Post | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export const EditPostDialog = ({
  post,
  open,
  onOpenChange,
  onSuccess,
}: EditPostDialogProps) => {
  const [formData, setFormData] = useState<Partial<Post>>({})

  const { mutate: updatePost, isPending } = useUpdatePostMutation()

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        body: post.body,
        tags: post.tags,
      })
    }
  }, [post])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!post) return

    updatePost(
      { id: post.id, data: formData },
      {
        onSuccess: () => {
          onOpenChange(false)
          onSuccess?.()
        },
      },
    )
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              제목
            </label>
            <Input
              id="title"
              value={formData.title || ""}
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
              value={formData.body || ""}
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
          <Button type="submit" disabled={isPending}>
            {isPending ? "추가 중..." : "게시물 수정"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
