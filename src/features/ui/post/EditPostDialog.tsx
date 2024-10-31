import { useAtom } from "jotai"
import { Button } from "../../../shared/ui/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Input } from "../../../shared/ui/Input"
import { Textarea } from "../../../shared/ui/Textarea"
import { useUpdatePost } from "../../api/hooks/post/useManagePosts"
import { selectedPostAtom, showEditDialogAtom } from "../../../app/atom"

const EditPostDialog = () => {
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const { mutate: updatePost } = useUpdatePost()

  const handleUpdatePost = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    updatePost()
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
          <Button onClick={handleUpdatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostDialog
