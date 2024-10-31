import React, { useEffect } from "react";
import CommentItem from "./CommentItem";
import { Button } from "../../../shared/ui/Button/Button";
import { Plus } from "lucide-react";
import { useAtom } from "jotai";
import { commentsAtom, showEditCommentDialogAtom } from "../../../entities/comment/model/commentAtom";
import useComment from "../model/useComment";

interface CommentListProps {
  postId: number;
}

const CommentList: React.FC<CommentListProps> = ({ postId }) => {
  const [comments] = useAtom(commentsAtom);
  const [, setShowEditCommentDialog] = useAtom(showEditCommentDialogAtom);
  const { fetchCommentsMutation } = useComment();

  useEffect(() => {
    if (!comments[postId] && !fetchCommentsMutation.isPending) {
      fetchCommentsMutation.mutate(postId);
    }
  }, [comments, postId, fetchCommentsMutation]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold">댓글</h3>
        <Button size="sm" onClick={() => setShowEditCommentDialog(true)}>
          <Plus className="w-3 h-3 mr-1" />
          댓글 추가
        </Button>
      </div>
      <div className="space-y-1">
        {fetchCommentsMutation.isPending ? (
          <div>댓글 로딩 중...</div>
        ) : fetchCommentsMutation.isError ? (
          <div className="text-red-500">댓글을 불러오지 못했습니다.</div>
        ) : comments[postId]?.length > 0 ? (
          comments[postId].map((comment) => (
            <CommentItem comment={comment} key={comment.id} />
          ))
        ) : (
          <div>댓글이 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default CommentList;