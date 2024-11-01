import { Comments, CommentsState } from "../../../entities/comments/model/Comments"
import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Textarea } from "../../../shared/ui/"
import { useUpdateComment } from "../api/commentsFeaturesApi"
import useComment from "../hooks/useComments"

// 댓글 수정 대화상자 */
const CommentsEditDialog = () => {
  const { showEditCommentDialog, setShowEditCommentDialog, selectedComment, setSelectedComment, setComments } =
    useComment()
  function handleChangeSelectedComment(field: string, value: string) {
    setSelectedComment((prev) =>
      prev
        ? { ...prev, [field]: value }
        : {
            id: 0,
            body: value,
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

  const { mutate: updateComment } = useUpdateComment()

  function handleUpdateComment() {
    if (!selectedComment) {
      return
    }

    updateComment(selectedComment, {
      onSuccess: (data: Comments) => {
        setComments((prev: CommentsState | null) => {
          const currentState = prev || {}
          const commentsForPost = currentState[data.postId] || []

          return {
            ...currentState,
            [data.postId]: commentsForPost.map((comment) => (comment.id === data.id ? data : comment)),
          }
        })
        setShowEditCommentDialog(false)
      },
      onError: (error) => {
        console.error("Failed to update comment:", error)
      },
    })
  }

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
            onChange={(e) => handleChangeSelectedComment("body", e.target.value)}
          />
          <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CommentsEditDialog
