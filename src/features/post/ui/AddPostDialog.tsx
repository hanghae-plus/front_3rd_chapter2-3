import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import React from "react"
import usePost from "../../../entities/Post/model/usePost"
import { usePostDialog } from "../../../entities/Post/model/usePostDialog"
import { DialogHeader, Input, Textarea, Button } from "../../../shared/ui"

const AddPostDialog: React.FC = () => {
  const { newPost, setNewPost, addPost } = usePost()

  const { showAddDialog, setShowAddDialog } = usePostDialog()

  const handleAddPost = () => {
    addPost(newPost)
    setShowAddDialog(false)
    setNewPost({ title: "", body: "", userId: 1 })
  }

  const handleNewPostChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value })
  }

  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input placeholder="제목" name="title" value={newPost.title} onChange={handleNewPostChange} />
          <Textarea rows={30} placeholder="내용" name="body" value={newPost.body} onChange={handleNewPostChange} />
          <Input
            type="number"
            placeholder="사용자 ID"
            name="userId"
            value={newPost.userId}
            onChange={handleNewPostChange}
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddPostDialog
