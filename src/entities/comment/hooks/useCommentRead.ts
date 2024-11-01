import { readCommentApi } from "@entities/comment/api"
import { useQuery } from "@tanstack/react-query"

export const useCommentRead = (postId: number) => {
  const {
    data,
    isLoading: isCommentLoading,
    error,
  } = useQuery({
    queryKey: ["comment"],
    queryFn: () => readCommentApi(postId),
    staleTime: 0,
  })

  if (isCommentLoading)
    return { data: null, comments: null, isCommentLoading: true, error }

  return { data, comments: data.comments, isCommentLoading: false, error: null }
}
