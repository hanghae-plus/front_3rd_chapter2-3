import useToggle from "@/shared/model/useToggle";
import { useAddPost } from "../api/use-add-post";

export const useModalAddPost = () => {
  const { isOpen, toggle, close } = useToggle();
  const { mutate: addPost } = useAddPost();

  return {
    isOpen,
    toggle,
    close,
    addPost,
  };
};
