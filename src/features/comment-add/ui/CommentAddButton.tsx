import { Plus } from "lucide-react";
import { Button } from "../../../shared/ui";
import { useComments } from "../../comment/model/commentStore";

interface Props {
  postId: number;
}

export const CommentAddButton = ({ postId }: Props) => {
  const { setNewComment, setShowAddCommentDialog } = useComments(postId);

  return (
    <Button
      size="sm"
      onClick={() => {
        setNewComment((prev) => ({ ...prev, postId }));
        setShowAddCommentDialog(true);
      }}
    >
      <Plus className="w-3 h-3 mr-1" />
      댓글 추가
    </Button>
  );
};
