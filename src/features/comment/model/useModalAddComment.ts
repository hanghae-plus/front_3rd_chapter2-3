import useToggle from "@/shared/model/useToggle";
import { useAddComment } from "../api/use-add-comment";

export const useModalAddComment = (postId: number) => {
  const { isOpen, toggle, close } = useToggle();
  const { mutate: addComment } = useAddComment();

  return {
    isOpen,
    toggle,
    close,
    addComment,
    postId,
  };
};
