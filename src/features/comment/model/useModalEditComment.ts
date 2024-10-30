import { Comment } from "@/entities/comment/model/types";
import { getModalKey, useModalStore } from "@/shared/model/useModalStore";
import { useEffect } from "react";
import { useShallow } from "zustand/shallow";
import { useUpdateComment } from "../api/use-update-comment";
import useCommentStore from "./useCommentStore";

export const useModalEditComment = (comment: Comment | null) => {
  const commentId = comment?.id;
  const { mutate: updateComment } = useUpdateComment();

  const modalStore = useModalStore(
    useShallow((state) => ({
      activeModals: state.activeModals,
      toggle: state.toggle,
      close: state.close,
    })),
  );

  const { selectedComment, handleSelectComment } = useCommentStore(
    useShallow((state) => ({
      selectedComment: state.selectedComment,
      handleSelectComment: state.handleSelectComment,
    })),
  );

  const handleChangeComment = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!selectedComment) return;
    handleSelectComment({ ...selectedComment, body: e.target.value });
  };

  const handleUpdateComment = () => {
    if (!selectedComment) return;
    updateComment(selectedComment);
    modalStore.close({ type: "editComment", id: selectedComment.id });
  };

  useEffect(() => {
    if (!comment) return;
    handleSelectComment(comment);
  }, [comment, handleSelectComment]);

  return {
    isOpen: modalStore.activeModals.has(getModalKey({ type: "editComment", id: commentId })),
    toggle: (isOpen: boolean) => modalStore.toggle({ type: "editComment", id: commentId }, isOpen),
    close: () => modalStore.close({ type: "editComment", id: commentId }),
    selectedComment,
    handleChangeComment,
    handleUpdateComment,
  };
};
