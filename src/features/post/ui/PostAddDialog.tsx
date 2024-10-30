import { ChangeEvent } from "react"
import { NewPost } from "../../../entities/post/model/types"
import { Button, Input, Textarea } from "../../../shared/ui"
import { CustomDialog } from "../../../widgets/ui/CustomDialog"

export const PostAddDialog: React.FC<{
  showAddDialog: boolean
  setShowAddDialog: (value: boolean) => void
  newPost: NewPost
  setNewPost: (newPost: NewPost) => void
  addPost: (newPost: NewPost) => void
}> = ({ showAddDialog, setShowAddDialog, newPost, setNewPost, addPost }) => {
  return (
    <CustomDialog open={showAddDialog} onOpenChange={setShowAddDialog} title={"새 게시물 추가"}>
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
