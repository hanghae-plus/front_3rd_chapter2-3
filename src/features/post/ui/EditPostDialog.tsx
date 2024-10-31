import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import usePost from "../../../entities/Post/model/usePost"
import { usePostDialog } from "../../../entities/Post/model/usePostDialog"
import { DialogHeader, Input, Textarea, Button } from "../../../shared/ui"

export const EditPostDialog: React.FC = () => {
  const { showEditDialog, setShowEditDialog } = usePostDialog()
  const { selectedPost, setSelectedPost, updatePost } = usePost()

  const handleSelectedPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!selectedPost) return
    setSelectedPost({ ...selectedPost, [e.target.name]: e.target.value })
  }

  const handleUpdatePost = () => {
    if (!selectedPost) return
    updatePost(selectedPost)
    setShowEditDialog(false)
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
            name="title"
            onChange={handleSelectedPostChange}
          />
          <Textarea
            rows={15}
            name="body"
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={handleSelectedPostChange}
          />
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
