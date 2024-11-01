import { useQuery } from "@tanstack/react-query"
import { fetchComments, queryKeys } from "@/entities/comment"

export const useFetchComments = (id: number) => {
  return useQuery({
    queryFn: async () => {
      return await fetchComments(id)
    },
    queryKey: queryKeys.FETCH_COMMENTS_KEY(id),
    enabled: id !== -1,
  })
}
