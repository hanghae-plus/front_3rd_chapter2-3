import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchGetPostBySearch } from "../../../entities/post/api/postApi"

const useMutationSearchQuery = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (searchQuery: string) => fetchGetPostBySearch(searchQuery),
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], data)
    },
  })
}

export default useMutationSearchQuery
