import { Button } from "../../../shared/ui";
import { Plus } from "lucide-react";
import { useCommentStore } from "../store/useCommentStore";

export function CommentHeader() {
  const { setShowAddCommentDialog } = useCommentStore();

  const handleClickAddCommentButton = () => {
    setShowAddCommentDialog(true);
  };

  return (
    <div className="flex items-center justify-between mb-2">
      <h3 className="text-sm font-semibold">댓글</h3>
      <Button size="sm" onClick={handleClickAddCommentButton}>
        <Plus className="w-3 h-3 mr-1" />
        댓글 추가
      </Button>
    </div>
  );
}
