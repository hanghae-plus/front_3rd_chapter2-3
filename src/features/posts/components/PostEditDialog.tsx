import { SelectedPost } from "../../../entities/posts/model/Post"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Textarea } from "../../../shared/ui"

interface PostEditDialogProps {
  showEditDialog: boolean
  setShowEditDialog: (open: boolean) => void
  selectedPost: SelectedPost | null
  setSelectedPost: React.Dispatch<React.SetStateAction<SelectedPost | null>>
  updatePost: () => void
}

const PostEditDialog = ({
  showEditDialog,
  setShowEditDialog,
  selectedPost,
  setSelectedPost,
  updatePost,
}: PostEditDialogProps) => {
  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPost?.title || ""}
            onChange={(e) =>
              setSelectedPost((prev) =>
                prev
                  ? { ...prev, title: e.target.value }
                  : {
                      id: 0,
                      title: e.target.value,
                      body: "",
                      tags: [],
                      reactions: { likes: 0, dislikes: 0 },
                      userId: 0,
                      views: 0,
                      author: { id: 0, image: "", username: "" },
                    },
              )
            }
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) =>
              setSelectedPost((prev) =>
                prev
                  ? { ...prev, body: e.target.value }
                  : {
                      id: 0,
                      title: "",
                      body: e.target.value,
                      tags: [],
                      reactions: { likes: 0, dislikes: 0 },
                      userId: 0,
                      views: 0,
                      author: { id: 0, image: "", username: "" },
                    },
              )
            }
          />
          <Button onClick={updatePost}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PostEditDialog
