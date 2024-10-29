import { Post } from "@/entities/post/model/types";

import ModalEditPost from "@/features/post/ui/modals/ModalEditPost";
import ModalPostDetail from "@/features/post/ui/modals/ModalPostDetail";
import PostDeleteButton from "@/features/post/ui/PostDeleteButton";

type PostTableRowActionsProps = {
  post: Post;
};

const PostTableRowActions = ({ post }: PostTableRowActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <ModalPostDetail post={post} />
      <ModalEditPost post={post} />
      <PostDeleteButton id={post.id} />
    </div>
  );
};

export default PostTableRowActions;
