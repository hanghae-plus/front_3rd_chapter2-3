import { useMutationPostCreate } from "@features/post/api/useMutationPostCreate"
import { usePostForm } from "@features/post/hooks/usePostForm"
import { useModal } from "@features/modal/hooks"
import { PostForm } from "@entities/post/model"
import { Button } from "@shared/ui/button"
import { useCallback } from "react"
import { 
  Dialog, 
  DialogContent,
  DialogHeader,
  DialogTitle 
} from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea/Textarea"
import { Input } from "@shared/ui/input"


export const CreatePostModal = () => {
  const initialPostForm = {
    body: "",
    title: "",
    userId: 1,
  }

  const { createPost } = useMutationPostCreate()
  const { openCreatePost, closeModal } = useModal()
  const { postForm, updatePostForm, resetPostForm } = usePostForm(
    openCreatePost,
    initialPostForm
  )

  const submitNewPostForm = useCallback(() => {
    createPost(postForm as PostForm)
    resetPostForm()
    closeModal("createPost")
  }, [postForm])

  return (
    <Dialog
      open={openCreatePost}
      onOpenChange={() => closeModal("createPost")}
    >
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
