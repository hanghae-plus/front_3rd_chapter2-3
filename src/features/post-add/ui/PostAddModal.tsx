import React, { Dispatch, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/ui"
import { Input } from "../../../shared/ui/input/ui/Input.tsx"
import { Textarea } from "../../../shared/ui/textarea/ui/Textarea.tsx"
import { Button } from "../../../shared/ui/button/ui/Button.tsx"
import { useAddPostMutation } from "../api/useMutateAddPost.ts"

interface Props {
  showAddPostDialog: boolean
  setShowAddPostDialog: Dispatch<React.SetStateAction<boolean>>
}

const PostAddModal = ({ showAddPostDialog, setShowAddPostDialog }: Props) => {
  const [newPost, setNewPost] = useState({
    title: "",
    body: "",
    userId: 1,
    tags: [],
    reactions: { likes: 0, dislikes: 0 },
  })
  const { mutate } = useAddPostMutation({ setShowAddPostDialog })

  const handleAddPost = () => {
    mutate(newPost)
    setNewPost({ title: "", body: "", userId: 1, tags: [], reactions: { likes: 0, dislikes: 0 } })
  }

  return (
    <Dialog open={showAddPostDialog} onOpenChange={setShowAddPostDialog}>
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

export default PostAddModal
