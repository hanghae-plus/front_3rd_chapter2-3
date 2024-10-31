import { DialogLayout } from '@shared/ui'
import { postStore } from '../../model/stores'
import AddPostForm from './AddPostForm'

export const AddPostDialog = () => {
  const { showAddDialog, setShowAddDialog } = postStore()

  return (
    <DialogLayout title="새 게시물 추가" open={showAddDialog} onOpenChange={setShowAddDialog}>
      <AddPostForm />
    </DialogLayout>
  )
}
