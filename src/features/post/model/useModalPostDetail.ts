import { Post } from "@/entities/post/model/types";
import { useQueryParams } from "@/shared/model/useQueryParams";
import useToggle from "@/shared/model/useToggle";
import { useShallow } from "zustand/shallow";
import usePostsStore from "./usePostsStore";

export const useModalPostDetail = () => {
  const { isOpen, toggle } = useToggle();
  const { queries } = useQueryParams();

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
    isOpen,
    toggle,
    selectedPost,
    searchQuery: queries.search,
    openPostDetail,
  };
};
