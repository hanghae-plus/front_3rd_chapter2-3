import { AddCommentButton } from "@/features/comment/ui/add-comment-button";
import { PostWithAuthorType } from "@/entities/post/model/post-type";
import { useComment } from "@/entities/comment/model/use-comment";
import { CommentType } from "@/entities/comment/model/comment-type";
import { CommentItemContent } from "@/entities/comment/ui/comment-item-content";
import { CommentControl } from "@/features/comment/ui/comment-control";

interface CommentContainer {
  post: PostWithAuthorType;
}

export interface CommentItemProps {
  comment: CommentType;
  commentList: CommentType[];
  commenthandler: {
    addNewComment: (newComment: CommentType) => void;
    updateComment: (newComment: CommentType) => void;
    deleteComment: (commentId: number) => void;
  };
}

export const CommentContainer = ({ post }: CommentContainer) => {
  const { commentList, commentHandler } = useComment(post.id);
  const { addNewComment } = commentHandler;

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <AddCommentButton post={post} addNewComment={addNewComment} />
      </div>

      <div className="space-y-1">
        {commentList.map((comment, index) => (
          <CommentItem
            comment={comment}
            commentList={commentList}
            commenthandler={commentHandler}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

const CommentItem = ({ comment, commentList, commenthandler }: CommentItemProps) => {
  return (
    <div key={comment.id} className="flex items-center justify-between text-sm border-b pb-1">
      <CommentItemContent comment={comment} />
      <CommentControl comment={comment} commentList={commentList} commenthandler={commenthandler} />
    </div>
  );
};
