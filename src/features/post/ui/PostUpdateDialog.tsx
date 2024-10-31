import { ChangeEvent } from "react"
import { Input, Textarea, Button } from "../../../shared/ui"
import { CustomDialog } from "../../../shared/ui/CustomDialog"
import { Post } from "../../../entities/post/model/types"

export const PostUpdateDialog: React.FC<{
  showPostUpdateDialog: boolean
  setShowPostUpdateDialog: (value: boolean) => void
  selectedPost: Post
  setSelectedPost: (post: Post) => void
  updatePost: (post: Post) => void
}> = ({ showPostUpdateDialog, setShowPostUpdateDialog, selectedPost, setSelectedPost, updatePost }) => {
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
