import { useAtom } from "jotai"
import { Button } from "../../../shared/ui/button/Button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/Dialog"
import { Input, Textarea } from "../../../shared/ui/input/Text"
import { usePostHandler } from "../model/postHandler"
import { selectedPostAtom, showEditDialogAtom } from "../model/postAtoms"
import { Post } from "../../../entities/types/postType"

export const PostUpdateDialog = () => {
  const [showEditDialog, setShowEditDialog] = useAtom(showEditDialogAtom)
  const [selectedPost, setSelectedPost] = useAtom(selectedPostAtom)
  const { handleUpdatePost } = usePostHandler()

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
            onChange={(e) => setSelectedPost((prev) => ({ ...(prev as Post), title: e.target.value }))}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPost?.body || ""}
            onChange={(e) => setSelectedPost((prev) => ({ ...(prev as Post), body: e.target.value }))}
          />
          <Button onClick={() => handleUpdatePost(selectedPost)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
