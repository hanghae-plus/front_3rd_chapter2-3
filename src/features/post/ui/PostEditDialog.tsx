import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { usePostDialog } from "../model/usePostDialog.ts"
import { useUpdatePostMutation } from "../api/mutations.ts"

export default function PostEditDialog() {
  const { selectedPost, setSelectedPost, showEditDialog, setShowEditDialog } = usePostDialog()
  const { mutate: updatePost } = useUpdatePostMutation()

  const submitUpdatePostForm = async () => {
    if (selectedPost) {
      updatePost(selectedPost)
    }
    setShowEditDialog(false)
  }

  if (!selectedPost) return

  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, title: e.target.value })}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost({ ...selectedPost, body: e.target.value })}
          />
          <Button onClick={submitUpdatePostForm}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
