import PostsManagerHeader from "../features/post/ui/PostsManagerHeader"
import PostsManagerContent from "../features/post/ui/PostsManagerContent"
import AddPostDialog from "../features/post/ui/AddPostDialog"
import UpdatePostDialog from "../features/post/ui/UpdatePostDialog"
import AddCommentDialog from "../features/comment/ui/AddCommentDialog"
import UpdateCommentDialog from "../features/comment/ui/UpdateCommentDialog"
import PostDetailDialog from "../features/post/ui/PostDetailDialog"
import UserModal from "../features/user/ui/UserModal"
import { Card } from "../shared/ui/Card"

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostsManagerHeader />
      <PostsManagerContent />
      <AddPostDialog />
      <UpdatePostDialog />
      <AddCommentDialog />
      <UpdateCommentDialog />
      <PostDetailDialog />
      <UserModal />
    </Card>
  )
}

export default PostsManager
