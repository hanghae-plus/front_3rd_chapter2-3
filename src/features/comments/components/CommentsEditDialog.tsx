import React from "react"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui"
import { Comments } from "../../../entities/comments/model/Comments"

interface CommentsEditDialogProps {
  showEditCommentDialog: boolean
  setShowEditCommentDialog: (open: boolean) => void
  selectedComment: Comments | null
  setSelectedComment: React.Dispatch<React.SetStateAction<Comments | null>>
  updateComment: () => void
}

// 댓글 수정 대화상자 */
const CommentsEditDialog = ({
  showEditCommentDialog,
  setShowEditCommentDialog,
  selectedComment,
  setSelectedComment,
  updateComment,
}: CommentsEditDialogProps) => {
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
            onChange={(e) =>
              setSelectedComment((prev) =>
                prev
                  ? { ...prev, body: e.target.value }
                  : {
                      id: 0,
                      body: e.target.value,
                      likes: 0,
                      postId: 0,
                      user: {
                        id: 0,
                        image: "",
                        username: "",
                      },
                    },
              )
            }
          />
          <Button onClick={updateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentsEditDialog
