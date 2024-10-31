import { fetchComments } from "@entities/comment/api/fetchComments"
import { useQuery } from "@tanstack/react-query"

export const useQueryCommentList = (postId: number) => {
  const {
    data,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comment"],
    queryFn: () => fetchComments(postId),
  })

  if (isLoading)
    return { data: null, comments: null, isLoading: true, error }

  return { data, comments: data?.comments, isLoading: false, error: null }
} 