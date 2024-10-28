import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../shared/ui"
import { updatePost } from "../../entities/Post/api"
import { PostType } from "../../entities/Post/model/types"

interface EditPostDialogProps {
  showEditDialog: boolean
  setShowEditDialog: (show: boolean) => void
  selectedPost: PostType
  setSelectedPost: (selectedPost: PostType) => void
}

export const EditPostDialog: React.FC<EditPostDialogProps> = ({
  showEditDialog,
  setShowEditDialog,
  selectedPost,
  setSelectedPost,
}) => {
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
          <Button onClick={() => updatePost(selectedPost)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
