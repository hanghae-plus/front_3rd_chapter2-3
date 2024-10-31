import { DialogContent } from "@radix-ui/react-dialog"
import { Dialog, DialogHeader, DialogTitle } from "../../../shared/ui/dialog/Dialog"
import { Input, Textarea } from "../../../shared/ui/input/Text"
import { selectedPostAtom } from "../model/postAtoms"
import { Button } from "../../../shared/ui/button/Button"

export const PostEditDialog = () => {
  return (
    <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>게시물 수정</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="제목"
            value={selectedPostAtom?.title || ""}
            onChange={(e) => setSelectedPost((prev) => ({ ...(prev as Post), title: e.target.value }))}
          />
          <Textarea
            rows={15}
            placeholder="내용"
            value={selectedPostAtom?.body || ""}
            onChange={(e) => setSelectedPost((prev) => ({ ...(prev as Post), body: e.target.value }))}
          />
          <Button onClick={() => handleUpdatePost(selectedPost)}>게시물 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
