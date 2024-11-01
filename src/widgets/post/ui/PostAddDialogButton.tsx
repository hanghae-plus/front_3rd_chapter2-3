import { Plus } from "lucide-react"
import { useState } from "react"
import { NewPost } from "../../../entities/post/model/types"
import { PostAddButton } from "../../../features/post"
import {
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  Input,
  Textarea,
} from "../../../shared/ui"

const DEFAULT_NEW_POST = {
  title: "",
  body: "",
  userId: 1,
}

export const PostAddDialogButton = () => {
  const [showAddDialog, setShowAddDialog] = useState(false)

  const [newPost, setNewPost] = useState<NewPost>(DEFAULT_NEW_POST)

  return (
    <>
      <Button onClick={() => setShowAddDialog(true)}>
        <Plus className="w-4 h-4 mr-2" />
        게시물 추가
      </Button>

      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>새 게시물 추가</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Input
              placeholder="제목"
              value={newPost.title}
              onChange={(e) =>
                setNewPost({ ...newPost, title: e.target.value })
              }
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
              onChange={(e) =>
                setNewPost({ ...newPost, userId: Number(e.target.value) })
              }
            />

            <PostAddButton
              newPost={newPost}
              onAddSuccess={() => {
                setShowAddDialog(false)
                setNewPost(DEFAULT_NEW_POST)
              }}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
