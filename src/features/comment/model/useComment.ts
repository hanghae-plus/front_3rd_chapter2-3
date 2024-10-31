import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchCommentsApi, addCommentApi, updateCommentApi, deleteCommentApi, likeCommentApi } from '../../../entities/comment/api/commentApi';
import { Comment, NewComment } from '../../../entities/comment/model/types';

export function useCommentManagement(postId: number) {
  const queryClient = useQueryClient();
  const [newComment, setNewComment] = useState<NewComment>({ body: '', postId, userId: 1 });

  const { data: commentsData } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => fetchCommentsApi(postId),
    enabled: !!postId
  });

  const addCommentMutation = useMutation(addCommentApi, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['comments', postId]});
    },
  });

  const updateCommentMutation = useMutation(
    ({ id, comment }: { id: number; comment: Partial<Comment> }) => updateCommentApi(id, comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['comments', postId]});
      },
    }
  );

  const deleteCommentMutation = useMutation(deleteCommentApi, {
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey:['comments', postId]});
    },
  });

  const likeCommentMutation = useMutation(
    ({ id, likes }: { id: number; likes: number }) => likeCommentApi(id, likes),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({queryKey:['comments', postId]});
      },
    }
  );

  return {
    comments: commentsData?.comments || [],
    newComment,
    setNewComment,
    addComment: addCommentMutation.mutate,
    updateComment: updateCommentMutation.mutate,
    deleteComment: deleteCommentMutation.mutate,
    likeComment: likeCommentMutation.mutate,
  };
}