import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"
import { Post } from "../../../entities/posts/model/types"
import { updatePostMutation } from "../api"

interface PostUpdateDialogProps {
  isShow: boolean
  handleDialog: () => void
  selectedPost: Post
  setSelectedPost: (post: Post) => void
}

export const PostUpdateDialog = ({ isShow, handleDialog, selectedPost, setSelectedPost }: PostUpdateDialogProps) => {
  const { mutate: updatePostMutate } = updatePostMutation()

  const updatePost = () => {
    updatePostMutate(selectedPost)
    handleDialog()
  }

  return (
    <Dialog open={isShow} onOpenChange={handleDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) =>
              selectedPost &&
              setSelectedPost({
                ...selectedPost,
                title: e.target.value,
              })
            }
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) =>
              selectedPost &&
              setSelectedPost({
                ...selectedPost,
                body: e.target.value,
              })
            }
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
