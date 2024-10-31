import { ChangeEvent } from "react";
import { Comment } from "../../../entities/comment/model/types";
import { Textarea, Button } from "../../../shared/ui";
import { CustomDialog } from "../../../shared/ui/CustomDialog";

export const CommentUpdateDialog : React.FC<{
  showCommentUpdateDialog: boolean
  setShowCommentUpdateDialog: (value: boolean) => void
  selectedComment: Comment
  setSelectedComment: (comment: Comment) => void
  updateComment: (comment: Comment) => void
}> = ({
  showCommentUpdateDialog,
  setShowCommentUpdateDialog,
  selectedComment,
  setSelectedComment,
  updateComment
}) => {
  return(
    <CustomDialog open={showCommentUpdateDialog} onOpenChange={setShowCommentUpdateDialog} title={"댓글 수정"}>
        <>
          <Textarea
            placeholder="댓글 내용"
            value={selectedComment?.body || ""}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedComment({ ...selectedComment, body: e.target.value })}
          />
          <Button onClick={() => updateComment(selectedComment)}>댓글 업데이트</Button>
        </>
      </CustomDialog>
  );
};