import { Dialog, DialogContent, DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "../../../shared/ui/dialog/Dialog"
import { Input, Textarea } from "../../../shared/ui/input/Text"
import { Button } from "../../../shared/ui/button/Button"
import { usePostHandler } from "../model/postHandler"
import { newPostAtom, selectedPostAtom, showAddDialogAtom, showEditDialogAtom } from "../model/postAtoms"
import { useAtom } from "jotai"

// 게시물 추가 대화상자
export const AddPostDialog = () => {
  const [showAddDialog, setShowAddDialog] = useAtom(showAddDialogAtom)
  const [newPost, setNewPost] = useAtom(newPostAtom)

  const { handleAddPost } = usePostHandler()
  return (
    <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>새 게시물 추가</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
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
            onChange={(e) => setNewPost({ ...newPost, userId: Number(e.target.value) })}
          />
          <Button onClick={handleAddPost}>게시물 추가</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

// 게시물 수정 대화상자
export const EditPostDialog = () => {
  const { handleUpdatePost } = usePostHandler()
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)

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
            onChange={(e) => setSelectedPost((prev) => ({ ...prev, title: e.target.value }))}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost((prev) => ({ ...prev, body: e.target.value }))}
          />
          <Button onClick={() => handleUpdatePost(selectedPost)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
