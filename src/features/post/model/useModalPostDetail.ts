import { Post } from "@/entities/post/model/types";
import { getModalKey, useModalStore } from "@/shared/model/useModalStore";
import { useQueryParams } from "@/shared/model/useQueryParams";
import { useShallow } from "zustand/shallow";
import usePostsStore from "./usePostsStore";

type ModalPostDetailProps = {
  postId: number;
};

export const useModalPostDetail = ({ postId }: ModalPostDetailProps) => {
  const { queries } = useQueryParams();

  const modalStore = useModalStore(
    useShallow((state) => ({
      activeModals: state.activeModals,
      toggle: state.toggle,
      close: state.close,
    })),
  );

  const { selectedPost, handleSelectPost } = usePostsStore(
    useShallow((state) => ({
      selectedPost: state.selectedPost,
      handleSelectPost: state.handleSelectPost,
    })),
  );

  const openPostDetail = (post: Post) => {
    handleSelectPost(post);
  };

  return {
    isOpen: modalStore.activeModals.has(getModalKey({ type: "postDetail", id: postId })),
    toggle: (isOpen: boolean) => modalStore.toggle({ type: "postDetail", id: postId }, isOpen),
    selectedPost,
    searchQuery: queries.search,
    openPostDetail,
  };
};
