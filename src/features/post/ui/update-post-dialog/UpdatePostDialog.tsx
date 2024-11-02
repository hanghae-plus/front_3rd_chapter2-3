import { DialogLayout } from '@shared/ui'
import { postStore } from '../../model/stores'
import { UpdatePostForm } from './UpdatePostForm'

export const UpdatePostDialog = () => {
  const { showEditDialog, setShowEditDialog } = postStore()

  return (
    <DialogLayout title="게시물 수정" open={showEditDialog} onOpenChange={setShowEditDialog}>
      <UpdatePostForm />
    </DialogLayout>
  )
}
