import { Post } from "@/entities/post/model/types";
import { getModalKey, useModalStore } from "@/shared/model/useModalStore";
import { useShallow } from "zustand/shallow";
import { useUpdatePost } from "../api/use-update-post";
import usePostsStore from "./usePostsStore";

export const useModalEditPost = (post: Post) => {
  const modalStore = useModalStore(
    useShallow((state) => ({
      activeModals: state.activeModals,
      toggle: state.toggle,
      close: state.close,
    })),
  );
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
    isOpen: modalStore.activeModals.has(getModalKey({ type: "editPost", id: post.id })),
    toggle: (isOpen: boolean) => modalStore.toggle({ type: "editPost", id: post.id }, isOpen),
    close: () => modalStore.close({ type: "editPost", id: post.id }),
    selectedPost,
    handleSelectPost,
    openEditModal,
    updatePost,
  };
};
