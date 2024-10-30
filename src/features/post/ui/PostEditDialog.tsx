import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { usePostDialog } from "../model/usePostDialog.ts"
import { usePosts } from "../model/usePosts.ts"

export default function PostEditDialog() {
  const { updatePost } = usePosts()
  const { selectedPost, setSelectedPost, showEditDialog, setShowEditDialog } = usePostDialog()

  const submitUpdatePostForm = async () => {
    if (selectedPost) {
      updatePost(selectedPost)
      setShowEditDialog(false)
    }
  }

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
