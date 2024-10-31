import { ChangeEvent } from "react"
import { Input, Textarea, Button } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { Post } from "../../../entities/post/model/types"
import { useDialog } from "../model/dialogStore"

export const PostUpdateDialog: React.FC<{
  selectedPost: Post
  setSelectedPost: (post: Post) => void
  updatePost: (post: Post) => void
}> = ({ selectedPost, setSelectedPost, updatePost }) => {
  
  const {
    showPostUpdateDialog,
    setShowPostUpdateDialog,
  } = useDialog()
  
  return (
    <CustomDialog open={showPostUpdateDialog} onOpenChange={setShowPostUpdateDialog} title={"게시물 수정"}>
      <>
        <Input
          placeholder="제목"
          value={selectedPost?.title || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedPost({ ...selectedPost, title: e.target.value })}
        />
        <Textarea
          rows={15}
          placeholder="내용"
          value={selectedPost?.body || ""}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedPost({ ...selectedPost, body: e.target.value })}
        />
        <Button onClick={() => updatePost(selectedPost)}>게시물 업데이트</Button>
      </>
    </CustomDialog>
  )
}
