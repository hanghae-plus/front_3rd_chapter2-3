import { useCallback } from 'react'
import { DialogLayout } from '@shared/ui'
import { commentStore } from '@features/comment/model/stores'
import { useComments } from '@features/comment/model/hooks'
import { postStore } from '@features/post/model/stores'
import { EditForm } from '@shared/ui'

export const UpdateCommentDialog = () => {
  const { showEditCommentDialog, selectedComment, setShowEditCommentDialog, setSelectedComment } = commentStore()

  const { selectedPost } = postStore()

  const { updateComment } = useComments(selectedPost?.id ?? 0)

  const handleUpdateComment = useCallback(() => {
    updateComment({ id: selectedComment?.id ?? 0, body: selectedComment?.body ?? '' })
    setShowEditCommentDialog(false)
  }, [updateComment, selectedComment, setShowEditCommentDialog])

  return (
    <DialogLayout open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <EditForm
        value={selectedComment?.body || ''}
        placeholder="댓글 내용"
        submitText="댓글 업데이트"
        onChange={(e) => {
          if (!selectedComment) return
          setSelectedComment({ ...selectedComment, body: e.target.value })
        }}
        onSubmit={handleUpdateComment}
      />
    </DialogLayout>
  )
}
