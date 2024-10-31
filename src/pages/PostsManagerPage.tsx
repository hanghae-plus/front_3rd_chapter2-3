import PostsManagerHeader from "../widgets/ui/PostsManagerHeader"
import PostsManagerContent from "../widgets/ui/PostsManagerContent"
import AddCommentDialog from "../features/comment/ui/AddCommentDialog"
import UpdateCommentDialog from "../features/comment/ui/UpdateCommentDialog"
import PostDetailDialog from "../features/post/ui/PostDetailDialog"
import UserModal from "../features/user/ui/UserModal"
import { Card } from "../shared/ui/Card"
import AddPostDialog from "../features/post/ui/AddPostDialog"
import UpdatePostDialog from "../features/post/ui/UpdatePostDialog"
import { useUser } from "../features/user/model/useUser"

const PostsManager = () => {
  const { selectedUserId } = useUser()
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostsManagerHeader />
      <PostsManagerContent />
      <AddPostDialog />
      <UpdatePostDialog />
      <AddCommentDialog />
      <UpdateCommentDialog />
      <PostDetailDialog />
      {selectedUserId && <UserModal />}
    </Card>
  )
}

export default PostsManager
