import React from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../shared/ui"
import { addPost } from "../../entities/Post/api"
import { PostType } from "../../entities/Post/model/types"

interface AddPostDialogProps {
  showAddDialog: boolean
  setShowAddDialog: (show: boolean) => void
  newPost: PostType
  setNewPost: (newPost: PostType) => void
}

const AddPostDialog: React.FC<AddPostDialogProps> = ({ showAddDialog, setShowAddDialog, newPost, setNewPost }) => {
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
          <Button onClick={() => addPost(newPost)}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddPostDialog
