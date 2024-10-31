import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment, deleteComment, likeComment } from '../../../entities/comment/api/commentApi.js';
import { Comment } from '../../../entities/comment/api/types.js';

const useCommentMutations = () => {
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation<Comment,Error,{ body: string; postId: number | null; userId: number; }>({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['comments']});
    },
  });

  const deleteCommentMutation = useMutation<{ success: boolean },Error,number>({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['comments']});
    },
  });

  const likeCommentMutation = useMutation<Comment,Error, ({ id: number; currentLikes: number })>({
    mutationFn: ({ id, currentLikes }) => likeComment(id, currentLikes),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['comments']});
    },
  });

  return {
    addCommentMutation,
    // updateCommentMutation,
    deleteCommentMutation,
    likeCommentMutation,
  };
};

export default useCommentMutations;