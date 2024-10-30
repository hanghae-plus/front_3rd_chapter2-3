import { Button, Textarea } from '@shared/ui'
import { DialogLayout } from '@widgets/ui'
import { commentStore } from '../model/stores'
import { useComments } from '../model/hooks'
import { postStore } from '@features/post/model/stores'

export const UpdateCommentDialog = () => {
  const { showEditCommentDialog, selectedComment, setShowEditCommentDialog, setSelectedComment } = commentStore()

  const { selectedPost } = postStore()

  const { updateComment } = useComments(selectedPost?.id ?? 0)

  const handleUpdateComment = async () => {
    await updateComment({ id: selectedComment?.id ?? 0, body: selectedComment?.body ?? '' })
    setShowEditCommentDialog(false)
  }

  return (
    <DialogLayout open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <Textarea
        placeholder="댓글 내용"
        value={selectedComment?.body || ''}
        onChange={(e) => {
          if (!selectedComment) return
          setSelectedComment({ ...selectedComment, body: e.target.value })
        }}
      />
      <Button onClick={handleUpdateComment}>댓글 업데이트</Button>
    </DialogLayout>
  )
}
