import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../shared/ui/dialog"

import { useAddPostMutation } from "../../../lib/hooks/usePostsQuery"
import { Button, Input, Textarea } from "../../../../../shared"

interface AddPostDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export const AddPostDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: AddPostDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  })

  const { mutate: addPost, isPending } = useAddPostMutation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    addPost(formData, {
      onSuccess: () => {
        onOpenChange(false)
        setFormData({ title: "", body: "", userId: 1 })
        onSuccess?.()
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
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
          <Button type="submit" disabled={isPending}>
            {isPending ? "추가 중..." : "게시물 추가"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
