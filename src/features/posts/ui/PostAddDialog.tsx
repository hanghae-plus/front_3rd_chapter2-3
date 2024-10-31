import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { PostPayload } from "../../../entities/posts/model/types"

interface PostAddDialogProps {
  isShow: boolean
  handleDialog: () => void
  newPost: PostPayload
  setNewPost: (post: PostPayload) => void
  addPost: (newPost: PostPayload) => void
}

export const PostAddDialog = ({ isShow, handleDialog, newPost, setNewPost, addPost }: PostAddDialogProps) => {
  return (
    <Dialog open={isShow} onOpenChange={handleDialog}>
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
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={() => addPost(newPost)}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
