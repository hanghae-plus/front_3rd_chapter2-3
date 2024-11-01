import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "@/shared/ui"
import { useModalStore } from "@/features/modal"
import { usePostStore, usePutPost } from "@/features/post"

export const PostEditModal = () => {
  const { post, updatePost } = usePostStore()
  const { showEditPostModal, closeEditPostModal } = useModalStore()
  const { mutate } = usePutPost(post?.id ?? -1, { title: post?.title ?? "", body: post?.body ?? "" })

  const handleClickUpdateButton = () => {
    mutate()
    closeEditPostModal()
  }

  return (
    <Dialog open={showEditPostModal} onOpenChange={closeEditPostModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={post?.title || ""}
            onChange={(e) => updatePost({ ...post!, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={post?.body || ""}
            onChange={(e) => updatePost({ ...post!, body: e.target.value })}
          />
          <Button onClick={handleClickUpdateButton}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostEditModal
