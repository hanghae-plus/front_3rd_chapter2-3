import { useState } from "react"
import { useDialogStore } from "../../../shared/model/useDialogStore"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { NewPost_i } from "../../../entities/post/model/types"
import { usePostStore } from "../model/usePostStore"
import { useAddPostMutation } from "../api/useAddPostMutation"

export const PostAddDialog = () => {
  const [newPost, setNewPost] = useState<NewPost_i>({ title: "", body: "", userId: 1 })

  const dialogStore = useDialogStore()
  const addPostMutation = useAddPostMutation()
  const addPost = usePostStore((state) => state.addPost)

  // 게시물 추가
  const handleAddPost = async () => {
    addPostMutation.mutate(newPost, {
      onSuccess: (data) => {
        dialogStore.closeDialog()
        addPost(data)
        setNewPost({ title: "", body: "", userId: 1 })
      },
    })
  }

  return (
    <Dialog open={true} onOpenChange={dialogStore.onOpenChange}>
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
