import { Dialog, DialogHeader, DialogContent, DialogTitle, Textarea, Input, Button } from "../../../shared/ui";
import { usePostStore } from "../../Post/model/stores/usePostStore";
import { usePostService } from "../../Post/model/services/usePostService";

export const AddDialog = () => {
  const { showAddDialog, setShowAddDialog } = usePostStore()
  const { newPost, setNewPost } = usePostStore()
  const { addPost } = usePostService()

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
          />
          <Textarea
            rows={30}
            placeholder="내용"
            value={newPost.body}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={addPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}