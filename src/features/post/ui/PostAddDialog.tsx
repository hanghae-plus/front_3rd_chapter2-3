import { ChangeEvent } from "react"
import { NewPost } from "../../../entities/post/model/types"
import { Button, Input, Textarea } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { useDialog } from "../model/dialogStore"

export const PostAddDialog: React.FC<{
  newPost: NewPost
  setNewPost: (newPost: NewPost) => void
  addPost: (newPost: NewPost) => void
}> = ({ newPost, setNewPost, addPost }) => {
  
  const {
    showPostAddDialog,
    setShowPostAddDialog,
  } = useDialog()
  
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
        <Button onClick={() => addPost(newPost)}>게시물 추가</Button>
      </>
    </CustomDialog>
  )
}
