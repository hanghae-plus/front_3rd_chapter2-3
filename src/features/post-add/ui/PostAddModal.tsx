import { useState } from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { useMutationPostAdd } from "../../post/api/useMutationPostAdd"
import { usePostAddModalStore } from "../../post/model/postAddModalStore"

export const PostAddModal = () => {
  const [newPost, setNewPost] = useState({ title: "", body: "", userId: 1 })
  const { showPostAddModal, setShowPostAddModal } = usePostAddModalStore()

  const { mutate: addPostMutate } = useMutationPostAdd()

  const handleAddPost = async () => {
    addPostMutate(newPost)

    setShowPostAddModal(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }

  return (
    <Dialog open={showPostAddModal} onOpenChange={setShowPostAddModal}>
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
