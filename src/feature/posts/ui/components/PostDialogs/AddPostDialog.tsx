import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../shared/ui/dialog"

import { useAddPostMutation } from "../../../lib/hooks/usePostsQuery"
import { Button, Input, Textarea } from "../../../../../shared"
import { ERROR_MESSAGES } from "../../../config/posts.config"

interface AddPostDialogProps {
  open: boolean
  limit: number
  skip: number
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export const AddPostDialog = ({
  open,
  limit,
  skip,
  onOpenChange,
  onSuccess,
}: AddPostDialogProps) => {
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    userId: 1,
  })

  const addPostMutation = useAddPostMutation(limit, skip)
    
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      await addPostMutation.mutateAsync({
        title: formData.title,
        body: formData.body,
        userId: 1,
      })
      
      setFormData({
        title: "",
        body: "",
        userId: 1,
      })
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error(`${ERROR_MESSAGES.ADD_ERROR}`, error)
    }
  }

  // ESC나 외부 클릭으로 닫힐 때 폼 초기화
  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setFormData({
        title: "",
        body: "",
        userId: 1,
      })
    }
    onOpenChange(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
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
          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => handleOpenChange(false)}
            >
              취소
            </Button>
            <Button 
              type="submit" 
              disabled={addPostMutation.isPending}
            >
              {addPostMutation.isPending ? "추가 중..." : "게시물 추가"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
