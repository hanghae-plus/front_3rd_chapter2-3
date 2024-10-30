import { useQuery } from '@tanstack/react-query';
import { fetchComments } from '../../../entities/comment/api/commentApi.js';
import { Comment } from '../../../entities/comment/api/types.js';

const useComments = (postId:number) => {
  return useQuery<Comment[], Error>({
    queryKey: ['comments', postId],
    queryFn: () => fetchComments(postId),
  });
};

export default useComments;