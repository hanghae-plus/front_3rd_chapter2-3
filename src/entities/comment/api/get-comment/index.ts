import { useQuery } from "@tanstack/react-query"
import { Comment, GetCommentParams } from "../../model/types"

export const fetchComments = async (postId: number): Promise<{ comments: Comment[] }> => {
  const response = await fetch(`/api/comments/post/${postId}`)
  const data = await response.json()

  return data
}

export const useComments = (params: GetCommentParams) => {
  const { postId } = params

  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    initialData: { comments: [] },
    enabled: !!postId,
  })
}
