import { useMutation, useQueryClient } from "@tanstack/react-query"
import { fetchGetPostByTag } from "../../../entities/post/api/postApi"
import { TagSlugType } from "../../../entities/tag/api/types"

const useMutationPostsByTag = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (tag: TagSlugType) => fetchGetPostByTag(tag),
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], data)
    },
  })
}

export default useMutationPostsByTag
