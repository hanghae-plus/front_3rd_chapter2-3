import { useMutationDeletePost } from "@/entities/post/api/use-mutation-delete-post";
import { postListState } from "@/entities/post/model/post-state";

export const useDeletePost = (postId: number) => {
  const mutation = useMutationDeletePost(postId);
  const { deletePost } = postListState();

  async function handleDeletePost() {
    await mutation.mutateAsync();
    deletePost(postId);
  }

  return { handleDeletePost };
};
