import { useAtom } from "jotai"
import { commentsAtom } from "../../../app/atom"
import { useQuery } from "@tanstack/react-query"

export const useGetComment = (postId: number) => {
  const [comments, setComments] = useAtom(commentsAtom)

  return useQuery({
    queryKey: ["fetchComments", postId],
    queryFn: async () => {
      const response = await fetch(`/api/comments/post/${postId}`)
      if (!response.ok) throw new Error("댓글 가져오기 오류")
      const data = await response.json()
      setComments((prev) => ({ ...prev, [postId]: data.comments })) // 상태 업데이트
      return data.comments
    },
    // Only enable query if postId exists and comments not already fetched
    enabled: !!postId && !comments[postId],
    initialData: comments[postId] || [], // Use existing comments as initial data if available
  })
}
