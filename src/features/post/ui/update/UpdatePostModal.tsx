import { usePostForm } from "@features/post/hooks/usePostForm"
import { selectedPostsAtom } from "@features/post/model"
import { useModal } from "@features/modal/hooks"
import { Post } from "@entities/post/model"
import { useAtomValue } from "jotai"
import { useCallback } from "react"
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  Dialog,
} from "@shared/ui/dialog"
import { Textarea } from "@shared/ui/textarea"
import { Input } from "@shared/ui/input"
import { UpdatePostButton } from "./UpdatePostButton"
import { useMutationPostUpdate } from "@features/post/api/useMutationPostUpdate"

export const UpdatePostModal = () => {
  const selectedPost = useAtomValue(selectedPostsAtom)
  const { openEditPost, closeModal } = useModal()
  const { updatePost } = useMutationPostUpdate()

  const { postForm, updatePostForm, resetPostForm } = usePostForm(
    openEditPost,
    { ...selectedPost },
  )

  const submitUpdatePostForm = useCallback(async () => {
    const isContentChanged = 
      postForm.title !== selectedPost.title || 
      postForm.body !== selectedPost.body

    if (isContentChanged) {
      updatePost({ ...(postForm as Post) })
    }

    resetPostForm()
    closeModal("editPost")
  }, [postForm.title, postForm.body, selectedPost])

  return (
    <Dialog open={openEditPost} onOpenChange={() => closeModal("editPost")}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={postForm.title}
            onChange={(e) => updatePostForm({ title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={postForm.body}
            onChange={(e) =>
              updatePostForm({ body: (e.target as HTMLTextAreaElement).value })
            }
          />
          <UpdatePostButton onSubmit={submitUpdatePostForm} />
        </div>
      </DialogContent>
    </Dialog>
  )
}