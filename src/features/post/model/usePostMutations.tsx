import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addPost, deletePost, updatePost } from '../../../entities/post/api/postApi.js';
import { Post } from '../../../entities/post/api/types.js';

const usePostMutations = () => {
  const queryClient = useQueryClient();

  const addPostMutation = useMutation<Post, Error,Partial<Omit<Post, 'id' | 'reactions' | 'author'>>>({
    mutationFn: addPost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts']});
    },
    onError: (error) => {
      console.error(error.message);
    },
  });
  

  const updatePostMutation = useMutation<Post, Error, Partial<Post> & { id: number }>({
    mutationFn: updatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts']});
    },
    onError: (error) => {
      console.error(error.message);
    },
  });


  const deletePostMutation = useMutation<{ success: boolean }, Error, number>({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['posts']});
    },
    onError: (error) => {
      console.error(error.message);
    },
  });

  return {
    addPostMutation,
    updatePostMutation,
    deletePostMutation,
  };
};

export default usePostMutations;