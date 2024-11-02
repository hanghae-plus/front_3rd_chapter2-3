import { AddCommentDialog, UpdateCommentDialog } from '@features/comment/ui'
import { AddPostDialog, DetailPostDialog, UpdatePostDialog } from '@features/post/ui'
import { UserDetailDialog } from '@features/user/ui'

export const ModalProvider = () => {
  return (
    <>
      <AddPostDialog />

      <UpdatePostDialog />

      <AddCommentDialog />

      <UpdateCommentDialog />

      <DetailPostDialog />

      <UserDetailDialog />
    </>
  )
}
