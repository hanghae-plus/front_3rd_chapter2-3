import { Dialog, DialogHeader, DialogContent, DialogTitle } from "../../../shared/ui"
import { Textarea, Button } from "../../../shared/ui"
import { useCommentStore } from "../../Comment/model/stores/useCommentStore";
import { useCommentService } from "../../Comment/model/services/useCommentService";

export const EditCommentDialog = () => {
  const { selectedComment, setSelectedComment } = useCommentStore()
  const { editComment } = useCommentService()
  const { showEditCommentDialog, setShowEditCommentDialog } = useCommentStore()

  return (
    <Dialog open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>댓글 수정</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Textarea
              placeholder="댓글 내용"
              value={selectedComment?.body || ""}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                if (selectedComment) {
                  setSelectedComment({
                    ...selectedComment,
                    body: e.target.value,
                  })
                }
              }}
            />
            <Button onClick={editComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
