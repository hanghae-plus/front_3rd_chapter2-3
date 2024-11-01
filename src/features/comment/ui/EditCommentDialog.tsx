import React, { useEffect, useState } from "react";
import { Button, DialogContainer, Textarea } from "../../../shared/ui";
import { useCommentStore } from "../store/useCommentStore";
import { useEditCommentMutation } from "../model/hook/useQuery";

export default function EditCommentDialog() {
  const { selectedComment, showEditCommentDialog, setShowEditCommentDialog, setSelectedComment } = useCommentStore();
  const [updateComment, setUpdateComment] = useState(selectedComment);

  const { mutateAsync: editComment } = useEditCommentMutation();

  const handleChangeEditCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!updateComment) {
      return;
    }
    const { value } = e.target;
    setUpdateComment({ ...updateComment, body: value });
  };

  const handleClickEditCommentButton = () => {
    if (!updateComment) {
      return;
    }
    editComment(updateComment);
    setShowEditCommentDialog(false);
    setSelectedComment(null);
  };

  useEffect(() => {
    setUpdateComment(selectedComment);
  }, [selectedComment]);
  if (!updateComment) {
    return <></>;
  }

  const { body } = updateComment;

  return (
    <DialogContainer title="댓글 수정" open={showEditCommentDialog} onOpenChange={setShowEditCommentDialog}>
      <div className="space-y-4">
        <Textarea placeholder="댓글 내용" value={body} onChange={handleChangeEditCommentInput} />
        <Button onClick={handleClickEditCommentButton}>댓글 업데이트</Button>
      </div>
    </DialogContainer>
  );
}
