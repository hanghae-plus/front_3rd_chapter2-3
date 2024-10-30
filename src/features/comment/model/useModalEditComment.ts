import { getModalKey, useModalStore } from "@/shared/model/useModalStore";
import { useShallow } from "zustand/shallow";
import { useUpdateComment } from "../api/use-update-comment";
import useCommentStore from "./useCommentStore";

type ModalEditCommentProps = {
  commentId: number;
};

export const useModalEditComment = ({ commentId }: ModalEditCommentProps) => {
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

  return {
    isOpen: modalStore.activeModals.has(getModalKey({ type: "editComment", id: commentId })),
    toggle: (isOpen: boolean) => modalStore.toggle({ type: "editComment", id: commentId }, isOpen),
    close: () => modalStore.close({ type: "editComment", id: commentId }),
    selectedComment,
    handleSelectComment,
    updateComment,
  };
};
