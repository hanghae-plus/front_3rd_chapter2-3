import { Post } from "@/entities/post/model/types";
import useToggle from "@/shared/model/useToggle";
import { useShallow } from "zustand/shallow";
import { useUpdatePost } from "../api/use-update-post";
import usePostsStore from "./usePostsStore";

export const useModalEditPost = (post: Post) => {
  const { isOpen, toggle, close } = useToggle();
  const { mutate: updatePost } = useUpdatePost();

  const { selectedPost, handleSelectPost } = usePostsStore(
    useShallow((state) => ({
      selectedPost: state.selectedPost,
      handleSelectPost: state.handleSelectPost,
    })),
  );

  const openEditModal = () => {
    handleSelectPost(post);
  };

  return {
    isOpen,
    toggle,
    close,
    selectedPost,
    handleSelectPost,
    openEditModal,
    updatePost,
  };
};
