import { ChangeEvent, useState } from "react"
import { NewPost } from "../../../entities/post/model/types"
import { Button, Input, Textarea } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { useDialog } from "../model/dialogStore"

const initialNewPost: NewPost = { title: "", body: "", userId: 1, tags: [], reactions: { likes: 0, dislikes: 0 } }

export const PostAddDialog: React.FC<{
  addPost: (newPost: NewPost) => void
}> = ({ addPost }) => {
  
  const {
    showPostAddDialog,
    setShowPostAddDialog,
  } = useDialog()

  const [newPost, setNewPost] = useState<NewPost>(initialNewPost)
  
  const handlePostAdd = () => {
    addPost(newPost)
    setShowPostAddDialog(false)
    setNewPost({ ...initialNewPost })
  }

  return (
    <CustomDialog open={showPostAddDialog} onOpenChange={setShowPostAddDialog} title={"새 게시물 추가"}>
      <>
        <Input
          placeholder="제목"
          value={newPost.title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <Textarea
          rows={30}
          placeholder="내용"
          value={newPost.body}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setNewPost({ ...newPost, body: e.target.value })}
        />
        <Input
          type="number"
          placeholder="사용자 ID"
          value={newPost.userId}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
        />
        <Button onClick={handlePostAdd}>게시물 추가</Button>
      </>
    </CustomDialog>
  )
}
