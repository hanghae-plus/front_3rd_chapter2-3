import { useComment } from "@/entities/comment/model/use-comment";
import { CommentType } from "@/entities/comment/model/comment-type";
import { PostWithAuthorType } from "@/entities/post/model/post-type";
import { AddCommentButton } from "@/features/addComment/ui/add-comment-button";
import { CommentItemContent } from "@/entities/comment/ui/comment-item-content";
import { CommentControl } from "@/features/commentControl/ui/comment-control";

interface CommentContainer {
  post: PostWithAuthorType;
}

export const CommentContainer = ({ post }: CommentContainer) => {
  const { commentList, addNewComment } = useComment(post.id);

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <AddCommentButton post={post} addNewComment={addNewComment} />
      </div>
      <div className="space-y-1">
        {commentList.map((comment, index) => (
          <CommentItem comment={comment} key={index} />
        ))}
      </div>
    </div>
  );
};

const CommentItem = ({ comment }: { comment: CommentType }) => {
  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <CommentItemContent comment={comment} />
      <CommentControl comment={comment} />
    </div>
  );
};
