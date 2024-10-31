import { DialogLayout } from '@shared/ui'
import { useComments } from '@features/comment/model/hooks'
import { postStore } from '@features/post/model/stores'
import { commentStore } from '@features/comment/model/stores'
import { useCallback } from 'react'
import { EditForm } from '@shared/ui'

export const AddCommentDialog = () => {
  const { selectedPost } = postStore()
  const { newComment, showAddCommentDialog, setNewComment, setShowAddCommentDialog } = commentStore()

  const { addComment } = useComments(selectedPost?.id ?? 0)

  const handleAddComment = useCallback(() => {
    addComment(newComment)
    setShowAddCommentDialog(false)
  }, [addComment, newComment, setShowAddCommentDialog])

  return (
    <DialogLayout title="새 댓글 추가" open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <EditForm
        value={newComment.body}
        placeholder="댓글 내용"
        submitText="댓글 추가"
        onChange={(e) => setNewComment({ ...newComment, body: e.target.value })}
        onSubmit={handleAddComment}
      />
    </DialogLayout>
  )
}
