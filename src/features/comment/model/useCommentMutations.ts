import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addComment, updateComment, deleteComment, likeComment } from '../../../entities/comment/api/commentApi.js';
import { Comment } from '../../../entities/comment/api/types.js';

const useCommentMutations = () => {
  const queryClient = useQueryClient();

  const addCommentMutation = useMutation<Comment,Error,Omit<Comment, 'id' | 'likes' | 'user'>>({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['comments']});
    },
  });

  const updateCommentMutation = useMutation<Comment,Error,Partial<Comment> & { id: number }>({
    mutationFn: updateComment,
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
    updateCommentMutation,
    deleteCommentMutation,
    likeCommentMutation,
  };
};

export default useCommentMutations;