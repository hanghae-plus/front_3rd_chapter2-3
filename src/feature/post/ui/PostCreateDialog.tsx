import { useAtom } from "jotai"
import { Button } from "../../../shared/ui/button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/Dialog"
import { Input, Textarea } from "../../../shared/ui/input/Text"
import { usePostHandler } from "../model/postHandler"
import { newPostAtom, showAddDialogAtom } from "../model/postAtoms"

export const PostCreateDialog = () => {
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)

  const { handleAddPost } = usePostHandler()

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
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
          />
          <Input
            type="number"
            placeholder="사용자 ID"
            value={newPost.userId}
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />

          <Button onClick={() => handleAddPost()}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
