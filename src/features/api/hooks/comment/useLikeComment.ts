// import { useAtom } from "jotai"
// import { commentsAtom } from "../../../app/atom"

import { useAtom } from "jotai"
import { commentsAtom } from "../../../../app/atom"
import { useMutation } from "@tanstack/react-query"

// const useLikeComment = () => {
//   const [comments, setComments] = useAtom(commentsAtom)
//   const likeComment = async (id: number, postId: number) => {
//     try {
//       const comment = comments[postId]?.find((c) => c.id === id)
//       if (!comment) {
//         console.error("댓글을 찾을 수 없습니다.")
//         return
//       }

//       const response = await fetch(`/api/comments/${id}`, {
//         method: "PATCH",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ likes: comment.likes + 1 }),
//       })

//       const data = await response.json()
//       setComments((prev) => ({
//         ...prev,
//         [postId]: prev[postId]?.map((c) => (c.id === data.id ? data : c)) || [],
//       }))
//     } catch (error) {
//       console.error("댓글 좋아요 오류:", error)
//     }
//   }

//   return { likeComment }
// }

// export default useLikeComment
export const useLikeComment = () => {
  const [comments, setComments] = useAtom(commentsAtom)

  return useMutation({
    mutationKey: ["featchLikeComment"],
    mutationFn: async ({ id, postId }: { id: number; postId: number }) => {
      const comment = comments[postId]?.find((c) => c.id === id)
      if (!comment) {
        console.error("댓글을 찾을 수 없습니다.")
        return
      }
      const response = await fetch(`/api/comments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ likes: comment.likes + 1 }),
      })
      const data = await response.json()
      return data
    },

    onSuccess: (data) => {
      setComments((prev) => ({
        ...prev,
        [data.postId]: prev[data.postId]?.map((c) => (c.id === data.id ? data : c)) || [],
      }))
    },
    onError: (error) => {
      console.error("댓글 좋아요 오류:", error)
    },
  })
}
