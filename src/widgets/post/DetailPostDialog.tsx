import { DialogContainer } from "../../shared/ui";
import { usePostsStore } from "../../features/post/store/usePostsStore";
import { Comments } from "../comment/Comments";

export function DetailPostDialog() {
  const { selectedPost, showPostDetailDialog, setShowPostDetailDialog } = usePostsStore();

  if (!selectedPost) {
    return <></>;
  }
  const { title, body, id } = selectedPost;

  return (
    <DialogContainer open={showPostDetailDialog} onOpenChange={setShowPostDetailDialog} title={title}>
      <div className="space-y-4">{body}</div>
      <Comments postId={id} />
    </DialogContainer>
  );
}
