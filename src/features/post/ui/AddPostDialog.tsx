import { useState } from "react"

import Button from "../../../shared/ui/Button"
import Dialog from "../../../shared/ui/Dialog"
import Input from "../../../shared/ui/Input"
import Textarea from "../../../shared/ui/TextArea"

import { Post } from "../../../entities/post/model/types"

interface AddPostDialogProps {
  showAddDialog: boolean
  setShowAddDialog: (show: boolean) => void
  addPost: (post: Partial<Post>) => void
}

const AddPostDialog = ({ showAddDialog, setShowAddDialog, addPost }: AddPostDialogProps) => {
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    userId: 1,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
    views: 0,
  })

  return (
    <Dialog.Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <Dialog.DialogContent>
        <Dialog.DialogHeader>
          <Dialog.DialogTitle>새 게시물 추가</Dialog.DialogTitle>
        </Dialog.DialogHeader>
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
      </Dialog.DialogContent>
    </Dialog.Dialog>
  )
}

export default AddPostDialog
