import { PostWithUser } from "../../../entities/post"
import { Button } from "../../../shared/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog"
import { Input } from "../../../shared/ui/input"
import { Textarea } from "../../../shared/ui/textarea"
import { updatePost } from "../api/editPostApi"

interface EditPostDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  selectedPost: PostWithUser
  setSelectedPost: (post: PostWithUser) => void
}

const EditPostDialog = ({ isOpen, onOpenChange, selectedPost, setSelectedPost }: EditPostDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EditPostDialog
