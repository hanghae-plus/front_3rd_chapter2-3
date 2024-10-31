import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../../../../shared/ui/dialog"
import { useAddPostMutation } from "../../../lib/hooks/usePostsQuery"
import { ERROR_MESSAGES } from "../../../config/posts.config"
import { PostForm } from "../../../../../entities/post/ui/components/PostForm/PostForm"
import { PostFormData } from "../../../../../entities/post/model/types"

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
  const addPostMutation = useAddPostMutation(limit, skip)

  const handleSubmit = async (formData: PostFormData) => {
    try {
      await addPostMutation.mutateAsync(formData)
      onOpenChange(false)
      onSuccess?.()
    } catch (error) {
      console.error(`${ERROR_MESSAGES.ADD_ERROR}`, error)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <PostForm
          onSubmit={handleSubmit}
          onCancel={() => onOpenChange(false)}
          isSubmitting={addPostMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  )
}