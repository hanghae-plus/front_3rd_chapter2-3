import { usePost } from '@/features/home/model/usePost';
import { useFetchComments } from '@/features/home/api/useFetchComment';

const useComment = () => {
  const { selectedPost } = usePost();
  const { comments, isLoading } = useFetchComments(selectedPost?.id ?? 0);

  return { comments, isLoading };
};

export default useComment;
