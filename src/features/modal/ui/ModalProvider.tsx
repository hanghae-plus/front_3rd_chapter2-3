import { CreateCommentModal, UpdateCommentModal } from "@features/comment/ui"
import { CreatePostModal } from "@features/post/ui/add"
import { UpdatePostModal } from "@features/post/ui/update/UpdatePostModal"
import { ShowPostDetailModal } from "@features/post/ui/ShowPostDetailModal"
import { UserDetailModal } from "@features/user/ui/UserDetailModal"

export const ModalProvider = () => {
  return (
    <>
      <CreatePostModal />
      <UpdatePostModal />
      <ShowPostDetailModal />
      <CreateCommentModal />
      <UpdateCommentModal />
      <UserDetailModal />
    </>
  )
}
