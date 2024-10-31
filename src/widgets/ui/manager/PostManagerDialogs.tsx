import { PostAddDialog } from "../../../features/ui/post/PostAddDialog"
import { PostEditDialog } from "../../../features/ui/post/PostEditDialog"
import { CommentAddDialog } from "../../../features/ui/comment/CommentAddDialog"
import { CommentEditDialog } from "../../../features/ui/comment/CommentEditDialog"
import { UserDetailDialog } from "../../../features/ui/user/UserDetailDialog"
import { PostDetailDialog } from "../../../widgets/ui/post/PostDetailDialog"

export const PostManagerDialogs = () => {
  return (
    <>
      <PostAddDialog />
      <PostEditDialog />
      <PostDetailDialog />
      <CommentAddDialog />
      <CommentEditDialog />
      <UserDetailDialog />
    </>
  )
}
