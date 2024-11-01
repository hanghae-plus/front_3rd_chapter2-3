import React, { useState } from "react";
import { Button, DialogContainer, Textarea } from "../../../shared/ui";
import { useCommentStore } from "../store/useCommentStore";
import { useAddCommentMutation } from "../model/hook/useQuery";
import { usePostsStore } from "../../post/store/usePostsStore";

export function AddCommentDialog() {
  const { showAddCommentDialog, setShowAddCommentDialog } = useCommentStore();
  const { selectedPost } = usePostsStore();
  const [newComment, setNewComment] = useState(DEFAULT_COMMENT);

  const { body } = newComment;

  const { mutateAsync: addComment } = useAddCommentMutation();

  const handleChangeEditCommentInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;
    setNewComment({ ...newComment, body: value });
  };

  const handleClickAddCommentButton = () => {
    if (!selectedPost) {
      return;
    }
    const { id } = selectedPost;

    addComment({ ...newComment, postId: id });
    setShowAddCommentDialog(false);
  };
  return (
    <DialogContainer title="새 댓글 추가" open={showAddCommentDialog} onOpenChange={setShowAddCommentDialog}>
      <div className="space-y-4">
        <Textarea placeholder="댓글 내용" value={body} onChange={handleChangeEditCommentInput} />
        <Button onClick={handleClickAddCommentButton}>댓글 추가</Button>
      </div>
    </DialogContainer>
  );
}

const DEFAULT_COMMENT = { body: "", postId: null, userId: 1 };
