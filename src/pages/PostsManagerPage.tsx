import { Card, CardContent } from "../shared/ui";
import { UserModal } from "../feature/user/ui";
import {
  PostAddDialog,
  PostDetailDialog,
  PostEditDialog,
  PostHeader,
  PostPagination,
  PostSearchBar,
} from "../feature/post/ui";
import { CommentAddDialog, CommentEditDialog } from "../feature/comment/ui";
import { PostTableWidget } from "../widgets/post/ui";

const PostsManager = () => {
  return (
    <Card className="w-full max-w-6xl mx-auto">
      <PostHeader />
      <CardContent>
        <div className="flex flex-col gap-4">
          <PostSearchBar />
          <PostTableWidget />
          <PostPagination />
        </div>
      </CardContent>

      <PostAddDialog />
      <PostEditDialog />
      <CommentAddDialog />
      <CommentEditDialog />
      <PostDetailDialog />
      <UserModal />
    </Card>
  );
};

export default PostsManager;
