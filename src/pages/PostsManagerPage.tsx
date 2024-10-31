import PostsManagerHeader from "./ui/PostsManagerHeader"
import PostsManagerContent from "./ui/PostsManagerContent"
import AddPostDialog from "./ui/AddPostDialog"
import UpdatePostDialog from "./ui/UpdatePostDialog"
import AddCommentDialog from "./ui/AddCommentDialog"
import UpdateCommentDialog from "./ui/UpdateCommentDialog"
import PostDetailDialog from "./ui/PostDetailDialog"
import UserModal from "./ui/UserModal"
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
