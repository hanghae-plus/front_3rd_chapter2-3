import useToggle from "@/shared/model/useToggle";
import { useShallow } from "zustand/shallow";
import { useUpdateComment } from "../api/use-update-comment";
import useCommentStore from "./useCommentStore";

export const useModalEditComment = () => {
  const { isOpen, toggle, close } = useToggle();
  const { mutate: updateComment } = useUpdateComment();

  const { selectedComment, handleSelectComment } = useCommentStore(
    useShallow((state) => ({
      selectedComment: state.selectedComment,
      handleSelectComment: state.handleSelectComment,
    })),
  );

  return {
    isOpen,
    toggle,
    close,
    selectedComment,
    handleSelectComment,
    updateComment,
  };
};
