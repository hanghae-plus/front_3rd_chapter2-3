import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/shared/ui";
import { CommentContainer } from "@/widgets/comment/comment-container";
import { PostWithAuthorType } from "@/entities/post/model/post-type";
import { PostTitleHighlight } from "@/entities/post/ui/post-title-highlight";

interface PostDetailDialogProps {
  post: PostWithAuthorType;
  isOpen: boolean;
  close: () => void;
}

export const PostDetailDialog = ({ post, isOpen, close }: PostDetailDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={close}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            <PostTitleHighlight text={post.title} />
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <p>
            <PostTitleHighlight text={post.body} />
          </p>
          <CommentContainer post={post} />
        </div>
      </DialogContent>
    </Dialog>
  );
};
