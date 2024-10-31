import { useDialogStore } from "../../../shared/model/useDialogStore"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { usePostStore } from "../model/usePostStore"
import { useEditPostMutation } from "../api/useEditPostMutation"
import { Post_i } from "../../../entities/post/model/types"

export const PostEditDialog = () => {
  const dialogStore = useDialogStore()
  const editPostMutation = useEditPostMutation()
  const [selectedPost, setSelectedPost, updatePost] = usePostStore((state) => [
    state.selectedPost,
    state.setSelectedPost,
    state.updatePost,
  ])

  const handleInputChange = (key: keyof Post_i, value: string) => {
    if (!selectedPost) return

    setSelectedPost({ ...selectedPost, [key]: value })
  }

  const handleEditPost = async () => {
    if (!selectedPost) return

    editPostMutation.mutate(selectedPost, {
      onSuccess: (data) => {
        updatePost(data)
        dialogStore.closeDialog()
      },
      onError: (error) => {
        console.error("게시물 추가 오류:", error)
      },
    })
  }

  return (
    <Dialog open={true} onOpenChange={dialogStore.onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => handleInputChange("title", e.target.value)}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => handleInputChange("body", e.target.value)}
          />
          <Button onClick={handleEditPost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
