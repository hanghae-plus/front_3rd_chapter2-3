import { Edit2, ThumbsUp, Trash2 } from "lucide-react";
import { Button, HighlightText } from "../../../shared/ui";
import { useSearchFilterStore } from "../../search/model/store/useSearchFilterStore";
import { useCommentStore } from "../store/useCommentStore";
import { useDeleteCommentMutation, useLikeCommentMutation } from "../model/hook/useQuery";

type Props = {
  comment: CommentDetail;
};

export function Comment({ comment }: Props) {
  const { searchQuery } = useSearchFilterStore();
  const { id, body, likes } = comment;
  const { setSelectedComment, setShowEditCommentDialog } = useCommentStore();

  const { mutateAsync: deleteComment } = useDeleteCommentMutation();
  const { mutateAsync: likeComment } = useLikeCommentMutation();

  const handleClickEditCommentButton = () => {
    setSelectedComment(comment);
    setShowEditCommentDialog(true);
  };

  const handleClickDeleteCommentButton = () => {
    deleteComment(id);
  };

  const handleClickLikeCommentButton = () => {
    likeComment({ id, likes: likes + 1 });
  };

  return (
    <div className="flex items-center justify-between text-sm border-b pb-1">
      <div className="flex items-center space-x-2 overflow-hidden">
        <span className="font-medium truncate">{comment.user.username}:</span>
        <span className="truncate">
          <HighlightText text={body} highlight={searchQuery} />
        </span>
      </div>
      <div className="flex items-center space-x-1">
        <Button variant="ghost" size="sm" onClick={handleClickLikeCommentButton}>
          <ThumbsUp className="w-3 h-3" />
          <span className="ml-1 text-xs">{likes}</span>
        </Button>
        <Button variant="ghost" size="sm" onClick={handleClickEditCommentButton}>
          <Edit2 className="w-3 h-3" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleClickDeleteCommentButton}>
          <Trash2 className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
}
