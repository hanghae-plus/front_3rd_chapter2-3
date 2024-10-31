import { useState } from "react"
import { Button } from "../../../shared/ui/button"
import { Input } from "../../../shared/ui/input"
import { Textarea } from "../../../shared/ui/textarea"
import DialogContainer from "../../../widgets/dialog/ui/DialogContainer"

import { Plus } from "lucide-react"
import useMutationAddPost from "../api/useMutationAddPost"

const initalState = {
  title: "",
  body: "",
  userId: 1,
}

export const AddPostDialog = () => {
  const { mutate } = useMutationAddPost()

  const [showAddDialog, setShowAddDialog] = useState(false)
  const [post, setPost] = useState(initalState)

  const initPost = () => {
    setPost(initalState)
  }

  const dialogToggle = () => {
    setShowAddDialog((prev) => !prev)
  }

  const addPost = async () => {
    mutate(post)

    initPost()
    dialogToggle()
  }

  const DialogContent = () => {
    return (
      <div className="space-y-4">
        <Input placeholder="제목" value={post.title} onChange={(e) => setPost({ ...post, title: e.target.value })} />
        <Textarea
          rows={30}
          placeholder="내용"
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
        />
        <Input
          type="number"
          placeholder="사용자 ID"
          value={post.userId}
          onChange={(e) => setPost({ ...post, userId: Number(e.target.value) })}
        />
        <Button onClick={addPost} disabled={!post.title || !post.body}>
          게시물 추가
        </Button>
      </div>
    )
  }

  return (
    <>
      <Button onClick={() => setShowAddDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>
      <DialogContainer
        isOpen={showAddDialog}
        setOpen={(value: boolean) => setShowAddDialog(value)}
        title="새 게시물 추가"
      >
        <DialogContent />
      </DialogContainer>
    </>
  )
}
