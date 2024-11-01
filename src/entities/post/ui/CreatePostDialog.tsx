import { usePostCreate } from "@entities/post/hooks/usePostCreate"
import { usePostForm } from "@entities/post/hooks/usePostForm"
import { DEFAULT_POST_FORM } from "@entities/post/constants"
import { PostForm } from "@entities/post/types"
import { Button } from "@shared/ui/button"
import { useCallback } from "react"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Textarea,
  Dialog,
  Input,
} from "@shared/ui"
import { useCreatePostDialog } from "@features/dialog/hooks/useCreatePostDialog"

type PropsType = { userId: number }

export const CreatePostDialog: React.FC<PropsType> = ({ userId }) => {
  const { createPost } = usePostCreate()
  const { opened, closeDialog } = useCreatePostDialog()
  const { postForm, updatePostForm, resetPostForm } = usePostForm(opened, {
    ...DEFAULT_POST_FORM,
    userId,
  })

  const submitNewPostForm = useCallback(() => {
    createPost({ ...(postForm as PostForm) })
    resetPostForm()
    closeDialog()
  }, [postForm])

  return (
    <Dialog open={opened} onOpenChange={() => closeDialog()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={postForm.title}
            onChange={(e) => updatePostForm({ title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={postForm.body}
            onChange={(e) =>
              updatePostForm({ body: (e.target as HTMLTextAreaElement).value })
            }
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={postForm.userId}
            onChange={(e) => updatePostForm({ userId: Number(e.target.value) })}
          />
          <Button onClick={submitNewPostForm}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
