import { Plus } from "lucide-react";
import { Comment, useComment } from "../../../features/comment";
import { usePost } from "../../../features/post";
import { Button } from "../../../shared/ui";

// 댓글 렌더링
export const CommentList = () => {
  const { selectedPost } = usePost();

  const { commentList, setNewComment, setShowAddCommentDialog } = useComment();

  return (
    <div className="mt-2">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button
          size="sm"
          onClick={() => {
            setNewComment(prev => ({ ...prev, postId: selectedPost?.id || 0 }));
            setShowAddCommentDialog(true);
          }}
        >
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {(commentList || []).map(comment => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};
