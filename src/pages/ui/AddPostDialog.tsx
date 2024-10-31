// 게시물 추가 대화상자

import { Button } from "../../shared/ui/Button"
import { Input } from "../../shared/ui/Input"
import { Textarea } from "../../shared/ui/Textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../shared/ui/Dialog"
import { usePost } from "../../features/post/model/usePost"
import useMutationAddPost from "../../features/post/api/useMutationAddPost"

const AddPostDialog = () => {
  const { newPost, setNewPost, showAddDialog, setShowAddDialog } = usePost()
  const { mutate: mutateAddPost } = useMutationAddPost()

  // 게시물 추가
  const handleAddPost = () => {
    mutateAddPost()
  }

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
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddPostDialog
