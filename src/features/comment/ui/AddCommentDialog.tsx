import { Button, Textarea } from '@shared/ui'
import { DialogLayout } from '@widgets/ui'
import { useComments } from '../model/hooks'
import { postStore } from '@features/post/model/stores'
import { commentStore } from '../model/stores'

export const AddCommentDialog = () => {
  const { selectedPost } = postStore()
  const { newComment, showAddCommentDialog, setNewComment, setShowAddCommentDialog } = commentStore()

  const { addComment } = useComments(selectedPost?.id ?? 0)

  const handleAddComment = async () => {
    await addComment(newComment)
    setShowAddCommentDialog(false)
  }

  return (
    <DialogLayout title="새 댓글 추가" open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <Textarea
        placeholder="댓글 내용"
        value={newComment.body}
        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
      />
      <Button onClick={handleAddComment}>댓글 추가</Button>
    </DialogLayout>
  )
}
