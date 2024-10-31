import { useQuery } from "@tanstack/react-query"
import { commentApi } from "../api"
import { CommentType } from "../model/types"

export const useQueryComment = (postId: number) => {
  return useQuery<CommentType[], Error>({
    queryKey: ["comments", postId],
    queryFn: async () => {
      const res = await commentApi.fetchComments(postId)
      return res.data.comments.map((comment: any) => ({
        body: comment.body,
        id: comment.id,
        likes: comment.likes,
        postId: comment.postId,
        user: comment.user,
      }))
    },
    staleTime: 5 * 60 * 1000,
    enabled: postId !== 0,
  })
}
