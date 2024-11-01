import { Edit2 } from "lucide-react"
import { useState } from "react"
import { Post } from "../../../entities/post/model/types"
import { PostUpdateButton } from "../../../features/post"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "../../../shared/ui"

type Props = {
  post: Post
}

export const PostEditDialogButton = ({ post }: Props) => {
  const [showEditDialog, setShowEditDialog] = useState(false)
  const [selectedPost, setSelectedPost] = useState<Post>(post)

  const handleOpenDialog = () => setShowEditDialog(true)

  const handleCloseDialog = () => {
    setShowEditDialog(false)
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={handleOpenDialog}>
        <Edit2 className="w-4 h-4" />
      </Button>

      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>게시물 수정</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={selectedPost?.title || ""}
              onChange={(e) => {
                if (selectedPost) {
                  setSelectedPost({ ...selectedPost, title: e.target.value })
                }
              }}
            />
            <Textarea
              rows={15}
              placeholder="내용"
              value={selectedPost?.body || ""}
              onChange={(e) => {
                if (selectedPost) {
                  setSelectedPost({ ...selectedPost, body: e.target.value })
                }
              }}
            />

            <PostUpdateButton
              selectedPost={selectedPost}
              onUpdateSuccess={handleCloseDialog}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
