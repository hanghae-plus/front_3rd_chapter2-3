import { overlay } from "overlay-kit"
import { Comment } from "../../../entities/comment/model/type"
import { Post } from "../../../entities/post/model/type"
import AddCommentDialog from "../../../features/comments/ui/AddCommentDialog"
import EditCommentDialog from "../../../features/comments/ui/EditCommentDialog"
import AddPostDialog from "../../../features/posts/ui/dialogs/AddPostDialog"
import EditPostDialog from "../../../features/posts/ui/dialogs/EditPostDialog"
import PostDetailDialog from "../../../features/posts/ui/dialogs/PostDetailDialog"
import UserInfoModal from "../../../features/user/ui/UserInfoModal"

export const openModals = {
  comment: {
    openAddDialog: (postId: number) => {
      overlay.open(({ isOpen, close }) => <AddCommentDialog isOpen={isOpen} close={close} postId={postId} />)
    },
    openEditDialog: ({ comment }: { comment: Comment }) => {
      overlay.open(({ isOpen, close }) => <EditCommentDialog isOpen={isOpen} close={close} comment={comment} />)
    },
  },
  post: {
    openDetailDialog: (post: Post) => {
      overlay.open(({ isOpen, close }) => <PostDetailDialog isOpen={isOpen} close={close} post={post} />)
    },
    openAddDialog: () => {
      overlay.open(({ isOpen, close }) => <AddPostDialog isOpen={isOpen} close={close} />)
    },
    openEditDialog: (post: Post) => {
      overlay.open(({ isOpen, close }) => <EditPostDialog isOpen={isOpen} close={close} post={post} />)
    },
  },
  user: {
    openModal: (userId: number) => {
      overlay.open(({ isOpen, close }) => <UserInfoModal isOpen={isOpen} close={close} userId={userId} />)
    },
  },
}
