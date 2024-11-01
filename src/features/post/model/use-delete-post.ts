import { postListState } from "@/entities/post/model/post-state";
import { useMutationDeletePost } from "../api/use-mutation-delete-post";

export const useDeletePost = (postId: number) => {
  const mutation = useMutationDeletePost(postId);
  const { deletePost } = postListState();

  async function handleDeletePost() {
    await mutation.mutateAsync();
    deletePost(postId);
  }

  return { handleDeletePost };
};
